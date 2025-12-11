import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';
import { supabase } from '../../lib/supabase';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  const signInWithEmail = async () => {
    setLoading(true);
    setDebugInfo('Attempting sign in...');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Sign In Result:', { data, error });

      if (error) {
        setDebugInfo(`Error: ${error.message}`);
        Alert.alert('Error', error.message);
      } else {
        setDebugInfo('Sign in successful! Redirecting...');
      }
    } catch (e: any) {
      setDebugInfo(`Exception: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async () => {
    setLoading(true);
    setDebugInfo('Attempting sign up...');
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setDebugInfo(`Sign Up Error: ${error.message}`);
      Alert.alert('Error', error.message);
    } else {
      setDebugInfo('Sign up successful! Please verify your email.');
      Alert.alert(
        'Success', 
        'Account created! Please verify your email if required.',
        [
          { text: 'OK', onPress: () => navigation.navigate('Onboarding' as never) }
        ]
      );
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Welcome to MealPrep</Title>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        autoCapitalize="none"
        style={styles.input}
      />
      <Button 
        mode="contained" 
        onPress={signInWithEmail} 
        loading={loading} 
        style={styles.button}
      >
        Sign In
      </Button>
      <Button 
        mode="outlined" 
        onPress={signUpWithEmail} 
        loading={loading} 
        style={styles.button}
      >
        Sign Up
      </Button>
      
      {debugInfo ? (
        <Text style={styles.debug}>{debugInfo}</Text>
      ) : null}
      
      <Text style={styles.hint}>
        (Note: Connect to a real Supabase project in src/lib/supabase.ts to make this work)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 10,
  },
  hint: {
    marginTop: 20,
    textAlign: 'center',
    color: 'gray',
    fontSize: 12,
  },
  debug: {
    marginTop: 10,
    color: 'red',
    textAlign: 'center',
  }
});

export default LoginScreen;
