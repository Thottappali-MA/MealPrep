import { supabase } from '../lib/supabase';

// This service would typically call a Supabase Edge Function
// to keep your OpenAI API key secure on the server side.

export const generateWeeklyPlan = async (preferences: any) => {
  try {
    // Example of calling a Supabase Edge Function
    // const { data, error } = await supabase.functions.invoke('generate-plan', {
    //   body: { preferences },
    // });
    
    // if (error) throw error;
    // return data;

    // MOCK RESPONSE for now
    console.log('Generating plan for:', preferences);
    return {
      message: "This is a mock AI response. Connect Supabase Edge Functions to use OpenAI.",
      plan: "Mock Plan Data"
    };
  } catch (error) {
    console.error('Error generating plan:', error);
    throw error;
  }
};

export const generateRecipe = async (ingredients: string[]) => {
    // Call 'generate-recipe' edge function
    console.log('Generating recipe for:', ingredients);
    return {
        title: "AI Generated Recipe",
        ingredients: ingredients,
        instructions: ["Step 1", "Step 2"]
    };
};
