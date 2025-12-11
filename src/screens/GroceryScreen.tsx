import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { List, Checkbox, Title, Button } from 'react-native-paper';
import { MOCK_RECIPES } from '../constants/mockData';

const GroceryScreen = () => {
  // Mock generating list from recipes
  const allIngredients = MOCK_RECIPES.flatMap(r => r.ingredients);
  // Deduplicate by name for simplicity
  const uniqueIngredients = Array.from(new Set(allIngredients.map(i => i.name)))
    .map(name => allIngredients.find(i => i.name === name)!);

  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter(item => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Title style={styles.title}>Grocery List</Title>
      <List.Section>
        <List.Subheader>Produce</List.Subheader>
        {uniqueIngredients.map((item) => (
          <List.Item
            key={item.id}
            title={item.name}
            description={`${item.amount} ${item.unit}`}
            left={() => <Checkbox status={checkedItems.includes(item.id) ? 'checked' : 'unchecked'} onPress={() => toggleItem(item.id)} />}
            onPress={() => toggleItem(item.id)}
          />
        ))}
      </List.Section>
      <Button mode="contained" style={styles.button} onPress={() => setCheckedItems([])}>
        Clear Checked
      </Button>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  }
});

export default GroceryScreen;
