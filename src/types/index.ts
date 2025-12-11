export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string; // URL or require path
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: string;
  ingredients: Ingredient[];
  instructions: string[];
  tags: string[];
}

export interface MealSlot {
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  recipeId?: string;
  recipe?: Recipe; // Populated recipe
  note?: string; // For "Leftovers" or "Eating Out"
}

export interface DayPlan {
  date: string; // ISO date
  dayOfWeek: string; // Monday, Tuesday...
  meals: MealSlot[];
}

export interface WeeklyPlan {
  id: string;
  weekStartDate: string;
  days: DayPlan[];
}
