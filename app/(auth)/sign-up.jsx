import React, { useState } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, SafeAreaView, AppState } from 'react-native';
import { supabase } from '../../lib/supabase';
import { router, Link } from 'expo-router';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const { data: { session }, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Sign Up Error', error.message);
    } else {
      if (session) {
        router.replace('/home');
      } else {
        Alert.alert('Please check your inbox for email verification!');
      }
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full p-4">
      <View className="flex-1 justify-center">
        <View className="w-full max-w-md mx-auto">
          <Text className="text-white text-2xl font-semibold mb-6 text-center">
            Sign Up
          </Text>

          <View className="mb-4">
            <Text className="text-lightGray text-base mb-2">Email</Text>
            <View className="border-2 border-lightGray bg-lightGray rounded-xl">
              <TextInput
                style={{ paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, color: '#2C3E50' }}
                value={email}
                placeholder="email@address.com"
                placeholderTextColor="#BDC3C7"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
              />
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-lightGray text-base mb-2">Password</Text>
            <View className="border-2 border-lightGray bg-lightGray rounded-xl">
              <TextInput
                style={{ paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, color: '#2C3E50' }}
                value={password}
                placeholder="Password"
                placeholderTextColor="#BDC3C7"
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={(text) => setPassword(text)}
              />
            </View>
          </View>

          <TouchableOpacity
            className="bg-accent p-3 rounded-lg flex-row justify-center items-center"
            onPress={() => signUpWithEmail()}
            disabled={loading}
          >
            <Text className="text-white text-lg font-semibold">{loading ? 'Signing Up...' : 'Sign Up'}</Text>
          </TouchableOpacity>

          <View className="mt-6">
            <Text className="text-white text-center">
              Already have an account?{' '}
              <Link href='/sign-in' className='text-dark font-semibold'>Sign In</Link>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
