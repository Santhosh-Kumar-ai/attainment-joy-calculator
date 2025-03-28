
import { motion } from "framer-motion";
interface VariableBreakdownProps {
  variableComponent: number;
  variablePercentage: number;
  retentionPercent: number;
  expansionPercent: number;
}
export const VariableBreakdown = ({
  variableComponent,
  variablePercentage,
  retentionPercent,
  expansionPercent
}: VariableBreakdownProps) => {
  // Use raw values for calculations without rounding
  const quarterlyVariable = variableComponent / 4;
  const quarterlyRetention = quarterlyVariable * retentionPercent;
  const quarterlyExpansion = quarterlyVariable * expansionPercent;
  
  // Format displayed values for UI
  const formatNumber = (num: number) => Math.round(num).toLocaleString();
  
  return <motion.div initial={{
    scale: 0.95,
    opacity: 0
  }} animate={{
    scale: 1,
    opacity: 1
  }} className="mt-8 rounded-2xl bg-gradient-to-b from-[#9b87f5]/5 to-white p-8 shadow-sm border border-[#D6BCFA]">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2 text-center">
            <h3 className="text-sm font-medium text-[#7E69AB]">Variable Component</h3>
            <p className="text-lg font-semibold text-[#1A1F2C]">
              ₹{formatNumber(variableComponent)}
            </p>
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-sm font-medium text-[#7E69AB] text-center">Variable Percentage</h3>
            <p className="text-lg font-semibold text-[#1A1F2C] text-center">
              {variablePercentage.toFixed(1)}%
            </p>
          </div>
        </div>
        
        <div className="pt-4 border-t border-[#D6BCFA]">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-[#7E69AB] w-1/2">Quarterly Variable</h3>
              <p className="text-lg font-semibold text-[#1A1F2C] w-1/2 text-right">₹{formatNumber(quarterlyVariable)}</p>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-[#7E69AB] w-1/2">Quarterly Retention ({(retentionPercent * 100).toFixed(1)}%)</h3>
              <p className="text-lg font-semibold text-[#1A1F2C] w-1/2 text-right">₹{formatNumber(quarterlyRetention)}</p>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-[#7E69AB] w-1/2">Quarterly Expansion ({(expansionPercent * 100).toFixed(1)}%)</h3>
              <p className="text-lg font-semibold text-[#1A1F2C] w-1/2 text-right">₹{formatNumber(quarterlyExpansion)}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>;
};
