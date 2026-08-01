export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const calculateTDEE = (
  weightKg: number,
  heightCm: number,
  ageYears: number,
  gender: 'male' | 'female',
  activityMultiplier: number
): { bmr: number; tdee: number; proteinGrams: number } => {
  // Mifflin-St Jeor Equation
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  const tdee = Math.round(bmr * activityMultiplier);
  const proteinGrams = Math.round(weightKg * 2.0); // 2.0g/kg target

  return { bmr: Math.round(bmr), tdee, proteinGrams };
};

export const calculateBMI = (
  weightKg: number,
  heightCm: number
): { bmi: number; category: string; categoryColor: string } => {
  const heightMeters = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightMeters * heightMeters)).toFixed(1));

  let category = '';
  let categoryColor = '';

  if (bmi < 18.5) {
    category = 'Underweight';
    categoryColor = '#3B82F6';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal weight (Healthy)';
    categoryColor = '#39D353';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    categoryColor = '#FF7A00';
  } else {
    category = 'Obese';
    categoryColor = '#EF4444';
  }

  return { bmi, category, categoryColor };
};
