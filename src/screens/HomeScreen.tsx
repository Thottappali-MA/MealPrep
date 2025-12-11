import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button, Title, Paragraph, ProgressBar, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MOCK_WEEKLY_PLAN } from '../constants/mockData';

const HomeScreen = () => {
  const navigation = useNavigation();
  const todayPlan = MOCK_WEEKLY_PLAN.days[0]; // Mocking today as Monday
  const todayMeal = todayPlan.meals.find(m => m.type === 'Dinner');
  
  // Mock state for "What you have done"
  const [completedMeals, setCompletedMeals] = useState<string[]>([]);
  const cookingDays = ['Mon', 'Wed', 'Fri']; // Mock user preference
  const isCookingDay = cookingDays.includes(todayPlan.dayOfWeek.substring(0, 3));

  const markAsCooked = (id: string) => {
    if (!completedMeals.includes(id)) {
      setCompletedMeals([...completedMeals, id]);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.greeting}>Hi, Chef!</Text>
        <Text variant="bodyLarge" style={styles.subtext}>
            {isCookingDay ? "It's a cooking day! 🍳" : "Off duty today! 🛋️"}
        </Text>
      </View>

      {/* Weekly Progress Section */}
      <View style={styles.progressSection}>
        <Title style={styles.sectionTitle}>Weekly Progress</Title>
        <View style={styles.weekProgress}>
            {MOCK_WEEKLY_PLAN.days.map((day, index) => {
                const dayShort = day.dayOfWeek.substring(0, 3);
                const isCookDay = cookingDays.includes(dayShort);
                const isDone = index === 0 && completedMeals.includes('today'); // Mock logic
                
                return (
                    <View key={index} style={styles.dayProgress}>
                        <Text style={styles.dayLabel}>{dayShort.charAt(0)}</Text>
                        <View style={[
                            styles.dot, 
                            !isCookDay && styles.dotOff,
                            isDone && styles.dotDone
                        ]}>
                            {isDone && <IconButton icon="check" size={10} iconColor="white" style={{margin:0}} />}
                        </View>
                    </View>
                );
            })}
        </View>
        <Text style={styles.progressText}>2 of 3 meals cooked this week</Text>
      </View>

      <Title style={styles.sectionTitle}>
        {isCookingDay ? "Today's Mission" : "Up Next"}
      </Title>
      
      {todayMeal && todayMeal.recipe ? (
        <Card style={styles.card} onPress={() => {}}>
          <Card.Cover source={{ uri: todayMeal.recipe.image }} />
          <Card.Content>
            <Title>{todayMeal.recipe.title}</Title>
            <Paragraph>{todayMeal.recipe.description}</Paragraph>
            <View style={styles.meta}>
                <Text>{todayMeal.recipe.prepTime + todayMeal.recipe.cookTime} min</Text>
                <Text> • </Text>
                <Text>{todayMeal.recipe.difficulty}</Text>
            </View>
          </Card.Content>
          <Card.Actions>
            {completedMeals.includes('today') ? (
                <Button icon="check" mode="contained" disabled>Cooked!</Button>
            ) : (
                <Button icon="fire" mode="contained" onPress={() => markAsCooked('today')}>Start Cooking</Button>
            )}
          </Card.Actions>
        </Card>
      ) : (
        <Card style={styles.card}>
            <Card.Content>
                <Title>No meal planned</Title>
                <Button onPress={() => navigation.navigate('Planner' as never)}>Plan Now</Button>
            </Card.Content>
        </Card>
      )}

      <Title style={styles.sectionTitle}>Quick Actions</Title>
      <View style={styles.shortcuts}>
        <Button mode="contained-tonal" icon="calendar" style={styles.shortcutBtn} onPress={() => navigation.navigate('Planner' as never)}>
          Plan Week
        </Button>
        <Button mode="contained-tonal" icon="food" style={styles.shortcutBtn} onPress={() => navigation.navigate('Recipes' as never)}>
          Recipes
        </Button>
        <Button mode="contained-tonal" icon="cart" style={styles.shortcutBtn} onPress={() => navigation.navigate('Grocery' as never)}>
          Groceries
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 10,
    marginTop: 20,
  },
  greeting: {
    fontWeight: 'bold',
  },
  subtext: {
    color: '#666',
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 10,
    backgroundColor: 'white',
  },
  meta: {
    flexDirection: 'row',
    marginTop: 8,
  },
  shortcuts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  shortcutBtn: {
    flexGrow: 1,
    marginBottom: 8,
  },
  progressSection: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  weekProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  dayProgress: {
    alignItems: 'center',
  },
  dayLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6347', // Active/Pending color
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotOff: {
    backgroundColor: '#eee', // Off day
  },
  dotDone: {
    backgroundColor: '#4CAF50', // Green for done
  },
  progressText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
  }
});

export default HomeScreen;
