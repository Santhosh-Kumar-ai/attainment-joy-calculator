
import React from "react";
import { AlertTriangle } from "lucide-react";

interface CalculationDisclaimerProps {
  className?: string;
  showDisclaimer?: boolean;
}

export const CalculationDisclaimer: React.FC<CalculationDisclaimerProps> = ({ 
  className,
  showDisclaimer = true
}) => {
  if (!showDisclaimer) return null;
  
  return (
    <div className={`mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg ${className}`}>
      <div className="flex items-start">
        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-sm text-amber-800">
          All values and calculations are indicative and should be validated with relevant internal stakeholders for actuals.
        </p>
      </div>
    </div>
  );
};
