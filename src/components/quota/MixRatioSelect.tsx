
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MixRatioSelectProps {
  mixRatio: string;
  onMixRatioChange: (value: string) => void;
  customFixed: string;
  customVariable: string;
  onCustomFixedChange: (value: string) => void;
  onCustomVariableChange: (value: string) => void;
}

export const MixRatioSelect = ({
  mixRatio,
  onMixRatioChange,
  customFixed,
  customVariable,
  onCustomFixedChange,
  onCustomVariableChange,
}: MixRatioSelectProps) => {
  const [showCustomDialog, setShowCustomDialog] = useState(false);

  const handleCustomSave = () => {
    const fixed = parseFloat(customFixed) || 0;
    const variable = parseFloat(customVariable) || 0;
    // Use toFixed(2) to handle floating point precision issues
    if (Math.abs(fixed + variable - 100) < 0.001) {
      onMixRatioChange(`custom_${fixed}/${variable}`);
      setShowCustomDialog(false);
    }
  };

  const getDisplayMixRatio = () => {
    if (mixRatio.startsWith('custom_')) {
      return 'Custom';
    }
    return mixRatio;
  };

  const isValidMixSum = () => {
    const fixed = parseFloat(customFixed) || 0;
    const variable = parseFloat(customVariable) || 0;
    // Use toFixed(2) to handle floating point precision issues
    return Math.abs(fixed + variable - 100) < 0.001;
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-[#1A1F2C]">
        Fixed/Variable Mix
      </label>
      <Select
        value={mixRatio}
        onValueChange={(value) => {
          if (value === "custom") {
            setShowCustomDialog(true);
          } else {
            onMixRatioChange(value);
          }
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue>
            {getDisplayMixRatio()}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="85/15">85/15</SelectItem>
          <SelectItem value="80/20">80/20</SelectItem>
          <SelectItem value="75/25">75/25</SelectItem>
          <SelectItem value="75/15">75/15</SelectItem>
          <SelectItem value="70/30">70/30</SelectItem>
          <SelectItem value="65/35">65/35</SelectItem>
          <SelectItem value="60/40">60/40</SelectItem>
          <SelectItem value="custom">Custom...</SelectItem>
        </SelectContent>
      </Select>

      <Dialog open={showCustomDialog} onOpenChange={setShowCustomDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Custom Fixed/Variable Mix</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1A1F2C]">Fixed Component %</label>
              <Input
                type="number"
                value={customFixed}
                onChange={(e) => onCustomFixedChange(e.target.value)}
                min="0"
                max="100"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1A1F2C]">Variable Component %</label>
              <Input
                type="number"
                value={customVariable}
                onChange={(e) => onCustomVariableChange(e.target.value)}
                min="0"
                max="100"
                step="0.1"
              />
            </div>
            <p className="text-sm text-[#7E69AB]">
              Note: Components must add up to 100%
            </p>
            <Button
              onClick={handleCustomSave}
              disabled={!isValidMixSum()}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-[#8B5CF6] rounded-lg hover:bg-[#7C3AED] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Custom Mix
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
