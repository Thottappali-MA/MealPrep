import { Recipe, WeeklyPlan } from '../types';

export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Lemon Herb Chicken',
    description: 'Simple and fresh chicken dinner with roasted vegetables.',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    difficulty: 'Easy',
    cuisine: 'Western',
    ingredients: [
      { id: 'i1', name: 'Chicken Breast', amount: '2', unit: 'pcs' },
      { id: 'i2', name: 'Lemon', amount: '1', unit: 'pc' },
      { id: 'i3', name: 'Thyme', amount: '1', unit: 'tsp' },
    ],
    instructions: ['Season chicken', 'Pan fry', 'Serve with lemon'],
    tags: ['Healthy', 'Quick'],
  },
  {
    id: '2',
    title: 'Vegetable Stir Fry',
    description: 'Colorful and crunchy vegetable stir fry with soy glaze.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    prepTime: 15,
    cookTime: 10,
    servings: 2,
    difficulty: 'Easy',
    cuisine: 'Asian',
    ingredients: [
      { id: 'i4', name: 'Mixed Veggies', amount: '2', unit: 'cups' },
      { id: 'i5', name: 'Soy Sauce', amount: '2', unit: 'tbsp' },
    ],
    instructions: ['Chop veggies', 'Stir fry', 'Add sauce'],
    tags: ['Vegetarian', 'Quick'],
  },
  {
    id: '3',
    title: 'Spaghetti Bolognese',
    description: 'Rich and hearty classic Italian meat sauce over pasta.',
    image: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?auto=format&fit=crop&w=800&q=80',
    prepTime: 15,
    cookTime: 45,
    servings: 4,
    difficulty: 'Medium',
    cuisine: 'Italian',
    ingredients: [
      { id: 'i6', name: 'Ground Beef', amount: '500', unit: 'g' },
      { id: 'i7', name: 'Pasta', amount: '400', unit: 'g' },
      { id: 'i8', name: 'Tomato Sauce', amount: '1', unit: 'jar' },
    ],
    instructions: ['Boil pasta', 'Cook sauce', 'Combine'],
    tags: ['Comfort', 'Family'],
  },
  {
    id: '4',
    title: 'Avocado Toast',
    description: 'Creamy avocado on toasted sourdough with poached egg.',
    image: 'https://loremflickr.com/800/600/avocado,toast?lock=1',
    prepTime: 5,
    cookTime: 5,
    servings: 1,
    difficulty: 'Easy',
    cuisine: 'Breakfast',
    ingredients: [
      { id: 'i9', name: 'Bread', amount: '2', unit: 'slices' },
      { id: 'i10', name: 'Avocado', amount: '1', unit: 'pc' },
      { id: 'i11', name: 'Egg', amount: '1', unit: 'pc' },
    ],
    instructions: ['Toast bread', 'Mash avocado', 'Poach egg'],
    tags: ['Breakfast', 'Healthy'],
  },
  {
    id: '5',
    title: 'Grilled Salmon',
    description: 'Perfectly grilled salmon fillet with asparagus.',
    image: 'https://loremflickr.com/800/600/salmon,grilled?lock=1',
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: 'Medium',
    cuisine: 'Seafood',
    ingredients: [
      { id: 'i12', name: 'Salmon Fillet', amount: '2', unit: 'pcs' },
      { id: 'i13', name: 'Asparagus', amount: '1', unit: 'bunch' },
    ],
    instructions: ['Season salmon', 'Grill', 'Serve'],
    tags: ['Healthy', 'Dinner'],
  },
];

export const MOCK_WEEKLY_PLAN: WeeklyPlan = {
  id: 'w1',
  weekStartDate: '2025-12-08',
  days: [
    {
      date: '2025-12-08',
      dayOfWeek: 'Monday',
      meals: [
        { type: 'Dinner', recipeId: '1', recipe: MOCK_RECIPES[0] },
      ],
    },
    {
      date: '2025-12-09',
      dayOfWeek: 'Tuesday',
      meals: [
        { type: 'Dinner', recipeId: '2', recipe: MOCK_RECIPES[1] },
      ],
    },
    {
      date: '2025-12-10',
      dayOfWeek: 'Wednesday',
      meals: [
        { type: 'Dinner', recipeId: '3', recipe: MOCK_RECIPES[2] },
      ],
    },
    // ... other days
  ],
};
