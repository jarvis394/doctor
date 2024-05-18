import React, { useEffect, useState } from 'react'
import { DoctorCard } from '@components/DoctorCard'
import { StackNavigationProps } from '@routes'
import { Button } from '@components/Button'
import Section from '@components/Section'
import Screen from '@components/Screen'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import DateTimePicker, { DateType } from 'react-native-ui-datepicker'
import Input from '@components/Input'
import styled from '@emotion/native'
import {
  createAppointment,
  deleteAppointment,
  editAppointment,
  getAppointmentsState,
  getCurrentEditingAppointment,
  resetCurrentEditingAppointment,
  setCurrentEditingAppointment,
} from '@store/appointments'
import { useAppDispatch, useAppSelector } from '@store/index'
import { FetchingState } from 'src/types/FetchingState'
import dayjs from 'dayjs'
import { Chip } from 'react-native-paper'
import { AppointmentTag } from 'src/types/Appointment'
import { tagToTagName } from '@components/AppointmentCard'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'
import { getDoctorReferencePath } from '@utils/getDoctorReferencePath'
import { getUser } from '@store/auth'

const TagsContainer = styled.View({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 8,
})

const Tags: React.FC<{
  setTags: React.Dispatch<React.SetStateAction<AppointmentTag[]>>
  tags: AppointmentTag[]
}> = ({ tags, setTags }) => {
  const isSelected = (tag: AppointmentTag) => {
    return tags.some((e) => e === tag)
  }

  const handlePress = (tag: AppointmentTag) => {
    const selected = isSelected(tag)

    if (selected) {
      setTags(tags.filter((e) => e !== tag))
    } else {
      setTags([...tags, tag])
    }
  }

  return (
    <TagsContainer>
      {Object.values(AppointmentTag).map((tag, i) => {
        const selected = isSelected(tag)
        return (
          <Chip
            key={i}
            onPress={handlePress.bind(null, tag)}
            mode={selected ? 'flat' : 'outlined'}
            selected={selected}
          >
            {tagToTagName(tag)}
          </Chip>
        )
      })}
    </TagsContainer>
  )
}

const AddAppointmentScreen: React.FC<
  StackNavigationProps<'AddAppointmentScreen' | 'EditAppointmentScreen'> & {
    edit?: boolean
    editingAppointmentId?: string
  }
> = ({ navigation, edit, editingAppointmentId }) => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(getAppointmentsState)
  const user = useAppSelector(getUser)
  const appointment = useAppSelector((state) =>
    state.appointments.data.find((e) => e.id === editingAppointmentId)
  )
  const [datetime, setDatetime] = useState<DateType>(dayjs(appointment?.time))
  const [tags, setTags] = useState<AppointmentTag[]>(appointment?.tags || [])
  const [place, setPlace] = useState(appointment?.place || '')
  const [title, setTitle] = useState(appointment?.title || '')
  const theme = useAdaptiveTheme()
  const currentEditingAppointment = useAppSelector(getCurrentEditingAppointment)

  const handleAddAppointment = () => {
    if (!currentEditingAppointment) return
    saveToStore()

    if (edit) {
      if (!currentEditingAppointment.id) return

      dispatch(editAppointment(currentEditingAppointment))
    } else {
      dispatch(createAppointment(currentEditingAppointment))
    }

    navigation.popToTop()
  }

  const handleSelectDoctor = () => {
    saveToStore()
    navigation.push('SelectDoctorScreen', { edit: true })
  }

  const handleDeleteAppointment = () => {
    if (!edit || !currentEditingAppointment?.id) return

    dispatch(deleteAppointment(currentEditingAppointment.id))
    navigation.popToTop()
  }

  const saveToStore = () => {
    if (!currentEditingAppointment) return

    dispatch(
      setCurrentEditingAppointment({
        ...currentEditingAppointment,
        tags,
        place,
        title,
        time: dayjs(datetime).unix(),
      })
    )
  }

  useEffect(() => {
    if (!user) return

    if (edit && appointment) {
      dispatch(
        setCurrentEditingAppointment({
          ...appointment,
          doctor: appointment.doctor
            ? getDoctorReferencePath(user.id, appointment.doctor.id)
            : undefined,
        })
      )
    } else {
      dispatch(resetCurrentEditingAppointment())
    }
  }, [appointment, dispatch, edit, user])

  return (
    <Screen
      safeAreaProps={{ edges: ['left', 'right', 'bottom'], style: { gap: 12 } }}
    >
      <Section>
        <Input
          placeholder={'Название посещения'}
          defaultValue={title}
          onChangeText={(text) => setTitle(text)}
        />
        {currentEditingAppointment?.doctor && (
          <DoctorCard
            doctorId={currentEditingAppointment?.doctor.split('/').at(-1) || ''}
            withHeader
          />
        )}
        <Button
          mode="contained-tonal"
          icon={(props) => <MaterialIcons {...props} size={20} name="person" />}
          onPress={handleSelectDoctor}
        >
          Выбор врача
        </Button>
      </Section>
      <Section title="Теги">
        <Tags setTags={setTags} tags={tags} />
      </Section>
      <Section title="Время и место">
        <Input
          placeholder={'Название места'}
          defaultValue={place}
          onChangeText={(text) => setPlace(text)}
        />
        <DateTimePicker
          mode="single"
          timePicker
          locale="ru"
          date={datetime}
          onChange={(params) => setDatetime(params.date)}
          headerButtonColor={theme.colors.primary}
          selectedItemColor={theme.colors.primary}
          selectedTextStyle={{
            color: theme.colors.onPrimary,
          }}
          headerTextStyle={{
            color: theme.colors.text,
          }}
          calendarTextStyle={{
            color: theme.colors.text,
          }}
          weekDaysTextStyle={{
            color: theme.colors.text,
          }}
          yearContainerStyle={{
            backgroundColor: theme.colors.elevation.level1,
            borderWidth: 0,
          }}
        />
      </Section>
      <Button
        mode="contained"
        loading={state === FetchingState.PENDING}
        disabled={state === FetchingState.PENDING}
        onPress={handleAddAppointment}
      >
        Сохранить
      </Button>
      {edit && (
        <Button
          mode="text"
          textColor={theme.colors.error}
          onPress={handleDeleteAppointment}
        >
          Удалить
        </Button>
      )}
    </Screen>
  )
}

export default AddAppointmentScreen
