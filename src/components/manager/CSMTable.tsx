
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatUSD, formatPercentage } from "@/utils/formatters";
import { CSMData } from "@/types/manager";

interface CSMTableProps {
  csms: CSMData[];
  isCalculated: boolean;
}

export const CSMTable = ({ csms, isCalculated }: CSMTableProps) => {
  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#9b87f5]/5">
            <TableRow>
              <TableHead>Rep Name</TableHead>
              <TableHead className="text-right">Book Start ARR</TableHead>
              <TableHead className="text-right">Min Retention</TableHead>
              <TableHead className="text-right">Max Retention</TableHead>
              {isCalculated && (
                <>
                  <TableHead className="text-right">Max Quarterly Churn</TableHead>
                  <TableHead className="text-right">Quarterly Churn Target</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {csms.map((csm) => (
              <TableRow key={csm.id}>
                <TableCell className="font-medium">{csm.name}</TableCell>
                <TableCell className="text-right">{formatUSD(csm.bookStartARR)}</TableCell>
                <TableCell className="text-right">{formatPercentage(csm.minRetentionTarget)}</TableCell>
                <TableCell className="text-right">{formatPercentage(csm.maxRetentionTarget)}</TableCell>
                {isCalculated && (
                  <>
                    <TableCell className="text-right">{formatUSD(csm.maxQuarterlyChurnAllowed!)}</TableCell>
                    <TableCell className="text-right">{formatUSD(csm.quarterlyChurnTarget!)}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
