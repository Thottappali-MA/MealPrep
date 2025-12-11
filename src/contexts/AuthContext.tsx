import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  onboardingCompleted: boolean;
  completeOnboarding: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  onboardingCompleted: false,
  completeOnboarding: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await AsyncStorage.getItem('onboarding_completed');
      setOnboardingCompleted(value === 'true');
    };

    checkOnboarding();

    // Check active sessions and subscribe to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Supabase Auth Event:', _event);
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const completeOnboarding = async () => {
    await AsyncStorage.setItem('onboarding_completed', 'true');
    setOnboardingCompleted(true);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    // Optional: Reset onboarding for testing purposes if desired, 
    // but usually onboarding is persistent per user. 
    // For this MVP demo, let's NOT clear it so it persists, 
    // OR clear it to allow re-testing. 
    // The user said "there is no log out option to check the onboarding", 
    // implying they want to re-test it.
    // Let's clear it for now to make testing easier.
    await AsyncStorage.removeItem('onboarding_completed');
    setOnboardingCompleted(false);
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user: session?.user ?? null, 
      loading, 
      onboardingCompleted,
      completeOnboarding,
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
