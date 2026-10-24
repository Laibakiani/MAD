

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useShop } from '../context/ShopContext';

const COLORS = {
  background: '#EDD9BE',
  card: '#F8F3EC',
  brown: '#513A2E',
  accent: '#795E4C',
  border: '#D6C3B0',
};

export default function LoginScreen({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { addToCart } = useShop();

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Missing Details', 'Please enter email and password.');
      return;
    }

    try {
      setLoading(true);

      const savedUsers = await AsyncStorage.getItem('registeredUsers');
      const users = savedUsers ? JSON.parse(savedUsers) : [];

      const user = users.find(
        (item) =>
          item.email.toLowerCase() === email.trim().toLowerCase() &&
          item.password === password
      );

      if (!user) {
        Alert.alert(
          'Login Failed',
          'Email or password is incorrect. Please sign up first if you do not have an account.'
        );
        return;
      }

      await AsyncStorage.setItem(
        'userSession',
        JSON.stringify({
          name: user.name,
          email: user.email,
        })
      );

      const product = route?.params?.productToAdd;

      if (product) {
        addToCart(product);
        navigation.navigate('MainTabs', { screen: 'Cart' });
      } else {
        navigation.navigate('MainTabs');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to log in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Text style={styles.brand}>LIKÉ Studio</Text>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          Login to continue shopping
        </Text>

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor={COLORS.accent}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor={COLORS.accent}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.button}>
          <Button
            title={loading ? 'Logging In...' : 'Login'}
            color={COLORS.brown}
            onPress={handleLogin}
            disabled={loading}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?
          </Text>
          <Button
            title="Sign Up"
            color={COLORS.accent}
          onPress={() => navigation.navigate('Signup', route?.params)}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 22,
  },
  brand: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.brown,
    textAlign: 'center',
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.brown,
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.accent,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 25,
  },
  label: {
    color: COLORS.brown,
    fontWeight: '600',
    marginBottom: 7,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 12,
    color: COLORS.brown,
    fontSize: 15,
  },
  button: {
    marginTop: 24,
    overflow: 'hidden',
    borderRadius: 10,
  },
  footer: {
    alignItems: 'center',
    marginTop: 22,
  },
  footerText: {
    color: COLORS.accent,
    marginBottom: 3,
  },
});
