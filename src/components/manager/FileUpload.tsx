
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import * as XLSX from 'xlsx';
import { v4 as uuidv4 } from 'uuid';
import { CSMData } from "@/types/manager";
import { toast } from "sonner";

interface FileUploadProps {
  setCsms: React.Dispatch<React.SetStateAction<CSMData[]>>;
  setIsCalculated: React.Dispatch<React.SetStateAction<boolean>>;
  scrollToTable: () => void;
  setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FileUpload = ({ 
  setCsms, 
  setIsCalculated, 
  scrollToTable,
  setIsUploaded 
}: FileUploadProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  
  const resetFileInput = () => {
    setFileName(null);
    setCsms([]);
    setIsCalculated(false);
    setIsUploaded(false);
  };
  
  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast.error("Please upload an Excel file (.xlsx or .xls)");
      return;
    }
    
    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        if (jsonData.length === 0) {
          toast.error("The uploaded file does not contain any data");
          return;
        }
        
        const csmsData: CSMData[] = jsonData.map((row: any) => {
          // Check if required fields exist
          if (!row['Rep Name'] || !row['Book Start ARR'] || 
              !row['Min Retention Target'] || !row['Max Retention Target']) {
            throw new Error("Missing required fields in the uploaded file");
          }
          
          // Create CSM data object
          const csmData: CSMData = {
            id: uuidv4(),
            name: row['Rep Name'],
            bookStartARR: Number(row['Book Start ARR']),
            minRetentionTarget: Number(row['Min Retention Target']),
            maxRetentionTarget: Number(row['Max Retention Target'])
          };
          
          // Add Churn ARR if provided and not empty or zero
          if (row['Churn ARR'] !== undefined && row['Churn ARR'] !== '' && Number(row['Churn ARR']) > 0) {
            csmData.churnARR = Number(row['Churn ARR']);
          }
          
          return csmData;
        });
        
        setCsms(csmsData);
        setIsCalculated(false);
        setIsUploaded(true);
        
        // Use setTimeout to ensure the DOM has updated before scrolling
        setTimeout(() => {
          scrollToTable();
        }, 100);
        
        toast.success(`Uploaded ${csmsData.length} CSM records`);
      } catch (error) {
        console.error(error);
        toast.error(`Error processing file: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setFileName(null);
      }
    };
    
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="rounded-xl border bg-white/50 p-6 transition-all hover:shadow-md space-y-4">
      <div className="rounded-xl bg-[#9b87f5]/10 p-4 w-12 h-12 flex items-center justify-center">
        <Upload className="h-6 w-6 text-[#9b87f5]" />
      </div>
      <h3 className="text-xl font-medium text-[#1A1F2C]">Step 2: Upload Your Data</h3>
      <p className="text-[#6E768F]">
        Fill in the template with your CSM data and upload it here for processing.
      </p>
      
      {fileName ? (
        <div className="flex items-center justify-between border rounded-lg p-3">
          <div className="flex items-center">
            <div className="bg-[#9b87f5]/10 p-2 rounded">
              <span className="text-xs text-[#9b87f5] font-medium">XLSX</span>
            </div>
            <span className="text-sm text-[#1A1F2C] ml-3 truncate max-w-[150px]">
              {fileName}
            </span>
          </div>
          <Button variant="ghost" onClick={resetFileInput} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button 
          onClick={() => document.getElementById('file-upload')?.click()}
          className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5] text-white"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload File
          <input
            id="file-upload"
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
          />
        </Button>
      )}
    </div>
  );
};

