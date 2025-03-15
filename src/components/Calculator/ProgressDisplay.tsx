
import React from "react";
import { cn } from "@/lib/utils";
import AnimatedNumber from "../UI/AnimatedNumber";
import { formatPercentage } from "@/utils/calculationUtils";

interface ProgressDisplayProps {
  percentage: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  showPercentage?: boolean;
}

const ProgressDisplay: React.FC<ProgressDisplayProps> = ({
  percentage,
  className,
  size = "md",
  showPercentage = true,
}) => {
  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };
  
  const getColorClass = (percent: number) => {
    if (percent >= 100) return "bg-emerald-500";
    if (percent >= 90) return "bg-blue-500";
    if (percent >= 75) return "bg-sky-500";
    if (percent >= 50) return "bg-amber-500";
    if (percent >= 25) return "bg-orange-500";
    return "bg-rose-500";
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="relative w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn(
            "transition-all duration-1000 ease-out rounded-full",
            sizeClasses[size],
            getColorClass(percentage)
          )}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      
      {showPercentage && (
        <div className="flex justify-end text-sm text-muted-foreground">
          <AnimatedNumber
            value={percentage}
            formatter={formatPercentage}
            decimals={1}
            duration={1200}
          />
        </div>
      )}
    </div>
  );
};

export default ProgressDisplay;
