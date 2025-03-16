
import { Button } from "@/components/ui/button";
import { Printer, FileSpreadsheet, Calculator, Info } from "lucide-react";
import { CSMData } from "@/types/manager";
import { toast } from "sonner";
import * as XLSX from 'xlsx';
import { formatUSD } from "@/utils/formatters";

interface CalculationControlsProps {
  csms: CSMData[];
  isCalculated: boolean;
  setIsCalculated: React.Dispatch<React.SetStateAction<boolean>>;
  setCsms: React.Dispatch<React.SetStateAction<CSMData[]>>;
}

export const CalculationControls = ({ 
  csms, 
  isCalculated, 
  setIsCalculated, 
  setCsms 
}: CalculationControlsProps) => {
  const calculateAllMetrics = () => {
    const calculatedCsms = csms.map(csm => {
      // Calculate maximum quarterly churn allowed for minimum retention target
      const maxAllowedChurn = csm.bookStartARR * (1 - Math.pow(csm.minRetentionTarget, 1 / 12));
      
      // Calculate quarterly churn target for maximum retention target
      const churnTarget = csm.bookStartARR * (1 - Math.pow(csm.maxRetentionTarget, 1 / 12));
      
      return {
        ...csm,
        maxQuarterlyChurnAllowed: maxAllowedChurn,
        quarterlyChurnTarget: churnTarget
      };
    });
    
    setCsms(calculatedCsms);
    setIsCalculated(true);
    toast.success("Calculations completed for all CSMs");
  };

  const handlePrintResults = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>CSM Retention Metrics</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 1200px; margin: 0 auto; padding: 20px; }
          h1 { color: #8B5CF6; text-align: center; margin-bottom: 30px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th { background-color: #f2eeff; text-align: left; padding: 10px; border-bottom: 2px solid #9b87f5; }
          td { padding: 10px; border-bottom: 1px solid #ddd; }
          .footer { margin-top: 50px; font-size: 12px; color: #999; text-align: center; }
          .disclaimer { margin-top: 30px; padding: 10px; border: 1px solid #DDD; background-color: #f9f9f9; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <h1>CSM Retention Metrics</h1>
        
        <table>
          <thead>
            <tr>
              <th>Rep Name</th>
              <th>Book Start ARR</th>
              <th>Min Retention</th>
              <th>Max Retention</th>
              <th>Max Quarterly Churn</th>
              <th>Quarterly Churn Target</th>
            </tr>
          </thead>
          <tbody>
            ${csms.map(csm => `
              <tr>
                <td>${csm.name}</td>
                <td>${formatUSD(csm.bookStartARR)}</td>
                <td>${formatUSD(csm.minRetentionTarget)}</td>
                <td>${formatUSD(csm.maxRetentionTarget)}</td>
                <td>${formatUSD(csm.maxQuarterlyChurnAllowed || 0)}</td>
                <td>${formatUSD(csm.quarterlyChurnTarget || 0)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="disclaimer">
          <p><strong>Understanding These Metrics:</strong></p>
          <p><strong>Max Quarterly Churn:</strong> The maximum amount of ARR that can churn in a quarter while still achieving the minimum retention target.</p>
          <p><strong>Quarterly Churn Target:</strong> The target amount of ARR that should churn in a quarter to achieve the maximum retention target.</p>
        </div>
        
        <div class="footer">
          <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>
      </body>
      </html>
    `;

    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';
    document.body.appendChild(printFrame);
    
    const frameDoc = printFrame.contentDocument || printFrame.contentWindow?.document;
    if (frameDoc) {
      frameDoc.open();
      frameDoc.write(printContent);
      frameDoc.close();
      
      setTimeout(() => {
        printFrame.contentWindow?.print();
        document.body.removeChild(printFrame);
      }, 500);
    }
    
    toast.success("Preparing print view");
  };
  
  const handleExportToExcel = () => {
    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(
      csms.map(csm => ({
        'Rep Name': csm.name,
        'Book Start ARR': csm.bookStartARR,
        'Min Retention Target': csm.minRetentionTarget,
        'Max Retention Target': csm.maxRetentionTarget,
        'Max Quarterly Churn Allowed': csm.maxQuarterlyChurnAllowed,
        'Quarterly Churn Target': csm.quarterlyChurnTarget
      }))
    );
    
    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "CSM Metrics");
    
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, "csm_retention_metrics.xlsx");
    
    toast.success("Exporting data to Excel");
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <span className="w-6 h-6 text-[#9b87f5]" />  
          CSM Data ({csms.length})
        </h2>
        <Button 
          onClick={calculateAllMetrics} 
          className="bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5] text-white"
          disabled={isCalculated}
        >
          <Calculator className="mr-2 h-4 w-4" />
          {isCalculated ? "Calculations Complete" : "Calculate Metrics"}
        </Button>
      </div>

      {isCalculated && (
        <>
          <div className="flex gap-4 items-center">
            <Button onClick={handlePrintResults} className="flex items-center gap-2 bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5]">
              <Printer className="h-4 w-4" />
              Print to PDF
            </Button>
            <Button onClick={handleExportToExcel} className="flex items-center gap-2 bg-white text-[#8B5CF6] border border-[#D6BCFA] hover:bg-[#F9F7FF]">
              <FileSpreadsheet className="h-4 w-4" />
              Export to Excel
            </Button>
          </div>
          
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-amber-700">
              Refreshing the page will erase all data.
            </p>
          </div>
        </>
      )}
    </>
  );
};
