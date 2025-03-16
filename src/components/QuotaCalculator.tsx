import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "./Header";
import { RetentionSliderInput } from "./retention/RetentionSliderInput";
import { MixRatioSelect } from "./quota/MixRatioSelect";
import { QuotaMixSelect } from "./quota/QuotaMixSelect";
import { VariableBreakdown } from "./quota/VariableBreakdown";
interface StoredData {
  role: 'CSM' | 'AM';
  ctc: number;
  mixRatio: string;
  customFixed: string;
  customVariable: string;
  quotaMix: string;
  customRetention: string;
  customExpansion: string;
}
const QuotaCalculator = () => {
  const [role, setRole] = useState<'CSM' | 'AM'>(() => {
    const stored = localStorage.getItem('quotaCalculator');
    return stored ? (JSON.parse(stored) as StoredData).role : 'CSM';
  });
  const [ctc, setCTC] = useState<number>(() => {
    const stored = localStorage.getItem('quotaCalculator');
    return stored ? (JSON.parse(stored) as StoredData).ctc : 1200000;
  });
  const [mixRatio, setMixRatio] = useState<string>(() => {
    const stored = localStorage.getItem('quotaCalculator');
    return stored ? (JSON.parse(stored) as StoredData).mixRatio : "75/25";
  });
  const [customFixed, setCustomFixed] = useState<string>(() => {
    const stored = localStorage.getItem('quotaCalculator');
    return stored ? (JSON.parse(stored) as StoredData).customFixed : "75";
  });
  const [customVariable, setCustomVariable] = useState<string>(() => {
    const stored = localStorage.getItem('quotaCalculator');
    return stored ? (JSON.parse(stored) as StoredData).customVariable : "25";
  });
  const [quotaMix, setQuotaMix] = useState<string>(() => {
    const stored = localStorage.getItem('quotaCalculator');
    return stored ? (JSON.parse(stored) as StoredData).quotaMix : "70/30";
  });
  const [customRetention, setCustomRetention] = useState<string>(() => {
    const stored = localStorage.getItem('quotaCalculator');
    return stored ? (JSON.parse(stored) as StoredData).customRetention : "70";
  });
  const [customExpansion, setCustomExpansion] = useState<string>(() => {
    const stored = localStorage.getItem('quotaCalculator');
    return stored ? (JSON.parse(stored) as StoredData).customExpansion : "30";
  });
  useEffect(() => {
    const dataToStore: StoredData = {
      role,
      ctc,
      mixRatio,
      customFixed,
      customVariable,
      quotaMix,
      customRetention,
      customExpansion
    };
    localStorage.setItem('quotaCalculator', JSON.stringify(dataToStore));
  }, [role, ctc, mixRatio, customFixed, customVariable, quotaMix, customRetention, customExpansion]);
  const getVariablePercentage = () => {
    if (mixRatio.startsWith('custom_')) {
      return parseFloat(customVariable);
    }
    return parseInt(mixRatio.split('/')[1]);
  };
  const getRetentionPercentage = () => {
    if (quotaMix.startsWith('custom_')) {
      return parseFloat(customRetention) / 100;
    }
    return parseInt(quotaMix.split('/')[0]) / 100;
  };
  const getExpansionPercentage = () => {
    if (quotaMix.startsWith('custom_')) {
      return parseFloat(customExpansion) / 100;
    }
    return parseInt(quotaMix.split('/')[1]) / 100;
  };
  const variableComponent = Math.round(ctc * getVariablePercentage() / 100);

  // Create role options for select component
  const roleOptions = [{
    value: 'CSM',
    label: 'CSM'
  }, {
    value: 'AM',
    label: 'AM [Coming Soon!]',
    disabled: true
  }];
  return <div className="min-h-screen bg-gradient-to-b from-white to-[#9b87f5]/5">
      <Header />
      <div className="py-12">
        <TooltipProvider>
          <div className="max-w-2xl mx-auto p-8 space-y-12">
            <div className="flex justify-between items-center">
              <Link to="/expansion-calculator" className="text-[#7E69AB] hover:text-[#6B4E9B] transition-colors">
                ← Back to Expansion Calculator
              </Link>
              <span className="px-4 py-1 text-xs font-medium bg-[#9b87f5]/10 text-[#9b87f5] rounded-full">
                Quota Configuration
              </span>
            </div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="text-center space-y-2">
              <h1 className="text-4xl font-semibold tracking-tight text-[#1A1F2C]">
                Quota Configuration
              </h1>
              <p className="text-[#7E69AB] max-w-lg mx-auto">
                Configure your quota logic based on your role and compensation structure.
              </p>
            </motion.div>

            <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.2
          }} className="space-y-8">
              <div className="space-y-6">
                {/* Role Selection */}
                
                
                <RetentionSliderInput label="Total CTC (₹)" value={ctc} onChange={setCTC} tooltip="Fixed+Variable Compensation" max={10000000} useINR={true} />
                
                <MixRatioSelect mixRatio={mixRatio} onMixRatioChange={setMixRatio} customFixed={customFixed} customVariable={customVariable} onCustomFixedChange={setCustomFixed} onCustomVariableChange={setCustomVariable} />

                <QuotaMixSelect quotaMix={quotaMix} onQuotaMixChange={setQuotaMix} customRetention={customRetention} customExpansion={customExpansion} onCustomRetentionChange={setCustomRetention} onCustomExpansionChange={setCustomExpansion} />

                <VariableBreakdown variableComponent={variableComponent} variablePercentage={getVariablePercentage()} retentionPercent={getRetentionPercentage()} expansionPercent={getExpansionPercentage()} />
              </div>

              <Link to="/commission-calculator" className="w-full px-6 py-4 text-lg font-medium text-white bg-[#8B5CF6] rounded-xl hover:bg-[#7C3AED] transition-colors flex items-center justify-center">
                Continue to Commission Calculator
              </Link>
            </motion.div>
          </div>
        </TooltipProvider>
      </div>
    </div>;
};
export default QuotaCalculator;