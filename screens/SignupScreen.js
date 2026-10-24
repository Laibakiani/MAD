
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const COLORS = {
  background: '#EDD9BE',
  card: '#F8F3EC',
  brown: '#513A2E',
  accent: '#795E4C',
  border: '#D6C3B0',
};

export default function SignupScreen({ navigation, route }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password || !confirmPassword) {
      Alert.alert('Missing Details', 'Please fill in all fields.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Weak Password',
        'Password must contain at least 6 characters.'
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Both passwords must match.');
      return;
    }

    try {
      setLoading(true);

      const savedUsers = await AsyncStorage.getItem('registeredUsers');
      let users = savedUsers ? JSON.parse(savedUsers) : [];

      if (!Array.isArray(users)) {
        throw new Error('Invalid saved user data.');
      }

      const alreadyExists = users.some(
        (user) => user.email?.toLowerCase() === cleanEmail
      );

      if (alreadyExists) {
        Alert.alert(
          'Account Exists',
          'This email is already registered. Please login.',
          [
            {
              text: 'Go to Login',
              onPress: () =>
                navigation.navigate('Login', route?.params),
            },
            { text: 'Cancel', style: 'cancel' },
          ]
        );
        return;
      }

      const newUser = {
        name: cleanName,
        email: cleanEmail,
        password,
      };

      users.push(newUser);

      await AsyncStorage.setItem(
        'registeredUsers',
        JSON.stringify(users)
      );

      await AsyncStorage.setItem(
        'userSession',
        JSON.stringify({
          name: cleanName,
          email: cleanEmail,
        })
      );

      Alert.alert(
        'Account Created!',
        `Welcome to LIKÉ Studio, ${cleanName}!`,
        [
          {
            text: 'Continue to Order',
            onPress: () => {
              navigation.navigate('Checkout', route?.params);
            },
          },
        ]
      );
    } catch (error) {
      console.log('Signup error:', error);

      Alert.alert(
        'Signup Failed',
        'Unable to create your account. Please try again.'
      );
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

        <Text style={styles.title}>Create Account</Text>

        <Text style={styles.subtitle}>
          Join us and discover your favourites
        </Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor={COLORS.accent}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoCorrect={false}
        />

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
          placeholder="Create a password"
          placeholderTextColor={COLORS.accent}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter your password"
          placeholderTextColor={COLORS.accent}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <View style={styles.button}>
          <Button
            title={loading ? 'Creating Account...' : 'Sign Up'}
            color={COLORS.brown}
            onPress={handleSignup}
            disabled={loading}
          />
        </View>

        {loading && (
          <ActivityIndicator
            size="small"
            color={COLORS.brown}
            style={styles.loader}
          />
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?
          </Text>

          <Button
            title="Login"
            color={COLORS.accent}
            onPress={() =>
              navigation.navigate('Login', route?.params)
            }
            disabled={loading}
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
    marginBottom: 18,
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
  loader: {
    marginTop: 12,
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
