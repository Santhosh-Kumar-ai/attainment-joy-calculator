
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatUSD, formatPercentage } from "@/utils/formatters";
import { CSMData } from "@/types/manager";

interface CSMTableProps {
  csms: CSMData[];
  isCalculated: boolean;
}

export const CSMTable = ({ csms, isCalculated }: CSMTableProps) => {
  // Check if any CSM has churn ARR data
  const hasChurnData = csms.some(csm => csm.churnARR !== undefined);
  // Check if any CSM has retention metrics calculated
  const hasRetentionMetrics = csms.some(csm => csm.retentionRate !== undefined);

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
              {hasChurnData && (
                <TableHead className="text-right">Churn ARR</TableHead>
              )}
              {isCalculated && (
                <>
                  <TableHead className="text-right font-bold bg-[#9b87f5]/5">Max Quarterly Churn</TableHead>
                  <TableHead className="text-right font-bold bg-[#9b87f5]/5">Quarterly Churn Target</TableHead>
                  {hasRetentionMetrics && (
                    <>
                      <TableHead className="text-right">Retention Rate</TableHead>
                      <TableHead className="text-right font-bold bg-[#9b87f5]/5">Attainment</TableHead>
                    </>
                  )}
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
                {hasChurnData && (
                  <TableCell className="text-right">{csm.churnARR !== undefined ? formatUSD(csm.churnARR) : "-"}</TableCell>
                )}
                {isCalculated && (
                  <>
                    <TableCell className="text-right font-medium bg-[#9b87f5]/5">{formatUSD(csm.maxQuarterlyChurnAllowed!)}</TableCell>
                    <TableCell className="text-right font-medium bg-[#9b87f5]/5">{formatUSD(csm.quarterlyChurnTarget!)}</TableCell>
                    {hasRetentionMetrics && (
                      <>
                        <TableCell className="text-right">
                          {csm.retentionRate !== undefined ? formatPercentage(csm.retentionRate) : "-"}
                        </TableCell>
                        <TableCell className="text-right font-medium bg-[#9b87f5]/5">
                          {csm.attainment !== undefined ? formatPercentage(csm.attainment) : "-"}
                        </TableCell>
                      </>
                    )}
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
