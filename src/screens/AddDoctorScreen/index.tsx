import React, { useState } from 'react'
import styled from '@emotion/native'
import Screen from '@components/Screen'
import { StackNavigationProps } from '@routes'
import Section from '@components/Section'
import Input from '@components/Input'
import { Button } from '@components/Button'
import { Avatar, Text, TouchableRipple } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { firestore, storage } from '@config/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import tinycolor from 'tinycolor2'
import { Doctor } from 'src/types/Doctor'
import { useAppDispatch, useAppSelector } from '@store/index'
import { getUser } from '@store/auth'
import { addDoctor } from '@store/doctors'

const Root = styled(Screen)({
  paddingTop: 16,
})

const FullNameContainer = styled.View({
  display: 'flex',
  flexDirection: 'row',
  gap: 12,
  marginBottom: 12,
})

const BottomBar = styled.View({
  position: 'absolute',
  bottom: 16,
  padding: 16,
  width: '100%',
})

const AvatarSkeleton = styled(TouchableRipple)(
  {
    width: 96,
    height: 96,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ({ theme }) => ({
    backgroundColor: tinycolor(theme.colors.primary)
      .setAlpha(0.24)
      .toRgbString(),
  })
)

const AvatarWrapper = styled.View({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const AddDoctorScreen: React.FC<StackNavigationProps<'AddDoctorScreen'>> = ({
  navigation,
}) => {
  const user = useAppSelector(getUser)
  const theme = useAdaptiveTheme()
  const [avatar, setAvatar] = useState<string | undefined>(undefined)
  const [progress, setProgress] = useState<string>('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [workplace, setWorkplace] = useState('')
  const [speciality, setSpeciality] = useState('')
  const dispatch = useAppDispatch()

  const handleImageChoiceAndUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
      })

      if (!result.canceled) {
        const actions = [{ resize: { width: 300 } }]
        const manipulatorResult = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          actions,
          { compress: 0.4 }
        )

        const localUri = await fetch(manipulatorResult.uri)
        const localBlob = await localUri.blob()
        const filename = 'doctor_' + new Date().getTime()
        const storageRef = ref(storage, `avatars/${filename}`)
        const uploadTask = uploadBytesResumable(storageRef, localBlob)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(progress + '%')
          },
          (error) => {
            console.log(error)
            alert('Upload failed.')
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setProgress('')
              setAvatar(downloadURL)
            })
          }
        )
      }
    } catch (e) {
      console.log('error', (e as Error).message)
      alert('The size may be too much.')
    }
  }

  const handleSave = async () => {
    if (!user) return

    try {
      const doctorData: Omit<Doctor, 'id'> = {
        firstName,
        lastName,
        middleName,
        speciality,
        workplace,
        avatarUrl: avatar,
      }

      const doctorRef = collection(firestore, 'users', user.id, 'doctors')
      const doc = await addDoc(doctorRef, doctorData)

      dispatch(addDoctor({ ...doctorData, id: doc.id }))

      navigation.pop()
    } catch (e) {
      alert(e)
    }
  }

  return (
    <Root safeAreaProps={{ edges: ['left', 'right', 'bottom'] }}>
      <AvatarWrapper>
        <AvatarSkeleton borderless onPress={handleImageChoiceAndUpload}>
          <>
            {avatar && <Avatar.Image source={{ uri: avatar }} size={96} />}
            {!avatar && !progress && (
              <MaterialIcons
                color={theme.colors.text}
                name="camera-alt"
                size={24}
              />
            )}
            {progress && !avatar && (
              <Text variant="labelMedium" style={{ color: theme.colors.text }}>
                {progress}
              </Text>
            )}
          </>
        </AvatarSkeleton>
      </AvatarWrapper>
      <Section contentProps={{ style: { gap: 0 } }} title="Основные данные">
        <FullNameContainer>
          <Input
            onChangeText={(text) => setFirstName(text)}
            placeholder="Имя"
            textContentType="name"
          />
          <Input
            onChangeText={(text) => setLastName(text)}
            placeholder="Фамилия"
            textContentType="name"
          />
        </FullNameContainer>
        <Input
          onChangeText={(text) => setMiddleName(text)}
          placeholder="Отчетство"
          textContentType="name"
        />
      </Section>
      <Section title="Место работы">
        <Input
          onChangeText={(text) => setWorkplace(text)}
          placeholder="Введите адрес"
          textContentType="addressCity"
        />
      </Section>
      <Section title="Cпециализация">
        <Input
          onChangeText={(text) => setSpeciality(text)}
          placeholder="Введите специализацию"
          textContentType="none"
        />
      </Section>
      <BottomBar>
        <Button mode="contained" onPress={handleSave}>
          Создать
        </Button>
      </BottomBar>
    </Root>
  )
}

export default AddDoctorScreen
