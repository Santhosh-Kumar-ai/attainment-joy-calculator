
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Upload, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import { CSMData } from "@/types/manager";
import { motion } from "framer-motion";
import { useRef } from "react";

interface FileOperationsProps {
  setCsms: React.Dispatch<React.SetStateAction<CSMData[]>>;
  setIsCalculated: React.Dispatch<React.SetStateAction<boolean>>;
  scrollToTable: () => void;
}

export const FileOperations = ({ setCsms, setIsCalculated, scrollToTable }: FileOperationsProps) => {
  const handleFileDownload = () => {
    // Create CSV template
    const csvContent = "Rep Name,Book Start ARR,Minimum Retention Target,Maximum Retention Target\nJohn Doe,500000,0.75,0.85\nJane Smith,750000,0.80,0.90";
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'csm_retention_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Template downloaded successfully");
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        
        // Skip header line
        const dataLines = lines.slice(1);
        
        const parsedData: CSMData[] = dataLines
          .filter(line => line.trim() !== '')
          .map((line, index) => {
            const [name, bookStartARR, minRetentionTarget, maxRetentionTarget] = line.split(',');
            
            // Validate data
            if (!name || !bookStartARR || !minRetentionTarget || !maxRetentionTarget) {
              throw new Error(`Row ${index + 2} has missing data`);
            }
            
            const bookARR = parseFloat(bookStartARR);
            const minRetention = parseFloat(minRetentionTarget);
            const maxRetention = parseFloat(maxRetentionTarget);
            
            if (isNaN(bookARR) || isNaN(minRetention) || isNaN(maxRetention)) {
              throw new Error(`Row ${index + 2} has invalid numeric data`);
            }
            
            if (minRetention >= maxRetention) {
              throw new Error(`Row ${index + 2}: Min retention must be less than max retention`);
            }
            
            return {
              id: `csm-${index}`,
              name: name.trim(),
              bookStartARR: bookARR,
              minRetentionTarget: minRetention,
              maxRetentionTarget: maxRetention
            };
          });
        
        setCsms(parsedData);
        setIsCalculated(false);
        toast.success(`Uploaded data for ${parsedData.length} CSMs`);
        
        // Scroll to the table section after successful upload
        setTimeout(() => {
          scrollToTable();
        }, 100);
        
        // Reset the input
        event.target.value = '';
      } catch (error) {
        toast.error(`Error parsing file: ${error instanceof Error ? error.message : 'Unknown error'}`);
        // Reset the input
        event.target.value = '';
      }
    };
    
    reader.readAsText(file);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#9b87f5]/10 flex items-center justify-center text-[#9b87f5]">
            <Download className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Step 1: Download Template</h2>
          <p className="text-gray-600">Download our CSV template to input your CSMs' Name, Book Start ARR, and Retention Targets. </p>
          <Button onClick={handleFileDownload} className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5]">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Download CSV Template
          </Button>
        </div>
      </Card>
      
      <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#9b87f5]/10 flex items-center justify-center text-[#9b87f5]">
            <Upload className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Step 2: Upload Your Data</h2>
          <p className="text-gray-600">Fill in the template with your CSMs' information and upload it here. Make sure all fields are correctly filled.</p>
          <div className="relative">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <Button className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5]">
              <Upload className="mr-2 h-4 w-4" />
              Upload CSV File
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
