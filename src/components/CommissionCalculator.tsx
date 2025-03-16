import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "./Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Printer } from "lucide-react";
import { handleNumberInput } from "@/utils/inputHandlers";
import { toast } from "sonner";

interface QuotaCredit {
  id: string;
  name: string;
  amount: number;
}

interface StoredCommissionData {
  quotaCredits: QuotaCredit[];
}

interface CommissionCalculatorProps {
  onCalculationComplete?: () => void;
}

const CommissionCalculator = ({ onCalculationComplete }: CommissionCalculatorProps = {}) => {
  const [quotaCredits, setQuotaCredits] = useState<QuotaCredit[]>(() => {
    const stored = localStorage.getItem('commissionCalculator');
    return stored ? (JSON.parse(stored) as StoredCommissionData).quotaCredits : [];
  });
  const [newCreditName, setNewCreditName] = useState("");
  const [newCreditAmount, setNewCreditAmount] = useState(0);

  const [retentionAttainment, setRetentionAttainment] = useState<number>(0);
  const [expansionAttainment, setExpansionAttainment] = useState<number>(0);
  const [variableComponent, setVariableComponent] = useState<number>(0);
  const [quotaMix, setQuotaMix] = useState<string>("");
  const [retentionPercent, setRetentionPercent] = useState<number>(0);
  const [expansionPercent, setExpansionPercent] = useState<number>(0);

  const [retentionCommission, setRetentionCommission] = useState<number>(0);
  const [expansionCommission, setExpansionCommission] = useState<number>(0);
  const [additionalCredits, setAdditionalCredits] = useState<number>(0);
  const [totalCommission, setTotalCommission] = useState<number>(0);

  const [ctc, setCtc] = useState<number>(0);
  const [bookARR, setBookARR] = useState<number>(0);
  const [churnARR, setChurnARR] = useState<number>(0);
  const [expansionARR, setExpansionARR] = useState<number>(0);
  const [targetARR, setTargetARR] = useState<number>(0);

  useEffect(() => {
    try {
      const loadRetentionData = () => {
        const stored = localStorage.getItem('retentionCalculator');
        if (stored) {
          try {
            const {
              minRetention,
              maxRetention,
              bookARR,
              churnARR
            } = JSON.parse(stored);

            setBookARR(bookARR);
            setChurnARR(churnARR);

            const retention = (bookARR - churnARR) / bookARR;
            const annualRetention = Math.pow(retention, 12);
            let calculatedAttainment = 0;
            if (annualRetention === 1) {
              calculatedAttainment = 1.5;
            } else if (annualRetention <= minRetention) {
              calculatedAttainment = 0;
            } else if (annualRetention <= maxRetention) {
              const ratio = (annualRetention - minRetention) / (maxRetention - minRetention);
              calculatedAttainment = ratio;
            } else if (annualRetention < 1) {
              const ratio = (annualRetention - maxRetention) / (1 - maxRetention);
              calculatedAttainment = 1 + ratio * 0.5;
            }
            setRetentionAttainment(calculatedAttainment);
          } catch (error) {
            console.error("Error parsing retention data:", error);
            setRetentionAttainment(0);
          }
        }
      };
      const loadExpansionData = () => {
        const stored = localStorage.getItem('expansionCalculator');
        if (stored) {
          try {
            const {
              expansionARR,
              targetARR
            } = JSON.parse(stored);

            setExpansionARR(expansionARR);
            setTargetARR(targetARR);

            const ratio = expansionARR / targetARR;
            let attainment = 0;
            if (ratio <= 1) {
              attainment = ratio;
            } else if (ratio <= 2) {
              const baseAmount = 1;
              const acceleratedAmount = (ratio - 1) * 1.5;
              attainment = baseAmount + acceleratedAmount;
            } else {
              const baseAmount = 1;
              const acceleratedAmount = 1 * 1.5;
              const remainingRatio = ratio - 2;
              attainment = baseAmount + acceleratedAmount + remainingRatio;
            }
            setExpansionAttainment(Math.min(attainment, 4));
          } catch (error) {
            console.error("Error parsing expansion data:", error);
            setExpansionAttainment(0);
          }
        }
      };
      const loadQuotaData = () => {
        const stored = localStorage.getItem('quotaCalculator');
        if (stored) {
          try {
            const parsedData = JSON.parse(stored);

            const ctc = parsedData?.ctc || 0;
            setCtc(ctc);
            const mixRatio = parsedData?.mixRatio || "75/25";
            const quotaMix = parsedData?.quotaMix || "70/30";

            let variablePercentage = 0.25;

            if (mixRatio && typeof mixRatio === 'string') {
              if (mixRatio.startsWith('custom_')) {
                const customVariable = parsedData?.customVariable || "25";
                variablePercentage = parseInt(customVariable) / 100;
              } else if (mixRatio.includes('/')) {
                const parts = mixRatio.split('/');
                if (parts.length > 1) {
                  variablePercentage = parseInt(parts[1]) / 100;
                }
              }
            }
            const variableComp = ctc * variablePercentage;
            const quarterlyVariable = variableComp / 4;
            setVariableComponent(quarterlyVariable);
            setQuotaMix(quotaMix);

            if (quotaMix && typeof quotaMix === 'string') {
              if (quotaMix.startsWith('custom_')) {
                const customRetention = parsedData?.customRetention || "70";
                const customExpansion = parsedData?.customExpansion || "30";
                setRetentionPercent(parseInt(customRetention) / 100);
                setExpansionPercent(parseInt(customExpansion) / 100);
              } else if (quotaMix.includes('/')) {
                const parts = quotaMix.split('/');
                if (parts.length > 1) {
                  setRetentionPercent(parseInt(parts[0]) / 100);
                  setExpansionPercent(parseInt(parts[1]) / 100);
                } else {
                  setRetentionPercent(0.7);
                  setExpansionPercent(0.3);
                }
              } else {
                setRetentionPercent(0.7);
                setExpansionPercent(0.3);
              }
            } else {
              setRetentionPercent(0.7);
              setExpansionPercent(0.3);
            }
          } catch (error) {
            console.error("Error parsing quota data:", error);
            setVariableComponent(75000);
            setQuotaMix("70/30");
            setRetentionPercent(0.7);
            setExpansionPercent(0.3);
          }
        } else {
          setVariableComponent(75000);
          setQuotaMix("70/30");
          setRetentionPercent(0.7);
          setExpansionPercent(0.3);
        }
      };
      loadRetentionData();
      loadExpansionData();
      loadQuotaData();
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }, []);

  useEffect(() => {
    const retCommission = variableComponent * retentionPercent * retentionAttainment;
    const expCommission = variableComponent * expansionPercent * expansionAttainment;
    const addCredits = quotaCredits.reduce((sum, credit) => sum + credit.amount, 0);
    const total = retCommission + expCommission + addCredits;
    setRetentionCommission(retCommission);
    setExpansionCommission(expCommission);
    setAdditionalCredits(addCredits);
    setTotalCommission(total);
    
    if (total > 0 && onCalculationComplete) {
      onCalculationComplete();
    }
  }, [retentionAttainment, expansionAttainment, variableComponent, retentionPercent, expansionPercent, quotaCredits, onCalculationComplete]);

  useEffect(() => {
    const dataToStore: StoredCommissionData = {
      quotaCredits
    };
    localStorage.setItem('commissionCalculator', JSON.stringify(dataToStore));
  }, [quotaCredits]);

  const handleAddCredit = () => {
    if (newCreditName.trim() === "" || newCreditAmount <= 0) {
      return;
    }
    if (quotaCredits.length >= 5) {
      return;
    }
    const newCredit: QuotaCredit = {
      id: Date.now().toString(),
      name: newCreditName,
      amount: newCreditAmount
    };
    setQuotaCredits([...quotaCredits, newCredit]);
    setNewCreditName("");
    setNewCreditAmount(0);
  };

  const handleRemoveCredit = (id: string) => {
    setQuotaCredits(quotaCredits.filter(credit => credit.id !== id));
  };

  const handleDeleteData = () => {
    localStorage.removeItem('retentionCalculator');
    localStorage.removeItem('expansionCalculator');
    localStorage.removeItem('quotaCalculator');
    localStorage.removeItem('commissionCalculator');
    toast.success("All data has been deleted", {
      description: "Your calculation data has been cleared from this device."
    });

    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  const handlePrintData = () => {
    const retention = (bookARR - churnARR) / bookARR;
    const annualRetention = Math.pow(retention, 12);
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Commission Calculation Summary</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #8B5CF6; text-align: center; margin-bottom: 30px; }
          h2 { color: #7E69AB; border-bottom: 1px solid #DDD; padding-bottom: 10px; margin-top: 30px; }
          .section { margin-bottom: 30px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          .data-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
          .label { font-weight: bold; color: #555; }
          .value { font-weight: bold; text-align: right; }
          .total { font-size: 24px; font-weight: bold; color: #8B5CF6; margin-top: 20px; text-align: right; }
          .border-top { border-top: 1px solid #DDD; padding-top: 20px; }
          .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #999; }
          .logo { text-align: center; margin-bottom: 20px; }
          .disclaimer { margin-top: 30px; padding: 10px; border: 1px solid #DDD; background-color: #f9f9f9; font-size: 12px; color: #666; text-align: center; }
        </style>
      </head>
      <body>
        <div class="logo">
          <img src="/logo.svg" alt="CommCal Logo" height="60" />
        </div>
        
        <h1>Commission Calculation Summary</h1>
        
        <div class="section">
          <h2>Input Parameters</h2>
          <div class="grid">
            <div>
              <div class="data-row">
                <span class="label">Total CTC:</span>
                <span class="value">₹${ctc.toLocaleString()}</span>
              </div>
              <div class="data-row">
                <span class="label">Book Start ARR:</span>
                <span class="value">₹${bookARR.toLocaleString()}</span>
              </div>
              <div class="data-row">
                <span class="label">Churn ARR:</span>
                <span class="value">₹${churnARR.toLocaleString()}</span>
              </div>
            </div>
            <div>
              <div class="data-row">
                <span class="label">Expansion Target ARR:</span>
                <span class="value">₹${targetARR.toLocaleString()}</span>
              </div>
              <div class="data-row">
                <span class="label">Actual Expansion ARR:</span>
                <span class="value">₹${expansionARR.toLocaleString()}</span>
              </div>
              <div class="data-row">
                <span class="label">Quarterly Variable Component:</span>
                <span class="value">₹${variableComponent.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="section">
          <h2>Retention Calculation</h2>
          <div class="data-row">
            <span class="label">Retention Rate:</span>
            <span class="value">${(annualRetention * 100).toFixed(2)}%</span>
          </div>
          <div class="data-row">
            <span class="label">Retention Attainment:</span>
            <span class="value">${(retentionAttainment * 100).toFixed(2)}%</span>
          </div>
          <div class="data-row">
            <span class="label">Quota Allocation:</span>
            <span class="value">${(retentionPercent * 100).toFixed(0)}%</span>
          </div>
          <div class="data-row">
            <span class="label">Commission from Retention:</span>
            <span class="value">₹${retentionCommission.toLocaleString(undefined, {
      maximumFractionDigits: 2
    })}</span>
          </div>
        </div>
        
        <div class="section">
          <h2>Expansion Calculation</h2>
          <div class="data-row">
            <span class="label">Expansion Ratio:</span>
            <span class="value">${(expansionARR / targetARR).toFixed(2)}</span>
          </div>
          <div class="data-row">
            <span class="label">Expansion Attainment:</span>
            <span class="value">${(expansionAttainment * 100).toFixed(2)}%</span>
          </div>
          <div class="data-row">
            <span class="label">Quota Allocation:</span>
            <span class="value">${(expansionPercent * 100).toFixed(0)}%</span>
          </div>
          <div class="data-row">
            <span class="label">Commission from Expansion:</span>
            <span class="value">₹${expansionCommission.toLocaleString(undefined, {
      maximumFractionDigits: 2
    })}</span>
          </div>
        </div>
        
        ${quotaCredits.length > 0 ? `
        <div class="section">
          <h2>Additional Quota Credits</h2>
          ${quotaCredits.map(credit => `
            <div class="data-row">
              <span class="label">${credit.name}:</span>
              <span class="value">₹${credit.amount.toLocaleString()}</span>
            </div>
          `).join('')}
          <div class="data-row">
            <span class="label">Total Additional Credits:</span>
            <span class="value">₹${additionalCredits.toLocaleString()}</span>
          </div>
        </div>
        ` : ''}
        
        <div class="section border-top">
          <div class="data-row">
            <span class="label">Total Quarterly Commission:</span>
            <span class="total">₹${Math.round(totalCommission).toLocaleString()}</span>
          </div>
        </div>
        
        <div class="disclaimer">
          All values and calculations are indicative and are to be revalidated with respective internal stakeholders for actuals
        </div>
        
        <div class="footer">
          <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([printContent], {
      type: 'text/html'
    });
    const url = URL.createObjectURL(blob);

    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';
    document.body.appendChild(printFrame);
    printFrame.onload = () => {
      const frameDoc = printFrame.contentDocument || printFrame.contentWindow?.document;
      if (frameDoc) {
        frameDoc.open();
        frameDoc.write(printContent);
        frameDoc.close();

        setTimeout(() => {
          printFrame.contentWindow?.print();

          setTimeout(() => {
            document.body.removeChild(printFrame);
            URL.revokeObjectURL(url);
          }, 1000);
        }, 500);
      }
    };
    printFrame.src = url;
    toast.success("Generating PDF", {
      description: "Your calculation summary is being prepared."
    });
  };

  return <div className="min-h-screen bg-gradient-to-b from-white to-[#9b87f5]/5">
      <Header />
      <div className="py-12">
        <TooltipProvider>
          <div className="max-w-2xl mx-auto p-8 space-y-12">
            <div className="flex justify-between items-center">
              <Link to="/quota-configuration" className="text-[#7E69AB] hover:text-[#6B4E9B] transition-colors">
                ← Back to Quota Configuration
              </Link>
              <span className="px-4 py-1 text-xs font-medium bg-[#9b87f5]/10 text-[#9b87f5] rounded-full">
                Commission Calculator
              </span>
            </div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="text-center space-y-2">
              <h1 className="text-4xl font-semibold tracking-tight text-[#1A1F2C]">
                Commission Calculator
              </h1>
              <p className="text-[#7E69AB] max-w-lg mx-auto">
                Calculate your quarterly commission based on attainment and quota mix.
              </p>
            </motion.div>

            <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.2
          }} className="space-y-8">
              <div className="rounded-xl border border-[#D6BCFA] bg-white p-6 space-y-6">
                <h2 className="text-lg font-medium text-[#1A1F2C]">Add Additional Quota Credits</h2>
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-4">
                    <label className="text-sm font-medium text-[#1A1F2C]">Credit Name</label>
                    <Input value={newCreditName} onChange={e => setNewCreditName(e.target.value)} placeholder="e.g., Bonus, Achievement Award" className="w-full mt-1" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-[#1A1F2C]">Amount (₹)</label>
                    <Input type="text" value={newCreditAmount === 0 ? "" : newCreditAmount.toLocaleString()} onChange={e => handleNumberInput(e.target.value, setNewCreditAmount, 1000000)} placeholder="Amount" className="w-full mt-1" />
                  </div>
                </div>
                <Button onClick={handleAddCredit} className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white" disabled={newCreditName.trim() === "" || newCreditAmount <= 0 || quotaCredits.length >= 5}>
                  <Plus className="w-4 h-4 mr-2" /> Add Credit ({quotaCredits.length}/5)
                </Button>
              </div>

              {quotaCredits.length > 0 && <div className="rounded-xl border border-[#D6BCFA] bg-white p-6 space-y-4">
                  <h2 className="text-lg font-medium text-[#1A1F2C]">Quota Credits</h2>
                  <div className="space-y-2">
                    {quotaCredits.map(credit => <div key={credit.id} className="flex items-center justify-between p-3 rounded-md bg-[#F9F7FF]">
                        <div>
                          <p className="font-medium text-[#1A1F2C]">{credit.name}</p>
                          <p className="text-sm text-[#7E69AB]">₹{credit.amount.toLocaleString()}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveCredit(credit.id)} className="text-[#EF4444] hover:text-[#DC2626] hover:bg-[#FEE2E2]">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>)}
                  </div>
                </div>}

              <motion.div initial={{
              scale: 0.8,
              opacity: 0
            }} animate={{
              scale: 1,
              opacity: 1
            }} className="rounded-2xl bg-gradient-to-b from-[#9b87f5]/5 to-white p-8 shadow-sm border border-[#D6BCFA]">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-[#7E69AB] text-center">Retention Attainment</h3>
                      <p className="text-lg font-semibold text-[#1A1F2C] text-center">{(retentionAttainment * 100).toFixed(2)}%</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-[#7E69AB] text-center">Expansion Attainment</h3>
                      <p className="text-lg font-semibold text-[#1A1F2C] text-center">{(expansionAttainment * 100).toFixed(2)}%</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-[#7E69AB] text-center">Quarterly Variable</h3>
                      <p className="text-lg font-semibold text-[#1A1F2C] text-center">₹{variableComponent.toLocaleString(undefined, {
                        maximumFractionDigits: 2
                      })}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-[#7E69AB] text-center">Quota Mix</h3>
                      <p className="text-lg font-semibold text-[#1A1F2C] text-center">
                        {(retentionPercent * 100).toFixed(0)}% / {(expansionPercent * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-[#D6BCFA]">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-[#7E69AB]">Commission from Retention</h3>
                        <p className="text-lg font-semibold text-[#1A1F2C]">₹{retentionCommission.toLocaleString(undefined, {
                          maximumFractionDigits: 2
                        })}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-[#7E69AB]">Commission from Expansion</h3>
                        <p className="text-lg font-semibold text-[#1A1F2C]">₹{expansionCommission.toLocaleString(undefined, {
                          maximumFractionDigits: 2
                        })}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-[#7E69AB]">Additional Credits</h3>
                        <p className="text-lg font-semibold text-[#1A1F2C]">₹{additionalCredits.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-[#D6BCFA]">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-bold text-[#1A1F2C]">Total Quarterly Commission</h3>
                      <p className="text-2xl font-bold text-[#8B5CF6]">₹{Math.round(totalCommission).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <Button onClick={handlePrintData} variant="outline" className="text-[#8B5CF6] border-[#D6BCFA] hover:bg-[#F9F7FF] hover:text-[#7C3AED]">
                  <Printer className="w-4 h-4 mr-2" /> Print Summary
                </Button>
                <Button onClick={handleDeleteData} variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" /> Delete All Data
                </Button>
              </div>
              
              <div className="mt-4 p-3 border border-[#D6BCFA] bg-[#F9F7FF] rounded-md text-center">
                <p className="text-sm text-[#7E69AB]">
                  All calculations are indicative and needs to be verified with relevant financial stakeholders for actuals.
                </p>
              </div>
              
              
            </motion.div>
          </div>
        </TooltipProvider>
      </div>
    </div>;
};

export default CommissionCalculator;
