import { PantryItem, BuilderTargetGoal } from '../types';

export const BUILDER_GOALS: BuilderTargetGoal[] = [
  {
    id: 'lean-bulk',
    name: 'Lean Bulk (+Protein)',
    subtitle: 'Maximize muscle hypertrophy with high protein & clean carbs.',
    targetProtein: 60,
    targetCarbs: 60,
    targetFat: 15,
    targetCalories: 615,
    icon: 'Dumbbell'
  },
  {
    id: 'aggressive-cut',
    name: 'Aggressive Cut (-Cal)',
    subtitle: 'High protein density with ultra-low carbs & fat for shredding.',
    targetProtein: 55,
    targetCarbs: 15,
    targetFat: 10,
    targetCalories: 370,
    icon: 'Flame'
  },
  {
    id: 'performance',
    name: 'Athletic Performance',
    subtitle: 'Balanced high carb & protein ratio for endurance & strength.',
    targetProtein: 50,
    targetCarbs: 55,
    targetFat: 12,
    targetCalories: 528,
    icon: 'Zap'
  },
  {
    id: 'maintenance',
    name: 'Lean Maintenance',
    subtitle: 'Steady daily energy, metabolic health, and muscle retention.',
    targetProtein: 45,
    targetCarbs: 40,
    targetFat: 14,
    targetCalories: 466,
    icon: 'Activity'
  }
];

export const PANTRY_ITEMS: PantryItem[] = [
  // BASES
  {
    id: 'b1',
    name: 'Tri-Color Quinoa',
    category: 'bases',
    protein: 6,
    carbs: 39,
    fat: 4,
    calories: 216,
    price: 60,
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80&w=400',
    isVegetarian: true,
    portionSize: '150g'
  },
  {
    id: 'b2',
    name: 'Organic Brown Basmati Rice',
    category: 'bases',
    protein: 5,
    carbs: 45,
    fat: 2,
    calories: 218,
    price: 40,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    isVegetarian: true,
    portionSize: '160g'
  },
  {
    id: 'b3',
    name: 'Roasted Sweet Potato Mash',
    category: 'bases',
    protein: 3,
    carbs: 41,
    fat: 1,
    calories: 185,
    price: 50,
    image: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&q=80&w=400',
    isVegetarian: true,
    portionSize: '140g'
  },
  {
    id: 'b4',
    name: 'Crisp Romaine & Baby Kale Greens',
    category: 'bases',
    protein: 3,
    carbs: 6,
    fat: 1,
    calories: 45,
    price: 45,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400',
    isVegetarian: true,
    portionSize: '120g'
  },

  // PROTEINS
  {
    id: 'p1',
    name: '200g Herb Grilled Chicken Breast',
    category: 'proteins',
    protein: 48,
    carbs: 0,
    fat: 5,
    calories: 245,
    price: 140,
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=400',
    isVegetarian: false,
    portionSize: '200g'
  },
  {
    id: 'p2',
    name: 'Charcoal Chicken Tikka Cubes',
    category: 'proteins',
    protein: 44,
    carbs: 3,
    fat: 7,
    calories: 250,
    price: 130,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=400',
    isVegetarian: false,
    portionSize: '180g'
  },
  {
    id: 'p3',
    name: 'Low-Fat Cottage Cheese (Paneer Tikka)',
    category: 'proteins',
    protein: 32,
    carbs: 6,
    fat: 14,
    calories: 278,
    price: 110,
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=400',
    isVegetarian: true,
    portionSize: '160g'
  },
  {
    id: 'p4',
    name: 'Pan-Seared Organic Tofu',
    category: 'proteins',
    protein: 26,
    carbs: 5,
    fat: 10,
    calories: 214,
    price: 90,
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80&w=400',
    isVegetarian: true,
    portionSize: '160g'
  },
  {
    id: 'p5',
    name: '4 Boiled Egg Whites + 1 Whole Egg',
    category: 'proteins',
    protein: 28,
    carbs: 2,
    fat: 6,
    calories: 174,
    price: 70,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400',
    isVegetarian: false,
    portionSize: '5 Eggs'
  },

  // VEGGIES & SAUCES
  {
    id: 'v1',
    name: 'Steamed Broccoli & Asparagus',
    category: 'veggies',
    protein: 4,
    carbs: 8,
    fat: 1,
    calories: 57,
    price: 35,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=400',
    isVegetarian: true,
    portionSize: '100g'
  },
  {
    id: 'v2',
    name: 'Roasted Bell Peppers & Sweetcorn',
    category: 'veggies',
    protein: 3,
    carbs: 16,
    fat: 1,
    calories: 85,
    price: 30,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400',
    isVegetarian: true,
    portionSize: '90g'
  },
  {
    id: 'v3',
    name: 'Greek Tzatziki Cucumber Dip',
    category: 'veggies',
    protein: 3,
    carbs: 4,
    fat: 3,
    calories: 55,
    price: 25,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=400',
    isVegetarian: true,
    portionSize: '50ml'
  },
  {
    id: 'v4',
    name: 'Chipotle Greek Curd Mayo',
    category: 'veggies',
    protein: 4,
    carbs: 3,
    fat: 4,
    calories: 64,
    price: 25,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=400',
    isVegetarian: true,
    portionSize: '40ml'
  },

  // TOPPINGS & FATS
  {
    id: 't1',
    name: 'Fresh Hass Avocado Slices',
    category: 'toppings',
    protein: 2,
    carbs: 6,
    fat: 15,
    calories: 160,
    price: 50,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400',
    isVegetarian: true,
    portionSize: '60g'
  },
  {
    id: 't2',
    name: 'Toasted Almonds & Pumpkin Seeds',
    category: 'toppings',
    protein: 6,
    carbs: 5,
    fat: 14,
    calories: 168,
    price: 40,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400',
    isVegetarian: true,
    portionSize: '30g'
  },
  {
    id: 't3',
    name: 'Crumbled Greek Feta Cheese',
    category: 'toppings',
    protein: 5,
    carbs: 2,
    fat: 7,
    calories: 91,
    price: 35,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=400',
    isVegetarian: true,
    portionSize: '35g'
  },
  {
    id: 't4',
    name: 'Creamy Garlic Tahini Hummus',
    category: 'toppings',
    protein: 4,
    carbs: 9,
    fat: 8,
    calories: 124,
    price: 35,
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80&w=400',
    isVegetarian: true,
    portionSize: '50g'
  }
];
