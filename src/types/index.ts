export type CategoryType = 
  | 'Wraps'
  | 'Chicken Meals'
  | 'Rice Bowls'
  | 'Healthy Bowls'
  | 'Kebabs'
  | 'Rolls'
  | 'Salads'
  | 'Protein Drinks';

export type GoalType = 'Muscle Gain' | 'Fat Loss' | 'Maintenance' | 'Bulking' | 'Cutting';

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryType;
  price: number;
  protein: number; // in grams
  calories: number; // in kcal
  carbs: number; // in grams
  fat: number; // in grams
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  isBestSeller?: boolean;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  recommendedFor?: GoalType[];
  prepTime?: string;
  tags?: string[];
  ingredients?: string[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedAddons?: string[];
  specialInstructions?: string;
}

export interface CategoryInfo {
  id: CategoryType;
  name: string;
  description: string;
  image: string;
  itemCount: number;
  accentColor?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  review: string;
  favoriteMeal: string;
  verifiedUser: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Nutrition' | 'Delivery' | 'Ordering' | 'Subscriptions';
}

export interface FitnessGoalInfo {
  id: GoalType;
  title: string;
  description: string;
  macroRatio: string;
  recommendedCalories: string;
  iconName: string;
  recommendedMealIds: string[];
  tips: string[];
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  caption: string;
  postUrl: string;
}

// Pantry & Precision Bowl Builder Types
export type PantryCategory = 'bases' | 'proteins' | 'veggies' | 'toppings';

export interface PantryItem {
  id: string;
  name: string;
  category: PantryCategory;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  price: number;
  image: string;
  isVegetarian: boolean;
  portionSize: string;
}

export interface BuilderTargetGoal {
  id: string;
  name: string;
  subtitle: string;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
  targetCalories: number;
  icon: string;
}
