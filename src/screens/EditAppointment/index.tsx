import { StackNavigationProps } from '@routes'
import React from 'react'
import { AddAppointmentScreen } from '..'

const EditAppointmentScreen: React.FC<
  StackNavigationProps<'EditAppointmentScreen'>
> = ({ route, ...props }) => {
  return (
    <AddAppointmentScreen
      {...props}
      route={route}
      edit
      editingAppointmentId={route.params.id}
    />
  )
}

export default EditAppointmentScreen
