
export const handleNumberInput = (
  value: string, 
  setter: (value: number) => void, 
  max: number
) => {
  // Remove commas and other non-numeric characters except for decimals
  const cleanValue = value.replace(/[^0-9.]/g, '');
  
  // Ensure there's only one decimal point
  const parts = cleanValue.split('.');
  const sanitizedValue = parts[0] + (parts.length > 1 ? '.' + parts.slice(1).join('') : '');
  
  const numberValue = Number(sanitizedValue);
  
  if (!isNaN(numberValue) && numberValue <= max) {
    setter(numberValue);
  }
};

export const handlePercentageInput = (
  value: string, 
  setter: (value: number) => void
) => {
  // Remove non-numeric characters except for decimals
  const cleanValue = value.replace(/[^0-9.]/g, '');
  
  // Ensure there's only one decimal point
  const parts = cleanValue.split('.');
  const sanitizedValue = parts[0] + (parts.length > 1 ? '.' + parts.slice(1).join('') : '');
  
  const numberValue = parseFloat(sanitizedValue);
  
  // Check if the input is a valid number and within range
  if (!isNaN(numberValue) && numberValue <= 100) {
    // Convert percentage to decimal (divide by 100)
    setter(numberValue / 100);
  }
};
