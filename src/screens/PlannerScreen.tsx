import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Title, Paragraph, Button } from 'react-native-paper';
import { MOCK_WEEKLY_PLAN } from '../constants/mockData';

const PlannerScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Title style={styles.title}>Weekly Plan</Title>
      {MOCK_WEEKLY_PLAN.days.map((day, index) => (
        <View key={index} style={styles.dayContainer}>
          <Title style={styles.dayTitle}>{day.dayOfWeek}</Title>
          {day.meals.length > 0 ? (
            day.meals.map((meal, mIndex) => (
              <Card key={mIndex} style={styles.mealCard}>
                <Card.Content>
                  <Title>{meal.type}</Title>
                  <Paragraph>{meal.recipe?.title || meal.note || 'No meal planned'}</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button>Swap</Button>
                </Card.Actions>
              </Card>
            ))
          ) : (
            <Card style={styles.mealCard}>
                <Card.Content>
                    <Paragraph>No meals planned</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button>Add Meal</Button>
                </Card.Actions>
            </Card>
          )}
        </View>
      ))}
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
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  dayContainer: {
    marginBottom: 20,
  },
  dayTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#444',
  },
  mealCard: {
    marginBottom: 10,
    backgroundColor: 'white',
  },
});

export default PlannerScreen;
