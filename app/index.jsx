import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/customButton';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router'


export default function App() {
  return (
    <SafeAreaView className='bg-primary'>
      <ScrollView contentContainerStyle={{ height:'100%' }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center"> So many books, so little time. {' '} 
            </Text>
            <Text className="text-accent text-3xl font-bold text-center">Book Follower</Text>
          </View>
          <Text className="text-sm text-lightGray mt-7 text-center">
          Where books are not just words on paper, but doors to worlds you have yet to discover.
          </Text>

          <CustomButton 
            title='Continue with Email'
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#6B8E23' style='light' />
    </SafeAreaView>
  );
}
