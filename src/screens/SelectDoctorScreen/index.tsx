import React, { useEffect } from 'react'
import Screen from '@components/Screen'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { DoctorCard } from '@components/DoctorCard'
import { Button } from '@components/Button'
import { StackNavigationProps } from '@routes'
import { useAppDispatch, useAppSelector } from '@store/index'
import { fetchDoctors, getDoctors } from '@store/doctors'

const FindDoctorScreen: React.FC<
  StackNavigationProps<'SelectDoctorScreen'>
> = ({ navigation }) => {
  const doctors = useAppSelector(getDoctors)
  const dispatch = useAppDispatch()

  const handleCreateDoctor = () => {
    navigation.push('AddDoctorScreen')
  }

  useEffect(() => {
    dispatch(fetchDoctors())
  }, [dispatch])

  return (
    <Screen
      safeAreaProps={{
        edges: ['left', 'right', 'bottom'],
        style: {
          padding: 16,
          gap: 12,
          display: 'flex',
        },
      }}
    >
      <Button
        mode="contained-tonal"
        onPress={handleCreateDoctor}
        icon={(props) => <MaterialIcons {...props} size={20} name="add" />}
      >
        Создать карточку врача
      </Button>
      {doctors.map((doctor) => (
        <DoctorCard doctor={doctor} key={doctor.id} />
      ))}
    </Screen>
  )
}

export default FindDoctorScreen
