
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import { calculateAttainment, calculateRemaining } from "@/utils/calculationUtils";
import { useToast } from "@/components/ui/use-toast";

interface AttainmentFormProps {
  onCalculate: (data: {
    actual: number;
    target: number;
    percentage: number;
    remaining: number;
  }) => void;
  className?: string;
}

const AttainmentForm: React.FC<AttainmentFormProps> = ({
  onCalculate,
  className,
}) => {
  const [actual, setActual] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const { toast } = useToast();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const actualNum = parseFloat(actual);
    const targetNum = parseFloat(target);
    
    if (isNaN(actualNum) || isNaN(targetNum)) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers for actual and target values.",
        variant: "destructive",
      });
      return;
    }
    
    if (targetNum <= 0) {
      toast({
        title: "Invalid Target",
        description: "Target value must be greater than zero.",
        variant: "destructive",
      });
      return;
    }
    
    const percentage = calculateAttainment(actualNum, targetNum);
    const remaining = calculateRemaining(actualNum, targetNum);
    
    onCalculate({
      actual: actualNum,
      target: targetNum,
      percentage,
      remaining,
    });
  };

  return (
    <form onSubmit={handleCalculate} className={cn("space-y-6", className)}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="actual" className="text-base">
            Current Value
          </Label>
          <Input
            id="actual"
            type="number"
            placeholder="0"
            className="input-minimal text-lg"
            value={actual}
            onChange={(e) => setActual(e.target.value)}
            min="0"
            step="any"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="target" className="text-base">
            Target Value
          </Label>
          <Input
            id="target"
            type="number"
            placeholder="0"
            className="input-minimal text-lg"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            min="0.1"
            step="any"
            required
          />
        </div>
      </div>
      
      <Button
        type="submit"
        className="btn-primary w-full sm:w-auto"
        size="lg"
      >
        <Calculator className="mr-2 h-4 w-4" />
        Calculate Attainment
      </Button>
    </form>
  );
};

export default AttainmentForm;
