export interface NutritionGuideTopic {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  icon: string;
  details: {
    heading: string;
    content: string;
    bulletPoints: string[];
  }[];
}

export const NUTRITION_TOPICS: NutritionGuideTopic[] = [
  {
    id: 'protein-guide',
    title: 'Protein Masterclass',
    subtitle: 'Why Protein is King for Muscle & Fat Loss',
    summary: 'Protein provides the essential amino acid building blocks required for muscle repair, enzyme production, immune support, and metabolic rate elevation.',
    icon: 'ShieldCheck',
    details: [
      {
        heading: 'How Much Protein Do You Really Need?',
        content: 'For sedentary individuals, 0.8g per kg is sufficient. However, for active weightlifters, athletes, and students in Manipal pursuing fitness goals, optimal intake ranges from 1.6g to 2.2g of protein per kg of body weight.',
        bulletPoints: [
          'Fat Loss: 2.0g - 2.4g / kg bodyweight (preserves muscle in a deficit)',
          'Muscle Gain: 1.6g - 2.2g / kg bodyweight (fuels hypertrophy)',
          'General Health: 1.2g - 1.5g / kg bodyweight'
        ]
      },
      {
        heading: 'Protein Quality & Bioavailability (PDCAAS)',
        content: 'Not all proteins are created equal. Whey Isolate, Chicken Breast, Eggs, and Cottage Cheese (Paneer) rank at the top with 100% Digestibility Score.',
        bulletPoints: [
          'Chicken Breast: Complete amino acid profile with high Leucine content.',
          'Whey Isolate: Ultra-fast digestion within 30-45 mins post-workout.',
          'Paneer & Tofu: Excellent slow-release casein and plant protein sources.'
        ]
      }
    ]
  },
  {
    id: 'calories-guide',
    title: 'Caloric Energy Balance',
    subtitle: 'Mastering BMR, TDEE & Energy Thermodynamics',
    summary: 'Bodyweight regulation follows the first law of thermodynamics. Energy In (Food) vs. Energy Out (BMR + TEF + NEAT + Exercise).',
    icon: 'Flame',
    details: [
      {
        heading: 'Understanding TDEE (Total Daily Energy Expenditure)',
        content: 'TDEE is the total calories your body burns in 24 hours based on your Basal Metabolic Rate (BMR) and physical activity levels.',
        bulletPoints: [
          'BMR (60-70%): Energy spent keeping organs alive at rest.',
          'NEAT (15-20%): Non-Exercise Activity (walking, typing, daily movement).',
          'EAT (10-15%): Direct gym workouts & cardio sessions.',
          'TEF (10%): Thermic Effect of Food (Protein requires 20-30% of its calories just to digest!).'
        ]
      }
    ]
  },
  {
    id: 'macros-breakdown',
    title: 'Macronutrient Blueprint',
    subtitle: 'Balancing Carbs, Fats & Fiber for Peak Performance',
    summary: 'While calories dictate body weight, your macronutrient split dictates body composition (muscle vs fat ratio).',
    icon: 'PieChart',
    details: [
      {
        heading: 'Complex Carbs vs Simple Carbs',
        content: 'Carbohydrates are your brain and muscle energy source. At Daily Protein Club, we prioritize low-GI brown basmati rice, quinoa, and whole wheat.',
        bulletPoints: [
          'Complex Carbs: Sustained glucose release without blood sugar spikes.',
          'Healthy Fats: Avocado, olive oil, and nuts for hormone production & joint health.',
          'Dietary Fiber: 25-35g daily for gut microbiome health & digestive regularity.'
        ]
      }
    ]
  },
  {
    id: 'healthy-eating-tips',
    title: 'Student & Athlete Meal Hacks',
    subtitle: 'Practical Nutrition Strategies for Manipal Life',
    summary: 'Staying consistent with clean eating in college can be challenging. Here are 4 battle-tested rules to stay on track effortlessy.',
    icon: 'Sparkles',
    details: [
      {
        heading: 'Consistency Over Perfection',
        content: 'Eating clean 80-90% of the time yields dramatic physical transformations without feeling restricted.',
        bulletPoints: [
          'Pre-book your weekly meal plan to avoid midnight junk food cravings.',
          'Always carry a shaker with 1 scoop of Whey Isolate for emergency protein.',
          'Hydrate with at least 500ml water immediately upon waking up.'
        ]
      }
    ]
  }
];
