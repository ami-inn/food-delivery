import { View, Text, Button, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import seed from '@/lib/seed'

const search = () => {
  return (
    <SafeAreaView>
      <Text>search</Text>

<Button title="Seed Database" onPress={async () => {
  try {
    await seed();
    Alert.alert('Success', 'Database seeded!');
  } catch (error) {
    Alert.alert('Error', 'Failed to seed database: ' + error);
  }
}} />
</SafeAreaView>
  )
}

export default search