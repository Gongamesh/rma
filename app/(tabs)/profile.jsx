import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { router } from 'expo-router';

const Profile = () => {
  const [userEmail, setUserEmail] = useState('');
  const [lastLoginDate, setLastLoginDate] = useState('Loading...');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (session) {
          const user = session.user;
          setUserEmail(user.email); 

          if (user.last_sign_in_at) {
            const formattedDate = formatDate(user.last_sign_in_at);
            setLastLoginDate(formattedDate);
          } else {
            setLastLoginDate('N/A'); 
          }
        }
      } catch (error) {
        Alert.alert('Fetch User Error', error.message);
      }
    };

    fetchUserData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-GB', options);
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.replace('/sign-in');
    } catch (error) {
      Alert.alert('Sign Out Error', error.message);
    }
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

export default Profile;
