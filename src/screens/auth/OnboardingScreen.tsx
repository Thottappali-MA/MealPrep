import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Title, Text, Button, Chip, SegmentedButtons, ProgressBar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';

const CUISINES = ['Italian', 'Mexican', 'Indian', 'Asian', 'Mediterranean', 'American', 'French', 'Vegetarian'];
const SKILL_LEVELS = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' },
];
const SERVING_SIZES = [
  { value: '1', label: 'Just Me' },
  { value: '2', label: 'Couple' },
  { value: '4', label: 'Family (4)' },
];
const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [skillLevel, setSkillLevel] = useState('Beginner');
  const [servingSize, setServingSize] = useState('1');
  const [cookingDays, setCookingDays] = useState<string[]>(['Mon', 'Wed', 'Fri']);
  const [loading, setLoading] = useState(false);

  const toggleCuisine = (cuisine: string) => {
    if (selectedCuisines.includes(cuisine)) {
      setSelectedCuisines(selectedCuisines.filter(c => c !== cuisine));
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine]);
    }
  };

  const toggleDay = (day: string) => {
    if (cookingDays.includes(day)) {
      setCookingDays(cookingDays.filter(d => d !== day));
    } else {
      setCookingDays([...cookingDays, day]);
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Save preferences to Supabase (Mocking table update for now)
        console.log('Onboarding Data:', { selectedCuisines, skillLevel, servingSize, cookingDays });
        
        // Navigate to Home
        // In a real app, update context/db here
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      // Force navigation for demo
      navigation.navigate('Home' as never); 
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar progress={step / 4} color="#FF6347" style={styles.progress} />
      
      <ScrollView contentContainerStyle={styles.content}>
        {step === 1 && (
          <View>
            <Title style={styles.title}>What do you like to eat?</Title>
            <Text style={styles.subtitle}>Select your favorite cuisines</Text>
            <View style={styles.chipContainer}>
              {CUISINES.map((cuisine) => (
                <Chip
                  key={cuisine}
                  selected={selectedCuisines.includes(cuisine)}
                  onPress={() => toggleCuisine(cuisine)}
                  style={styles.chip}
                  showSelectedOverlay
                >
                  {cuisine}
                </Chip>
              ))}
            </View>
          </View>
        )}

        {step === 2 && (
          <View>
            <Title style={styles.title}>How confident are you in the kitchen?</Title>
            <SegmentedButtons
              value={skillLevel}
              onValueChange={setSkillLevel}
              buttons={SKILL_LEVELS}
              style={styles.segmentedButton}
            />
          </View>
        )}

        {step === 3 && (
          <View>
            <Title style={styles.title}>Who are you cooking for?</Title>
            <SegmentedButtons
              value={servingSize}
              onValueChange={setServingSize}
              buttons={SERVING_SIZES}
              style={styles.segmentedButton}
            />
          </View>
        )}

        {step === 4 && (
          <View>
            <Title style={styles.title}>When do you want to cook?</Title>
            <Text style={styles.subtitle}>Select your cooking days</Text>
            <View style={styles.chipContainer}>
              {DAYS_OF_WEEK.map((day) => (
                <Chip
                  key={day}
                  selected={cookingDays.includes(day)}
                  onPress={() => toggleDay(day)}
                  style={styles.chip}
                  showSelectedOverlay
                >
                  {day}
                </Chip>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button mode="contained" onPress={handleNext} loading={loading} style={styles.button}>
          {step === 4 ? 'Finish' : 'Next'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  progress: {
    height: 6,
  },
  content: {
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    marginBottom: 8,
  },
  segmentedButton: {
    marginTop: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    paddingVertical: 6,
  }
});

export default OnboardingScreen;
