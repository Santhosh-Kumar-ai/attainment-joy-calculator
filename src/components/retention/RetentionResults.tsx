
import { motion } from "framer-motion";
import { formatPercentage, formatCurrency, formatUSD } from "@/utils/formatters";

interface RetentionResultsProps {
  retentionRate: number;
  attainment: number;
  isError: boolean;
  maxQuarterlyChurn?: number;
  quarterlyChurnTarget?: number;
}

export const RetentionResults = ({
  retentionRate,
  attainment,
  isError,
  maxQuarterlyChurn = 0,
  quarterlyChurnTarget = 0
}: RetentionResultsProps) => {
  return <motion.div initial={{
    scale: 0.8,
    opacity: 0
  }} animate={{
    scale: 1,
    opacity: 1
  }} className="rounded-2xl bg-gradient-to-b from-[#9b87f5]/5 to-white p-8 shadow-sm border border-[#D6BCFA]">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <span className="text-sm font-medium text-[#7E69AB]">
            Retention Rate
          </span>
          <p className="text-5xl font-semibold tracking-tight text-[#8B5CF6]">
            {isError ? '—' : formatPercentage(retentionRate)}
          </p>
        </div>
        <div className="space-y-2">
          <span className="text-sm font-medium text-[#7E69AB]">
            Attainment
          </span>
          <p className="text-4xl font-semibold tracking-tight text-[#8B5CF6]">
            {isError ? '—' : formatPercentage(attainment)}
          </p>
        </div>
        
        <div className="mt-6 pt-6 border-t border-[#D6BCFA]">
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            <div className="space-y-1 text-center flex-1">
              <span className="text-sm font-medium text-[#7E69AB] block">Max Quarterly Churn Allowed</span>
              <p className="text-xl font-semibold text-[#1A1F2C]">
                {isError ? '—' : formatUSD(maxQuarterlyChurn)}
              </p>
            </div>
            <div className="space-y-1 text-center flex-1">
              <span className="text-sm font-medium text-[#7E69AB] block">Quarterly Churn Target</span>
              <p className="text-xl font-semibold text-[#1A1F2C]">
                {isError ? '—' : formatUSD(quarterlyChurnTarget)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>;
};
