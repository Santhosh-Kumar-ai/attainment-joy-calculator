
/**
 * Calculates the attainment percentage based on actual and target values
 * @param actual The actual value achieved
 * @param target The target value to be achieved
 * @returns The percentage of attainment (capped at 100%)
 */
export const calculateAttainment = (actual: number, target: number): number => {
  if (target <= 0) return 0;
  const percentage = (actual / target) * 100;
  return Math.min(Math.round(percentage * 10) / 10, 100);
};

/**
 * Calculates the remaining amount needed to reach a target
 * @param actual The actual value achieved
 * @param target The target value to be achieved
 * @returns The remaining amount needed to reach the target
 */
export const calculateRemaining = (actual: number, target: number): number => {
  return Math.max(target - actual, 0);
};

/**
 * Formats a percentage value as a string with the % symbol
 * @param value The percentage value to format
 * @returns A formatted percentage string
 */
export const formatPercentage = (value: number): string => {
  return `${value}%`;
};

/**
 * Formats a number with commas as thousands separators
 * @param value The number to format
 * @returns A formatted number string
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat().format(value);
};

/**
 * Determines the attainment level based on the percentage
 * @param percentage The attainment percentage
 * @returns A string representing the attainment level
 */
export const getAttainmentLevel = (percentage: number): string => {
  if (percentage >= 100) return "Achieved";
  if (percentage >= 90) return "Outstanding";
  if (percentage >= 75) return "On Track";
  if (percentage >= 50) return "Progressing";
  if (percentage >= 25) return "Starting";
  return "Initial";
};

/**
 * Get a color based on the attainment percentage
 * @param percentage The attainment percentage
 * @returns A CSS color class
 */
export const getAttainmentColor = (percentage: number): string => {
  if (percentage >= 100) return "text-emerald-500";
  if (percentage >= 90) return "text-blue-500";
  if (percentage >= 75) return "text-sky-500";
  if (percentage >= 50) return "text-amber-500";
  if (percentage >= 25) return "text-orange-500";
  return "text-rose-500";
};
