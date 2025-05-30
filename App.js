import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';


import HomeScreen from './screens/HomeScreen';
import DetailScreens from './screens/DetailScreens';
import CartScreen from './screens/CartScreen';
import PaymentScreen from './screens/PaymentScreen';
import SignInScreen from './screens/SignInScreen';
import SignupScreen from './screens/SignupScreen'; 
import AdminDashboard from './screens/AdminDashboard';
import { AuthContext } from './context/AuthContext';
import { AuthProvider } from './context/AuthContext';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Cart') iconName = 'shopping-cart';
          else if (route.name === 'Payment') iconName = 'card';
          else if (route.name === 'AdminDashboard') iconName = 'settings';

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1e2e4e',
        tabBarInactiveTintColor: '#6e788c',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name='AdminDashboard' component={AdminDashboard}/>
      
      
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        {/* Auth */}
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignupScreen} options={{ headerShown: false }} />

        {/* App Main Tabs */}
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />

        {/* Detail Page outside of tabs */}
        <Stack.Screen name="Detail" component={DetailScreens} />
        <Stack.Screen name='Payment' component={PaymentScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        {/* Admin Dashboard */}
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
