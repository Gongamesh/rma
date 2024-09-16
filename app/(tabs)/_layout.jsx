import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const TabsLayout = () => {
  return (
    <>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#DAA520', 
        tabBarInactiveTintColor: '#FFFFFF', 
        tabBarStyle: {
          backgroundColor: '#6B8E23', 
          borderTopWidth: 1,
          borderTopColor: '#6B8E23',
          height: 50,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'semibold',
          marginBottom: 15,
        },
      }}
    >
      <Tabs.Screen name='home' options={{ title: "Home", headerShown: false }} />
      <Tabs.Screen name='bookmarks' options={{ title: "Bookmarks", headerShown: false }} />
      <Tabs.Screen name='profile' options={{ title: "Profile", headerShown: false }} />
    </Tabs>

    <StatusBar backgroundColor='#6B8E23' style='light' />

    </>
  );
};

export default TabsLayout;
