import { View, Text, ScrollView, TouchableOpacity, Platform, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import useAuthStore from '@/store/auth.store'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import CustomButton from '@/components/CustomButon'
import { LinearGradient } from 'expo-linear-gradient'

const PersonalInfo = () => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    dateOfBirth: '',
    address: '',
  });

  const handleSave = () => {
    Alert.alert(
      'Update Profile',
      'Your profile has been updated successfully!',
      [{ text: 'OK', onPress: () => setIsEditing(false) }]
    );
    // TODO: Add actual API call to update user profile
  };

  const InfoField = ({ label, value, editable = false, keyboardType = 'default' }: any) => (
    <View className="mb-5">
      <Text className="paragraph-semibold text-dark-100 mb-2">{label}</Text>
      {isEditing && editable ? (
        <TextInput
          value={value}
          onChangeText={(text) => setFormData({ ...formData, [label.toLowerCase().replace(' ', '')]: text })}
          className="bg-gray-50 rounded-xl px-4 py-3.5 paragraph-regular text-dark-100"
          keyboardType={keyboardType}
          placeholderTextColor="#B0B0B0"
        />
      ) : (
        <View className="bg-gray-50 rounded-xl px-4 py-3.5">
          <Text className="paragraph-regular text-dark-100">
            {value || 'Not provided'}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="pb-10">
        {/* Header */}
        <View className="px-5 pt-5 pb-6">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity
              onPress={() => router.back()}
              className="mr-4 size-10 items-center justify-center"
              activeOpacity={0.7}
            >
              <Text className="text-2xl">←</Text>
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="h1-bold text-dark-100">Personal Information</Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-primary/10 rounded-lg"
              activeOpacity={0.7}
            >
              <Text className="paragraph-semibold text-primary">
                {isEditing ? 'Cancel' : 'Edit'}
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="body-regular text-gray-200">
            View and manage your personal details
          </Text>
        </View>

        {/* Profile Card */}
        <View 
          className="mx-5 rounded-2xl mb-6 overflow-hidden"
          style={Platform.OS === 'android' ? { elevation: 6 } : { 
            shadowColor: '#EB920C',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
          }}
        >
          <LinearGradient
            colors={['#FFB84D', '#EB920C']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="p-6"
          >
            <View className="items-center">
              <View className="size-24 rounded-full bg-white items-center justify-center mb-3"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                }}
              >
                <Text className="text-5xl">👤</Text>
              </View>
              <Text className="h2-bold text-white mb-1">{user?.name || 'User'}</Text>
              <View className="bg-white/20 rounded-full px-4 py-1.5">
                <Text className="body-regular text-white">Member since 2024</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Information Fields */}
        <View className="px-5">
          <Text className="base-bold text-dark-100 mb-4">Basic Information</Text>
          
          <InfoField 
            label="Full Name" 
            value={formData.name} 
            editable={true}
          />
          
          <InfoField 
            label="Email Address" 
            value={formData.email} 
            editable={false}
          />
          
          <InfoField 
            label="Phone Number" 
            value={formData.phone} 
            editable={true}
            keyboardType="phone-pad"
          />
          
          <InfoField 
            label="Date of Birth" 
            value={formData.dateOfBirth} 
            editable={true}
          />
          
          <InfoField 
            label="Address" 
            value={formData.address} 
            editable={true}
          />
        </View>

        {/* Save Button */}
        {isEditing && (
          <View className="px-5 mt-4">
            <CustomButton
              title="Save Changes"
              onPress={handleSave}
              style="bg-primary"
            />
          </View>
        )}

        {/* Account Stats */}
        <View className="mx-5 mt-8">
          <Text className="base-bold text-dark-100 mb-4">Account Statistics</Text>
          <View className="flex-row justify-between">
            <View 
              className="flex-1 bg-primary/10 rounded-xl p-4 mr-2"
              style={Platform.OS === 'android' ? { elevation: 2 } : {}}
            >
              <Text className="h2-bold text-primary mb-1">24</Text>
              <Text className="small-regular text-gray-200">Orders</Text>
            </View>
            <View 
              className="flex-1 bg-green-50 rounded-xl p-4 mx-2"
              style={Platform.OS === 'android' ? { elevation: 2 } : {}}
            >
              <Text className="h2-bold text-green-600 mb-1">18</Text>
              <Text className="small-regular text-gray-200">Reviews</Text>
            </View>
            <View 
              className="flex-1 bg-blue-50 rounded-xl p-4 ml-2"
              style={Platform.OS === 'android' ? { elevation: 2 } : {}}
            >
              <Text className="h2-bold text-blue-600 mb-1">5</Text>
              <Text className="small-regular text-gray-200">Favorites</Text>
            </View>
          </View>
        </View>

        {/* Danger Zone */}
        <View className="mx-5 mt-8 mb-6">
          <Text className="base-bold text-dark-100 mb-4">Danger Zone</Text>
          <TouchableOpacity
            className="bg-red-50 rounded-xl p-4 flex-row items-center justify-between"
            activeOpacity={0.7}
            onPress={() => {
              Alert.alert(
                'Delete Account',
                'Are you sure you want to delete your account? This action cannot be undone.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Delete', style: 'destructive' },
                ]
              );
            }}
          >
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">🗑️</Text>
              <View>
                <Text className="paragraph-semibold text-red-600">Delete Account</Text>
                <Text className="small-regular text-gray-200">Permanently remove your account</Text>
              </View>
            </View>
            <Text className="text-gray-200 text-xl">›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PersonalInfo
