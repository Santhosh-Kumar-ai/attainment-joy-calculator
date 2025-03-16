
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

interface QuotaMixSelectProps {
  quotaMix: string;
  onQuotaMixChange: (value: string) => void;
  customRetention: string;
  customExpansion: string;
  onCustomRetentionChange: (value: string) => void;
  onCustomExpansionChange: (value: string) => void;
}

export const QuotaMixSelect = ({
  quotaMix,
  onQuotaMixChange,
  customRetention,
  customExpansion,
  onCustomRetentionChange,
  onCustomExpansionChange,
}: QuotaMixSelectProps) => {
  const [showCustomDialog, setShowCustomDialog] = useState(false);

  const handleCustomSave = () => {
    const retention = parseFloat(customRetention) || 0;
    const expansion = parseFloat(customExpansion) || 0;
    // Use small threshold to handle floating point precision issues
    if (Math.abs(retention + expansion - 100) < 0.001) {
      onQuotaMixChange(`custom_${retention}/${expansion}`);
      setShowCustomDialog(false);
    }
  };

  const getDisplayQuotaMix = () => {
    if (!quotaMix) return "70% Retention 30% Expansion"; // Default display value
    if (quotaMix?.startsWith('custom_')) {
      return 'Custom';
    }
    return quotaMix === "70/30" ? "70% Retention 30% Expansion" : "30% Retention 70% Expansion";
  };

  const isValidMixSum = () => {
    const retention = parseFloat(customRetention) || 0;
    const expansion = parseFloat(customExpansion) || 0;
    // Use small threshold to handle floating point precision issues
    return Math.abs(retention + expansion - 100) < 0.001;
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-[#1A1F2C]">
        Quota Mix
      </label>
      <Select
        value={quotaMix || "70/30"} // Provide default value
        onValueChange={(value) => {
          if (value === "custom") {
            setShowCustomDialog(true);
          } else {
            onQuotaMixChange(value);
          }
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue>
            {getDisplayQuotaMix()}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="70/30">70% Retention 30% Expansion</SelectItem>
          <SelectItem value="30/70">30% Retention 70% Expansion</SelectItem>
          <SelectItem value="custom">Custom...</SelectItem>
        </SelectContent>
      </Select>

      <Dialog open={showCustomDialog} onOpenChange={setShowCustomDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Custom Quota Mix</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1A1F2C]">Retention %</label>
              <Input
                type="number"
                value={customRetention}
                onChange={(e) => onCustomRetentionChange(e.target.value)}
                min="0"
                max="100"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1A1F2C]">Expansion %</label>
              <Input
                type="number"
                value={customExpansion}
                onChange={(e) => onCustomExpansionChange(e.target.value)}
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
