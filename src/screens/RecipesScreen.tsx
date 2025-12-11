import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Chip } from 'react-native-paper';
import { MOCK_RECIPES } from '../constants/mockData';

const RecipesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const filteredRecipes = MOCK_RECIPES.filter(recipe => 
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search recipes"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {filteredRecipes.map((recipe) => (
          <Card key={recipe.id} style={styles.card} onPress={() => {}}>
            <Card.Cover source={{ uri: recipe.image }} />
            <Card.Content>
              <Title>{recipe.title}</Title>
              <Paragraph>{recipe.description}</Paragraph>
              <View style={styles.chips}>
                <Chip icon="clock" style={styles.chip}>{recipe.prepTime + recipe.cookTime} min</Chip>
                <Chip icon="fire" style={styles.chip}>{recipe.difficulty}</Chip>
                <Chip icon="food" style={styles.chip}>{recipe.cuisine}</Chip>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 8,
  },
  chip: {
    marginRight: 4,
  }
});

export default RecipesScreen;
