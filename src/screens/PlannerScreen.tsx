import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Title, Paragraph, Button, IconButton, Chip, useTheme } from 'react-native-paper';
import { MOCK_WEEKLY_PLAN } from '../constants/mockData';

const PlannerScreen = () => {
  const theme = useTheme();

  // Mock cooking days for now (should come from context/backend)
  const cookingDays = ['Monday', 'Wednesday', 'Friday'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Weekly Meal Plan</Title>
        <Button mode="contained" icon="magic-staff" onPress={() => console.log('Generate')}>
          Generate
        </Button>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {MOCK_WEEKLY_PLAN.days.map((day, index) => {
          const isCookingDay = cookingDays.includes(day.dayOfWeek);

          return (
            <View key={index} style={styles.dayContainer}>
              <View style={styles.dayHeader}>
                <Title style={styles.dayTitle}>{day.dayOfWeek}</Title>
                {isCookingDay && (
                  <Chip icon="chef-hat" style={styles.cookingChip} textStyle={{ fontSize: 12 }}>
                    Cooking Day
                  </Chip>
                )}
              </View>

              {day.meals.length > 0 ? (
                day.meals.map((meal, mIndex) => (
                  <Card key={mIndex} style={styles.mealCard} mode="elevated">
                    {meal.recipe?.image && (
                      <Card.Cover source={{ uri: meal.recipe.image }} style={styles.cardCover} />
                    )}
                    <Card.Content style={styles.cardContent}>
                      <View style={styles.mealHeader}>
                        <Chip compact style={styles.mealTypeChip}>{meal.type}</Chip>
                        <Text style={styles.calories}>~500 kcal</Text>
                      </View>
                      <Title style={styles.recipeTitle}>{meal.recipe?.title || meal.note}</Title>
                      <Paragraph numberOfLines={2} style={styles.description}>
                        {meal.recipe?.description || 'No description available.'}
                      </Paragraph>
                    </Card.Content>
                    <Card.Actions style={styles.cardActions}>
                      <Button icon="refresh" compact>Swap</Button>
                      <Button icon="pencil" compact>Edit</Button>
                    </Card.Actions>
                  </Card>
                ))
              ) : (
                <Card style={styles.emptyCard} mode="outlined">
                  <Card.Content style={styles.emptyContent}>
                    <IconButton icon="silverware-fork-knife" size={30} iconColor="gray" />
                    <Paragraph style={{ color: 'gray' }}>No meals planned</Paragraph>
                    <Button mode="text" compact>Add Meal</Button>
                  </Card.Content>
                </Card>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  dayContainer: {
    marginBottom: 24,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cookingChip: {
    backgroundColor: '#E8DEF8',
  },
  mealCard: {
    marginBottom: 16,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  cardCover: {
    height: 140,
  },
  cardContent: {
    paddingTop: 12,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealTypeChip: {
    backgroundColor: '#f0f0f0',
  },
  calories: {
    fontSize: 12,
    color: 'gray',
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  cardActions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
  },
  emptyCard: {
    backgroundColor: 'transparent',
    borderStyle: 'dashed',
    borderColor: '#ccc',
  },
  emptyContent: {
    alignItems: 'center',
    padding: 10,
  },
});

export default PlannerScreen;
