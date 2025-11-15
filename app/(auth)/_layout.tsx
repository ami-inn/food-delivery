
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Slot } from 'expo-router'

const AuthLayout = () => {
  return (
    <SafeAreaView>
      <Slot />
    </SafeAreaView>
  )
}

export default AuthLayout