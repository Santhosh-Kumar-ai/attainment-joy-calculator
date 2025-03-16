
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { handleNumberInput } from "@/utils/inputHandlers";
import { useState, useEffect, useRef } from "react";
interface RetentionSliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  tooltip?: string;
  isPercentage?: boolean;
  max?: number;
  isError?: boolean;
  useINR?: boolean;
}
export const RetentionSliderInput = ({
  label,
  value,
  onChange,
  tooltip,
  isPercentage = false,
  max = 100,
  isError = false,
  useINR = false
}: RetentionSliderInputProps) => {
  // Maintain a separate input state for the raw text value
  const [inputValue, setInputValue] = useState<string>(isPercentage ? (value * 100).toFixed(2) : value.toLocaleString());

  // For tracking if we're currently editing manually
  const [isEditing, setIsEditing] = useState(false);

  // Reference to the input element
  const inputRef = useRef<HTMLInputElement>(null);

  // Update the input value when the prop value changes (e.g., from slider)
  useEffect(() => {
    // Only update the displayed input if we're not currently editing it manually
    if (!isEditing) {
      setInputValue(isPercentage ? (value * 100).toFixed(2) : value.toLocaleString());
    }
  }, [value, isPercentage, isEditing]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // First, update the displayed input value
    setInputValue(e.target.value);
    setIsEditing(true);
  };
  const handleInputBlur = () => {
    setIsEditing(false);
    processInputValue();
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      processInputValue();
      // Remove focus from the input
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };
  const processInputValue = () => {
    if (isPercentage) {
      // Remove non-numeric characters except for decimals
      const cleanValue = inputValue.replace(/[^0-9.]/g, '');

      // Ensure there's only one decimal point
      const parts = cleanValue.split('.');
      const sanitizedValue = parts[0] + (parts.length > 1 ? '.' + parts.slice(1).join('') : '');
      const numberValue = parseFloat(sanitizedValue);

      // Check if the input is a valid number and within range
      if (!isNaN(numberValue) && numberValue <= 100) {
        // Convert percentage to decimal (divide by 100)
        onChange(numberValue / 100);
      }

      // Update the display value to match the processed value
      setInputValue((isNaN(numberValue) ? 0 : Math.min(numberValue, 100)).toFixed(2));
    } else {
      // Use the existing handler for non-percentage values
      handleNumberInput(inputValue, onChange, max);

      // Update the display value to match the processed value
      const cleanValue = inputValue.replace(/[^0-9.]/g, '');
      const parts = cleanValue.split('.');
      const sanitizedValue = parts[0] + (parts.length > 1 ? '.' + parts.slice(1).join('') : '');
      const numberValue = Number(sanitizedValue);
      if (!isNaN(numberValue)) {
        setInputValue(Math.min(numberValue, max).toLocaleString());
      } else {
        setInputValue("0");
      }
    }
  };
  return <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-[#1A1F2C] flex items-center gap-2">
          {label}
          {tooltip && <Tooltip>
              <TooltipTrigger asChild>
                <Info size={16} className="text-[#7E69AB] cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>}
        </label>
        <div className="flex items-center gap-4">
          {!isPercentage && <span className="font-mono text-sm text-[#8B5CF6]">{useINR ? '₹' : '$'}</span>}
          <Input ref={inputRef} type="text" value={inputValue} onChange={handleInputChange} onBlur={handleInputBlur} onKeyDown={handleKeyDown} className={`${isPercentage ? 'w-20' : 'w-32'} text-right font-mono text-sm text-[#8B5CF6]`} />
          {isPercentage && <span className="font-mono text-sm text-[#8B5CF6]">%</span>}
        </div>
      </div>
      <Slider value={[isPercentage ? value * 100 : value]} min={0} max={isPercentage ? 100 : max} step={isPercentage ? 0.01 : 1000} onValueChange={value => {
      if (!isEditing) onChange(isPercentage ? value[0] / 100 : value[0]);
    }} className={`py-4 ${isError ? 'opacity-50' : ''}`} />
    </div>;
};
