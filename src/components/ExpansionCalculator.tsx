
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RetentionSliderInput } from "./retention/RetentionSliderInput";
import { Header } from "./Header";

interface StoredExpansionData {
  expansionARR: number;
  targetARR: number;
}

const ExpansionCalculator = () => {
  const [targetARR, setTargetARR] = useState<number>(() => {
    const stored = localStorage.getItem('expansionCalculator');
    return stored ? (JSON.parse(stored) as StoredExpansionData).targetARR : 100000;
  });

  const [expansionARR, setExpansionARR] = useState<number>(() => {
    const stored = localStorage.getItem('expansionCalculator');
    return stored ? (JSON.parse(stored) as StoredExpansionData).expansionARR : 100000;
  });

  const [acceleratedARR, setAcceleratedARR] = useState<number>(0);
  const [attainment, setAttainment] = useState<number>(0);

  useEffect(() => {
    const calculateAcceleratedARR = () => {
      const ratio = expansionARR / targetARR;
      let acceleratedValue = 0;

      if (ratio <= 1) {
        acceleratedValue = expansionARR;
      } else if (ratio <= 2) {
        const baseAmount = targetARR;
        const acceleratedAmount = (expansionARR - targetARR) * 1.5;
        acceleratedValue = baseAmount + acceleratedAmount;
      } else {
        const baseAmount = targetARR;
        const acceleratedAmount = targetARR * 1.5;
        const remainingAmount = expansionARR - (2 * targetARR);
        acceleratedValue = baseAmount + acceleratedAmount + remainingAmount;
      }

      const calculatedAttainment = Math.min((acceleratedValue / targetARR), 4);
      
      setAcceleratedARR(acceleratedValue);
      setAttainment(calculatedAttainment);
    };

    calculateAcceleratedARR();
  }, [expansionARR, targetARR]);

  useEffect(() => {
    const dataToStore: StoredExpansionData = {
      expansionARR,
      targetARR
    };
    localStorage.setItem('expansionCalculator', JSON.stringify(dataToStore));
  }, [expansionARR, targetARR]);

  const getAccelerationText = () => {
    if (expansionARR <= targetARR) {
      return "Full amount @ 1x";
    } else if (expansionARR <= 2 * targetARR) {
      return `Base ($${targetARR.toLocaleString()}) @ 1x\nExcess ($${(expansionARR - targetARR).toLocaleString()}) @ 1.5x`;
    } else {
      return `Base ($${targetARR.toLocaleString()}) @ 1x\nNext $${targetARR.toLocaleString()} @ 1.5x\nRemaining ($${(expansionARR - 2 * targetARR).toLocaleString()}) @ 1x`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#9b87f5]/5">
      <Header />
      <div className="py-12">
        <TooltipProvider>
          <div className="max-w-2xl mx-auto p-8 space-y-12">
            <div className="flex justify-between items-center">
              <Link 
                to="/retention-calculator"
                className="text-[#7E69AB] hover:text-[#6B4E9B] transition-colors"
              >
                ← Back to Retention Rate Calculator
              </Link>
              <span className="px-4 py-1 text-xs font-medium bg-[#9b87f5]/10 text-[#9b87f5] rounded-full">
                Expansion Calculator
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-2"
            >
              <h1 className="text-4xl font-semibold tracking-tight text-[#1A1F2C]">
                Expansion Calculator
              </h1>
              <p className="text-[#7E69AB] max-w-lg mx-auto">
                Calculate your expansion attainment with our accelerator logic.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <RetentionSliderInput
                  label="Expansion Target ARR"
                  value={targetARR}
                  onChange={setTargetARR}
                  tooltip="Quarterly"
                  max={1000000}
                />
                <RetentionSliderInput
                  label="Expansion Attainment ARR"
                  value={expansionARR}
                  onChange={setExpansionARR}
                  tooltip="Quarterly"
                  max={1000000}
                />
              </div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="rounded-2xl bg-gradient-to-b from-[#9b87f5]/5 to-white p-8 shadow-sm border border-[#D6BCFA]"
              >
                <div className="text-center space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-[#7E69AB]">
                        Accelerated ARR Calculation
                      </span>
                      <div className="flex flex-col sm:flex-row justify-between gap-6">
                        <div className="space-y-1 text-center flex-1">
                          <p className="text-xl font-semibold text-[#1A1F2C]">
                            {getAccelerationText().split('\n').map((line, i) => (
                              <span key={i} className="block">{line}</span>
                            ))}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-[#7E69AB]">
                        Accelerated ARR
                      </span>
                      <p className="text-3xl font-semibold tracking-tight text-[#8B5CF6]">
                        ${acceleratedARR.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-[#7E69AB]">
                      Attainment
                    </span>
                    <p className="text-4xl font-semibold tracking-tight text-[#8B5CF6]">
                      {(attainment * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </motion.div>

              <Link
                to="/quota-configuration"
                className="w-full px-6 py-4 text-lg font-medium text-white bg-[#8B5CF6] rounded-xl hover:bg-[#7C3AED] transition-colors flex items-center justify-center"
              >
                Continue to Quota Configuration
              </Link>
            </motion.div>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ExpansionCalculator;
