import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const Signin = () => {
  return (
    <View>
      <Text>Signin</Text>
      <Button title="Signup" onPress={() => router.push('/(auth)/sign-up')} />
    </View>
  )
}

export default Signin