import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ProfileScreen = () => {
  // Placeholder za trenutno prijavljenog korisnika
  const userEmail = 'example@example.com';
  const lastLoginDate = '24.4.2024'; // Placeholder za datum posljednje prijave

  const handleSignOut = () => {
    // Placeholder funkcionalnost za odjavu
    console.log('Sign out pressed');
  };

  return (
    <SafeAreaView className="flex-1 bg-lightGray">
      <View className="flex-1 justify-center items-center p-4">
        <View className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
          <Text className="text-primary text-2xl font-bold mb-4 text-center">Profile</Text>
          <Text className="text-dark text-lg mb-2 text-center">Email: {userEmail}</Text>
          <Text className="text-dark text-sm mb-4 text-center">Last Login: {lastLoginDate}</Text>

          <TouchableOpacity
            className="bg-accent p-3 rounded-lg flex-row justify-center items-center"
            onPress={handleSignOut}
          >
            <FontAwesome name="sign-out" size={20} color="white" />
            <Text className="text-white text-lg font-semibold ml-2">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
