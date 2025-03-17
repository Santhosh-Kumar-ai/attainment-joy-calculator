
import { CSMData } from "@/types/manager";
import { DownloadTemplate } from "./DownloadTemplate";
import { FileUpload } from "./FileUpload";

interface FileOperationsProps {
  setCsms: React.Dispatch<React.SetStateAction<CSMData[]>>;
  setIsCalculated: React.Dispatch<React.SetStateAction<boolean>>;
  scrollToTable: () => void;
  csms: CSMData[];
  setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FileOperations = ({ 
  setCsms, 
  setIsCalculated, 
  scrollToTable,
  csms,
  setIsUploaded 
}: FileOperationsProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Download Template */}
      <DownloadTemplate />
      
      {/* Upload File */}
      <FileUpload 
        setCsms={setCsms}
        setIsCalculated={setIsCalculated}
        scrollToTable={scrollToTable}
        setIsUploaded={setIsUploaded}
      />
    </div>
  );
};
