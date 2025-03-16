
import React, { useState } from "react";
import CommissionCalculator from "./CommissionCalculator";
import { CalculationDisclaimer } from "./CalculationDisclaimer";

export const CommissionCalculatorWrapper: React.FC = () => {
  const [calculationPerformed, setCalculationPerformed] = useState(false);
  
  // This function will be called after calculation is performed
  const handleCalculationComplete = () => {
    setCalculationPerformed(true);
  };
  
  return (
    <div className="w-full">
      <CommissionCalculator onCalculationComplete={handleCalculationComplete} />
      {calculationPerformed && <CalculationDisclaimer />}
    </div>
  );
};
