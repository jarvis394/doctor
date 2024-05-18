import Screen from '@components/Screen'
import styled from '@emotion/native'
import { StackNavigationProps } from '@routes'
import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@config/firebase'
import { useAppDispatch } from '@store/index'
import { setIsAuthLoading, setIsLoggedIn, setUserData } from '@store/auth'
import { db } from '@utils/db'

const Root = styled.View({
  display: 'flex',
  gap: 32,
  width: '100%',
  padding: 32,
  alignItems: 'center',
  flexGrow: 1,
  justifyContent: 'center',
})

const SplashScreen: React.FC<StackNavigationProps<'SplashScreen'>> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('Logged in:', user)

        const res = await db.user(user.uid)
        const userData = res.data()

        if (!userData) return

        dispatch(
          setUserData({
            id: user.uid,
            avatarUrl: userData.avatarUrl,
          })
        )
        dispatch(setIsLoggedIn(true))
        dispatch(setIsAuthLoading(false))

        navigation.replace('App')
      } else {
        console.log('Failed to log in:', user)

        dispatch(setIsLoggedIn(false))
        dispatch(setIsAuthLoading(false))

        navigation.replace('LoginScreen')
      }
    })
  }, [dispatch, navigation])

  return (
    <Screen safeAreaWithBottomEdge>
      <Root>
        <ActivityIndicator animating={true} />
      </Root>
    </Screen>
  )
}

export default SplashScreen
