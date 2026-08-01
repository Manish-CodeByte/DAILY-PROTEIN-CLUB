import { FitnessGoalInfo } from '../types';

export const FITNESS_GOALS: FitnessGoalInfo[] = [
  {
    id: 'Muscle Gain',
    title: 'Muscle Hypertrophy & Gain',
    description: 'High protein ratio (1.8-2.2g per kg body weight) paired with complex carbs to fuel intense resistance training and maximize muscle protein synthesis.',
    macroRatio: '40% Protein | 40% Carbs | 20% Fat',
    recommendedCalories: '2,400 - 3,200 kcal/day',
    iconName: 'Dumbbell',
    recommendedMealIds: ['item-1', 'item-5', 'item-6', 'item-17', 'item-18'],
    tips: [
      'Consume 40-50g protein every 3-4 hours.',
      'Pair protein with complex carbs after workouts to trigger insulin-mediated nutrient uptake.',
      'Stay hydrated with at least 3.5 - 4 Liters of water daily.'
    ]
  },
  {
    id: 'Fat Loss',
    title: 'Fat Loss & Recomposition',
    description: 'High protein, moderate fat, and controlled low-GI carbs to maintain lean muscle mass while operating in a sustainable caloric deficit.',
    macroRatio: '50% Protein | 25% Carbs | 25% Fat',
    recommendedCalories: '1,600 - 2,100 kcal/day',
    iconName: 'Flame',
    recommendedMealIds: ['item-6', 'item-8', 'item-11', 'item-13', 'item-19'],
    tips: [
      'Prioritize lean chicken breast & egg white meals.',
      'Replace refined grains with brown basmati rice or quinoa.',
      'Incorporate a 30g Whey Isolate shake as a low-calorie high-satiety snack.'
    ]
  },
  {
    id: 'Maintenance',
    title: 'Lean Athletic Maintenance',
    description: 'Balanced macronutrient breakdown designed for athletes, fitness lovers, and students wanting consistent energy, focus, and physical fitness.',
    macroRatio: '35% Protein | 45% Carbs | 20% Fat',
    recommendedCalories: '2,000 - 2,500 kcal/day',
    iconName: 'Activity',
    recommendedMealIds: ['item-2', 'item-5', 'item-9', 'item-16', 'item-20'],
    tips: [
      'Maintain consistent meal timing between classes and workout sessions.',
      'Incorporate vibrant antioxidant berries and leafy green salads.',
      'Enjoy macro-counted wraps for quick fuel on the go.'
    ]
  },
  {
    id: 'Bulking',
    title: 'Clean Bulking Phase',
    description: 'Caloric surplus with high quality whole food carbs, lean meats, healthy fats, and calorie-dense shakes for maximum strength and mass gains.',
    macroRatio: '35% Protein | 50% Carbs | 15% Fat',
    recommendedCalories: '2,800 - 3,600 kcal/day',
    iconName: 'TrendingUp',
    recommendedMealIds: ['item-2', 'item-4', 'item-10', 'item-14', 'item-17'],
    tips: [
      'Add natural peanut butter and oats to your daily protein shake.',
      'Eat 4-5 substantial macro bowls per day.',
      'Never skip your post-workout rice bowl meal.'
    ]
  },
  {
    id: 'Cutting',
    title: 'Aggressive Contest / Summer Cut',
    description: 'Maximum protein density with minimal carbs and ultra-low fat to strip body fat while preserving every ounce of hard-earned muscle tissue.',
    macroRatio: '55% Protein | 20% Carbs | 25% Fat',
    recommendedCalories: '1,400 - 1,800 kcal/day',
    iconName: 'Zap',
    recommendedMealIds: ['item-6', 'item-8', 'item-11', 'item-18', 'item-20'],
    tips: [
      'Stick strictly to 250g Ultimate Grilled Chicken & Egg Whites.',
      'Zero sugary sauces or refined seed oils.',
      'Drink 4L water and monitor your sodium intake.'
    ]
  }
];
