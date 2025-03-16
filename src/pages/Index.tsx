import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, Calculator, ChartBarIcon, DollarSign, PieChart, RefreshCw } from "lucide-react";
import { Header } from "@/components/Header";
const features = [{
  title: "Retention Calculation",
  description: "Calculate your retention targets, rates, and attainment based on Book Start ARR and Churn ARR",
  icon: Calculator
}, {
  title: "Expansion Metrics",
  description: "Calculate expansion attainment with accelerator logic for maximum performance",
  icon: ChartBarIcon
}, {
  title: "Quota Configuration",
  description: "Configure quota logic based on role and compensation structure",
  icon: PieChart
}, {
  title: "Commission Tracking",
  description: "Calculate your quarterly commission based on attainment and additional quota credits",
  icon: DollarSign
}];

// Mock data for carousel
const carouselItems = [{
  title: "Retention Calculator",
  description: "Input your Book Start ARR and Churn ARR to calculate retention targets",
  image: "/retention-calculator.png" // This will use a placeholder for now
}, {
  title: "Expansion Calculator",
  description: "Track your expansion metrics with our powerful calculation tools",
  image: "/expansion-calculator.png" // This will use a placeholder for now
}, {
  title: "Quota Calculator",
  description: "Configure quota logic based on your role and compensation",
  image: "/quota-calculator.png" // This will use a placeholder for now
}, {
  title: "Commission Calculator",
  description: "See your total commission based on attainment and quota credits",
  image: "/commission-calculator.png" // This will use a placeholder for now
}];
const Index = () => {
  return <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white -z-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-50 -z-10"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-50 -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="text-center space-y-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} className="inline-block">
              <span className="px-4 py-1.5 text-xs font-medium bg-[#9b87f5]/10 text-[#9b87f5] rounded-full">
                FREE COMMISSION CALCULATOR
              </span>
            </motion.div>
            
            <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.1
          }} className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight max-w-4xl mx-auto">
              Calculate Your Commissions <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5]">In Minutes</span>
            </motion.h1>
            
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }} className="text-xl text-gray-600 max-w-2xl mx-auto">
              Commcal helps you calculate quarterly commissions for your portfolio through our guided 4-step process. No more guesswork.
            </motion.p>
            
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.3
          }} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/retention-calculator" className="bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5] text-white px-8 py-3 rounded-lg text-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all w-full sm:w-auto flex items-center justify-center">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/how-it-works" className="text-gray-700 bg-white border border-gray-200 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto flex items-center justify-center">
                How It Works
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Floating calculator illustration */}
        <motion.div initial={{
        opacity: 0,
        y: 50
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.5
      }} className="max-w-5xl mx-auto px-4 -mt-8 md:-mt-16 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="aspect-[16/9] bg-gradient-to-b from-gray-50 to-white p-6 md:p-8 flex items-center justify-center">
              <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[#9b87f5]/10 flex items-center justify-center text-[#9b87f5]">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Retention Analysis</h3>
                      <p className="text-sm text-gray-500">Q2 2023</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Book Start ARR</p>
                      <p className="text-lg font-bold text-gray-900">$4,250,000</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Churn ARR</p>
                      <p className="text-lg font-bold text-gray-900">$212,500</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg col-span-2 md:col-span-1">
                      <p className="text-xs text-purple-700 mb-1">Retention Rate</p>
                      <p className="text-lg font-bold text-purple-700">95%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Calculate your commissions in four simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} viewport={{
            once: true
          }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-50 to-white -z-0 rounded-bl-full"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-[#9b87f5]/10 flex items-center justify-center text-[#9b87f5] mb-4">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 font-normal">{feature.description}</p>
                  <div className="mt-4 flex items-center text-[#8B5CF6] font-medium">
                    <span className="text-sm">Step {index + 1}</span>
                    
                  </div>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>
      
      {/* Product Screenshots Carousel */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">See Commcal in Action</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Our intuitive interface makes complex calculations simple
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-6 md:p-8">
              <div className="relative">
                {/* Carousel items - placeholder for now */}
                <div className="aspect-[16/9] bg-gradient-to-b from-gray-50 to-white rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-[#9b87f5]/10 flex items-center justify-center text-[#9b87f5]">
                              <RefreshCw className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">Quarterly Calculation</h3>
                              <p className="text-sm text-gray-500">Last updated: May 15, 2023</p>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 rounded-full bg-[#9b87f5]"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Book Start ARR</p>
                            <p className="text-lg font-bold text-gray-900">$4,250,000</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Churn ARR</p>
                            <p className="text-lg font-bold text-gray-900">$212,500</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Retention Target</p>
                            <p className="text-lg font-bold text-gray-900">90%</p>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <p className="text-xs text-purple-700 mb-1">Actual Retention</p>
                            <p className="text-lg font-bold text-purple-700">95%</p>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-6 rounded-xl">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium text-gray-900">Retention Attainment</h4>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">105% of Target</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{
                            width: '95%'
                          }}></div>
                          </div>
                          <div className="flex justify-between mt-2 text-xs text-gray-500">
                            <span>0%</span>
                            <span>Target: 90%</span>
                            <span>100%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#9b87f5]/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Start Calculating Your Commissions Today
            </h2>
            <p className="text-xl text-gray-600">
              Our free calculator helps you understand your commission structure and maximize your earnings potential.
            </p>
            <div className="pt-4">
              <Link to="/retention-calculator" className="inline-flex items-center justify-center px-8 py-3 rounded-lg text-lg font-medium text-white bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5] shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5] p-2 rounded-lg">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5]">
                Commcal
              </span>
            </div>
            
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-500 hover:text-[#8B5CF6] text-sm">
                Privacy Policy
              </Link>
              <Link to="/faq" className="text-gray-500 hover:text-[#8B5CF6] text-sm">
                FAQ
              </Link>
              <Link to="/how-it-works" className="text-gray-500 hover:text-[#8B5CF6] text-sm">
                How It Works
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-100 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Commcal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;