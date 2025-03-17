import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RetentionSliderInput } from "./retention/RetentionSliderInput";
import { RetentionResults } from "./retention/RetentionResults";
import { Header } from "./Header";
import { formatCurrency } from "@/utils/formatters";

interface StoredRetentionData {
  minRetention: number;
  maxRetention: number;
  bookARR: number;
  churnARR: number;
}

const RetentionCalculator = () => {
  const [minRetention, setMinRetention] = useState<number>(() => {
    const stored = localStorage.getItem('retentionCalculator');
    return stored ? (JSON.parse(stored) as StoredRetentionData).minRetention : 0;
  });

  const [maxRetention, setMaxRetention] = useState<number>(() => {
    const stored = localStorage.getItem('retentionCalculator');
    return stored ? (JSON.parse(stored) as StoredRetentionData).maxRetention : 0;
  });

  const [bookARR, setBookARR] = useState<number>(() => {
    const stored = localStorage.getItem('retentionCalculator');
    return stored ? (JSON.parse(stored) as StoredRetentionData).bookARR : 0;
  });

  const [churnARR, setChurnARR] = useState<number>(() => {
    const stored = localStorage.getItem('retentionCalculator');
    return stored ? (JSON.parse(stored) as StoredRetentionData).churnARR : 0;
  });

  const [retentionRate, setRetentionRate] = useState<number>(0);
  const [attainment, setAttainment] = useState<number>(0);
  const [isError, setIsError] = useState(false);
  const [maxQuarterlyChurn, setMaxQuarterlyChurn] = useState<number>(0);
  const [quarterlyChurnTarget, setQuarterlyChurnTarget] = useState<number>(0);

  useEffect(() => {
    if (churnARR >= bookARR) {
      setIsError(true);
      toast.error("Churn ARR cannot exceed or equal Book Start ARR");
      return;
    }
    if (minRetention >= maxRetention) {
      setIsError(true);
      toast.error("Minimum retention target cannot exceed maximum retention target");
      return;
    }
    setIsError(false);

    const maxAllowedChurn = bookARR * (1 - Math.pow(minRetention, 1 / 12));
    setMaxQuarterlyChurn(maxAllowedChurn);

    const churnTarget = bookARR * (1 - Math.pow(maxRetention, 1 / 12));
    setQuarterlyChurnTarget(churnTarget);

    const retention = (bookARR - churnARR) / bookARR;
    const annualRetention = Math.pow(retention, 12);
    setRetentionRate(annualRetention);

    let calculatedAttainment = 0;
    if (annualRetention === 1) {
      calculatedAttainment = 1.5;
    } else if (annualRetention <= minRetention) {
      calculatedAttainment = 0;
    } else if (annualRetention <= maxRetention) {
      const ratio = (annualRetention - minRetention) / (maxRetention - minRetention);
      calculatedAttainment = ratio;
    } else if (annualRetention < 1) {
      const ratio = (annualRetention - maxRetention) / (1 - maxRetention);
      calculatedAttainment = 1 + ratio * 0.5;
    }
    setAttainment(calculatedAttainment);
  }, [bookARR, churnARR, minRetention, maxRetention]);

  useEffect(() => {
    const dataToStore: StoredRetentionData = {
      minRetention,
      maxRetention,
      bookARR,
      churnARR
    };
    localStorage.setItem('retentionCalculator', JSON.stringify(dataToStore));
  }, [minRetention, maxRetention, bookARR, churnARR]);

  return <div className="min-h-screen bg-gradient-to-b from-white to-[#9b87f5]/5">
      <Header />
      <div className="py-[48px]">
        <TooltipProvider>
          <div className="max-w-2xl mx-auto p-8 space-y-12">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-[#7E69AB] hover:text-[#6B4E9B] transition-colors">
                ← Back to overview
              </Link>
              <span className="px-4 py-1 text-xs font-medium bg-[#9b87f5]/10 text-[#9b87f5] rounded-full">
                Retention Rate Calculator
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
                Retention Rate Calculator
              </h1>
              <p className="text-[#7E69AB] max-w-lg mx-auto">
                Set your retention targets and input your quarterly ARR values to calculate your retention rate and attainment.
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
                <RetentionSliderInput 
                  label="Book Start ARR" 
                  value={bookARR} 
                  onChange={setBookARR} 
                  tooltip="Sum of book start ARR of all three months in the quarter" 
                  max={50000000} 
                />
                <RetentionSliderInput 
                  label="Retention Target" 
                  value={maxRetention} 
                  onChange={setMaxRetention} 
                  tooltip="The higher target % for 100% attainment" 
                  isPercentage 
                />
                <RetentionSliderInput 
                  label="Minimum Retention Target" 
                  value={minRetention} 
                  onChange={setMinRetention} 
                  tooltip="The lower threshold target % at which the attainment becomes 0%" 
                  isPercentage 
                />
                <RetentionSliderInput 
                  label="Churn ARR" 
                  value={churnARR} 
                  onChange={setChurnARR} 
                  tooltip="Sum of Churn ARR of all three months in the quarter" 
                  max={50000000} 
                  isError={isError} 
                />
              </div>

              <RetentionResults 
                retentionRate={retentionRate} 
                attainment={attainment} 
                isError={isError} 
                maxQuarterlyChurn={maxQuarterlyChurn} 
                quarterlyChurnTarget={quarterlyChurnTarget} 
              />

              <Link to="/expansion-calculator" className={`inline-flex items-center justify-center w-full px-6 py-4 text-lg font-medium text-white bg-[#8B5CF6] rounded-xl ${isError ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'hover:bg-[#7C3AED]'} transition-colors`}>
                Continue to Expansion Calculator
              </Link>
            </motion.div>
          </div>
        </TooltipProvider>
      </div>
    </div>;
};

export default RetentionCalculator;
