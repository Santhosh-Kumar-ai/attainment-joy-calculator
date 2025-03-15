
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AttainmentForm from "@/components/Calculator/AttainmentForm";
import ResultCard from "@/components/Calculator/ResultCard";
import { motion } from "framer-motion";

interface CalculationResult {
  actual: number;
  target: number;
  percentage: number;
  remaining: number;
}

const Index = () => {
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = (data: CalculationResult) => {
    setResult(data);
  };

  return (
    <div className="min-h-screen w-full py-12 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/30">
      <div className="mx-auto max-w-3xl space-y-10">
        <header className="text-center space-y-2">
          <motion.h1 
            className="text-3xl md:text-4xl font-medium tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Attainment Calculator
          </motion.h1>
          <motion.p 
            className="text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            A simple tool to calculate and visualize your progress towards targets
          </motion.p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="glass-card border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-medium">Calculate Attainment</CardTitle>
            </CardHeader>
            <CardContent>
              <AttainmentForm onCalculate={handleCalculate} />
            </CardContent>
          </Card>
        </motion.div>

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ResultCard
              actual={result.actual}
              target={result.target}
              percentage={result.percentage}
              remaining={result.remaining}
              className="glass-card border-0"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
