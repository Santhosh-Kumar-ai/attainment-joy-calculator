
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import * as XLSX from 'xlsx';
import { toast } from "sonner";

export const DownloadTemplate = () => {
  const handleDownloadTemplate = () => {
    const template = [
      {
        'Rep Name': 'John Doe',
        'Book Start ARR': 500000,
        'Min Retention Target': 0.75,
        'Max Retention Target': 0.85,
        'Churn ARR': 25000 // Optional field
      },
      {
        'Rep Name': 'Jane Smith',
        'Book Start ARR': 750000,
        'Min Retention Target': 0.8,
        'Max Retention Target': 0.9,
        'Churn ARR': 30000 // Optional field
      }
    ];
    
    const worksheet = XLSX.utils.json_to_sheet(template);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "CSM Template");
    
    // Add notes to the worksheet
    worksheet['!cols'] = [
      { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }
    ];

    XLSX.writeFile(workbook, "csm_template.xlsx");
    
    toast.success("Template downloaded successfully");
  };

  return (
    <div className="rounded-xl border bg-white/50 p-6 transition-all hover:shadow-md space-y-4">
      <div className="rounded-xl bg-[#9b87f5]/10 p-4 w-12 h-12 flex items-center justify-center">
        <Download className="h-6 w-6 text-[#9b87f5]" />
      </div>
      <h3 className="text-xl font-medium text-[#1A1F2C]">
        Step 1: Download Template
      </h3>
      <p className="text-[#6E768F]">
        Download our Excel template containing sample data and required columns.
      </p>
      <Button 
        onClick={handleDownloadTemplate}
        className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5] text-white"
      >
        <Download className="mr-2 h-4 w-4" />
        Download Template
      </Button>
    </div>
  );
};
