
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ShopProvider } from './context/ShopContext';

import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WishlistScreen from './screens/WishlistScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrderSuccessScreen from './screens/OrderSuccessScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#513A2E',
        tabBarInactiveTintColor: '#9A8575',
        tabBarStyle: {
          backgroundColor: '#F8F3EC',
          borderTopColor: '#D6C3B0',
          height: 62,
          paddingBottom: 7,
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
}

// Main Stack
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerTintColor: '#513A2E',
          headerStyle: {
            backgroundColor: '#EDD9BE',
          },
          headerTitleStyle: {
            color: '#513A2E',
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: '#EDD9BE',
          },
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{ title: 'Product Details' }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />

        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ title: 'Create Account' }}
        />

        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{ title: 'Checkout' }}
        />

        <Stack.Screen
          name="OrderSuccess"
          component={OrderSuccessScreen}
          options={{
            title: 'Order Confirmed',
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <AppNavigator />
    </ShopProvider>
  );
}
