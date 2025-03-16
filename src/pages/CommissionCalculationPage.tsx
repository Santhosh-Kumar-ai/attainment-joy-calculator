
import React from "react";
import { Header } from "@/components/Header";
import { CommissionCalculatorWrapper } from "@/components/CommissionCalculatorWrapper";

const CommissionCalculationPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Commissions Calculator</h1>
          <p className="mt-4 text-lg text-gray-600">
            Calculate your quarterly commission based on attainment and additional quota credits
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <CommissionCalculatorWrapper />
        </div>
      </div>
    </div>
  );
};

export default CommissionCalculationPage;
