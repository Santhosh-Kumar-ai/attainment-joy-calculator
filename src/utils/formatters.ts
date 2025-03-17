
export const formatCurrency = (value: number) => {
  if (!value || isNaN(value)) return '₹0';
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatUSD = (value: number) => {
  if (!value || isNaN(value)) return '$0';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercentage = (value: number) => {
  if (!value || isNaN(value)) return '0.00%';
  
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

// This is a special formatter for the Commission Calculator
// that handles NaN values by returning "0" instead of "NaN%"
export const formatCommissionPercentage = (value: number) => {
  if (isNaN(value)) return '0';
  
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

// This is a special formatter for the Expansion Calculator
// that handles NaN values by returning "-" instead of "NaN%"
export const formatExpansionPercentage = (value: number) => {
  if (isNaN(value)) return '-';
  
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
