
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import AnimatedNumber from "../UI/AnimatedNumber";
import ProgressDisplay from "./ProgressDisplay";
import { 
  getAttainmentLevel, 
  getAttainmentColor, 
  formatNumber, 
  formatPercentage 
} from "@/utils/calculationUtils";

interface ResultCardProps {
  actual: number;
  target: number;
  percentage: number;
  remaining: number;
  className?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({
  actual,
  target,
  percentage,
  remaining,
  className,
}) => {
  const level = getAttainmentLevel(percentage);
  const colorClass = getAttainmentColor(percentage);

  return (
    <Card className={cn("overflow-hidden w-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">Attainment Result</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Current Progress</p>
            <div className="flex items-baseline space-x-2">
              <AnimatedNumber
                value={actual}
                formatter={formatNumber}
                className="text-2xl font-medium"
              />
              <span className="text-sm text-muted-foreground">
                of {formatNumber(target)}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Remaining</p>
            <div className="flex items-baseline space-x-2">
              <AnimatedNumber
                value={remaining}
                formatter={formatNumber}
                className="text-2xl font-medium"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Attainment Level</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className={cn("text-2xl font-medium", colorClass)}>{level}</p>
              <AnimatedNumber
                value={percentage}
                formatter={formatPercentage}
                decimals={1}
                className={cn("text-2xl font-medium", colorClass)}
              />
            </div>
            <ProgressDisplay percentage={percentage} size="lg" showPercentage={false} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
