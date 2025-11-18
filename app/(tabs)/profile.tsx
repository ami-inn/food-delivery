import { View, Text, Image, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native'
import React from 'react'
import useAuthStore from '@/store/auth.store'
import { SafeAreaView } from 'react-native-safe-area-context'
import { signOut } from '@/lib/appwrite'
import { router } from 'expo-router'
import CustomButton from '@/components/CustomButon'
import { LinearGradient } from 'expo-linear-gradient'

const Profile = () => {
  const { user, setIsAuthenticated, setUser } = useAuthStore();

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              setIsAuthenticated(false);
              setUser(null);
              router.replace('/sign-in');
            } catch (error: any) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  const profileSections = [
    {
      title: 'Account',
      items: [
        { label: 'Personal Information', icon: '👤', route: '/(profile)/personal-info' },
        { label: 'Payment Methods', icon: '💳', route: null },
        { label: 'Delivery Addresses', icon: '📍', route: null },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { label: 'Notifications', icon: '🔔', route: null },
        { label: 'Language', icon: '🌐', route: null },
        { label: 'Dark Mode', icon: '🌙', route: null },
      ],
    },
    {
      title: 'Support',
      items: [
        { label: 'Help Center', icon: '❓', route: null },
        { label: 'Terms & Conditions', icon: '📄', route: null },
        { label: 'Privacy Policy', icon: '🔒', route: null },
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="pb-32">
        {/* Header */}
        <View className="px-5 pt-5 pb-8">
          <Text className="h1-bold text-dark-100 mb-2">Profile</Text>
          <Text className="body-regular text-gray-200">
            Manage your account and preferences
          </Text>
        </View>

        {/* User Info Card */}
        <View 
          className="mx-5 rounded-2xl mb-6 overflow-hidden"
          style={Platform.OS === 'android' ? { elevation: 8 } : { 
            shadowColor: '#EB920C',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
          }}
        >
          <LinearGradient
            colors={['#FFB84D', '#EB920C', '#D97D00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="p-6"
          >
            {/* Decorative circles */}
            <View className="absolute -top-10 -right-10 size-32 rounded-full bg-white/10" />
            <View className="absolute -bottom-5 -left-5 size-24 rounded-full bg-white/10" />
            
            <View className="flex-row items-center mb-5">
              <View 
                className="size-20 rounded-full items-center justify-center mr-4 bg-white/30"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                }}
              >
                {user?.avatar ? (
                  <Image
                    source={{ uri: user.avatar }}
                    className="size-20 rounded-full"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="size-20 rounded-full bg-white items-center justify-center">
                    <Text className="text-4xl">👤</Text>
                  </View>
                )}
              </View>
              <View className="flex-1">
                <Text className="h2-bold text-white mb-1 drop-shadow-lg">
                  {user?.name || 'Guest User'}
                </Text>
                <View className="bg-white/20 rounded-full px-3 py-1 self-start">
                  <Text className="body-regular text-white" numberOfLines={1}>
                    {user?.email || 'Not logged in'}
                  </Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity 
              className="bg-white rounded-xl py-3.5 items-center"
              activeOpacity={0.8}
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <Text className="paragraph-semibold text-primary">✏️ Edit Profile</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Profile Sections */}
        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} className="px-5 mb-6">
            <Text className="base-bold text-dark-100 mb-3">{section.title}</Text>
            <View 
              className="bg-white rounded-2xl overflow-hidden"
              style={Platform.OS === 'android' ? { elevation: 3, shadowColor: '#878787' } : {}}
            >
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  className="flex-row items-center justify-between px-4 py-4"
                  activeOpacity={0.7}
                  onPress={() => item.route && router.push(item.route as any)}
                  style={{
                    borderBottomWidth: itemIndex < section.items.length - 1 ? 1 : 0,
                    borderBottomColor: '#F5F5F5',
                  }}
                >
                  <View className="flex-row items-center flex-1">
                    <Text className="text-2xl mr-3">{item.icon}</Text>
                    <Text className="paragraph-regular text-dark-100">{item.label}</Text>
                  </View>
                  <Text className="text-gray-200 text-xl">›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Sign Out Button */}
        <View className="px-5 mt-4">
          <CustomButton
            title="Sign Out"
            onPress={handleSignOut}
            style="bg-red-500"
          />
        </View>

        {/* App Version */}
        <Text className="text-center body-regular text-gray-200 mt-6">
          Version 1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile