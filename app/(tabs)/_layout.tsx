import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Slot } from 'expo-router'

const HomeLayout = () => {
    const isAuthenticated = false; // Replace with your authentication logic

    if (!isAuthenticated) return <Redirect href={'/(auth)/sign-in'} />
  return (
  
      <Slot/>
   
  )
}

export default HomeLayout