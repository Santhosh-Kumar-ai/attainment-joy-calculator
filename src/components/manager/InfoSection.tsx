
import { Info } from "lucide-react";
import { Link } from "react-router-dom";

export const InfoSection = () => {
  return (
    <>
      <div className="rounded-lg bg-[#9b87f5]/10 p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-[#8B5CF6] mt-0.5 flex-shrink-0" />
        <div className="text-sm text-[#7E69AB]">
          <p className="font-medium text-[#6B4E9B]">Understanding These Metrics:</p>
          <p><strong>Max Quarterly Churn:</strong> The maximum amount of ARR that can churn in a quarter before attainment drops to 0%.</p>
          <p><strong>Quarterly Churn Target:</strong> The target amount of ARR that can churn in a quarter to achieve 100% attainment.</p>
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <Link 
          to="/retention-calculator" 
          className="text-[#7E69AB] hover:text-[#6B4E9B] transition-colors"
        >
          Go to Individual Retention Calculator
        </Link>
      </div>
    </>
  );
};
