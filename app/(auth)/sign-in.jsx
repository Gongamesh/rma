import React, { useState } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, SafeAreaView, AppState } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Link, router } from 'expo-router';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(null);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    setLoading(false);

    if (error) {
      Alert.alert('Sign In Error', error.message);
    } else {
      router.replace('/home');
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full p-4">
      <View className="flex-1 justify-center">
        <View className="w-full max-w-md mx-auto">
          <Text className="text-white text-2xl font-semibold mb-6 text-center">
            Sign In to Book Follower
          </Text>

          <View className="mb-4">
            <Text className="text-lightGray text-base mb-2">Email</Text>
            <View className={`border-2 ${isFocused === 'email' ? 'border-accent' : 'border-lightGray'} bg-lightGray rounded-xl`}>
              <TextInput
                style={{ paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, color: '#2C3E50' }}
                value={email}
                placeholder="email@address.com"
                placeholderTextColor="#BDC3C7"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
                onFocus={() => setIsFocused('email')}
                onBlur={() => setIsFocused(null)}
              />
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-lightGray text-base mb-2">Password</Text>
            <View className={`border-2 ${isFocused === 'password' ? 'border-accent' : 'border-lightGray'} bg-lightGray rounded-xl`}>
              <TextInput
                style={{ paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, color: '#2C3E50' }}
                value={password}
                placeholder="Password"
                placeholderTextColor="#BDC3C7"
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={(text) => setPassword(text)}
                onFocus={() => setIsFocused('password')}
                onBlur={() => setIsFocused(null)}
              />
            </View>
          </View>

          <TouchableOpacity
            className="bg-accent p-3 rounded-lg flex-row justify-center items-center"
            onPress={signInWithEmail}
            disabled={loading}
          >
            <Text className="text-white text-lg font-semibold">{loading ? 'Signing In...' : 'Sign In'}</Text>
          </TouchableOpacity>

          <View className="mt-6">
            <Text className="text-white text-center">
              Don't have an account?{' '}
              <Link href='/sign-up' className='text-dark font-semibold'>Sign Up</Link>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
