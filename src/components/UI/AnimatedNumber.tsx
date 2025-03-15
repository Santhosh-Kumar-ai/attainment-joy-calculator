
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  formatter?: (value: number) => string;
  decimals?: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1000,
  className,
  formatter = (val) => val.toString(),
  decimals = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const startTime = Date.now();
    const startValue = displayValue;
    const endValue = value;
    const changeInValue = endValue - startValue;
    
    const animateValue = () => {
      const now = Date.now();
      const elapsedTime = now - startTime;
      
      if (elapsedTime < duration) {
        const progress = elapsedTime / duration;
        // Use easeOutQuart for smooth deceleration
        const easing = 1 - Math.pow(1 - progress, 4);
        const currentValue = startValue + changeInValue * easing;
        setDisplayValue(parseFloat(currentValue.toFixed(decimals)));
        requestAnimationFrame(animateValue);
      } else {
        setDisplayValue(endValue);
      }
    };
    
    animateValue();
    
    return () => {
      // Cleanup if needed
    };
  }, [value, duration, decimals]);
  
  return (
    <span className={cn("tabular-nums", className)}>
      {formatter(displayValue)}
    </span>
  );
};

export default AnimatedNumber;
