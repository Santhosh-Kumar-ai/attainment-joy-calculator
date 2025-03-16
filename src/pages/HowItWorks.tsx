import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Link } from "react-router-dom";
import { Calculator, ChevronRight, ArrowRight } from "lucide-react";

const steps = [{
  number: 1,
  title: "Retention Rate Calculation",
  description: "Start by entering your Book Start ARR and Churn ARR. Our calculator will automatically determine your retention rate, maximum allowable churn, and attainment against targets.",
  image: "/step1.png" // This will be a placeholder for now
}, {
  number: 2,
  title: "Expansion Calculation",
  description: "Next, enter your expansion metrics. The calculator applies accelerator logic to determine your expansion attainment percentage based on your targets.",
  image: "/step2.png" // This will be a placeholder for now
}, {
  number: 3,
  title: "Quota Configuration",
  description: "Configure your quota logic based on your role. Select your quota mix ratios to accurately reflect your compensation structure.",
  image: "/step3.png" // This will be a placeholder for now
}, {
  number: 4,
  title: "Commission Calculation",
  description: "Finally, see your total quarterly commission calculation based on your attainment percentages and any additional quota credits you've earned.",
  image: "/step4.png" // This will be a placeholder for now
}];

const HowItWorks = () => {
  return <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white -z-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} className="text-4xl md:text-5xl font-bold text-gray-900">
              How CommCal <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5]">Works</span>
            </motion.h1>
            
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.1
          }} className="text-xl text-gray-600">
              Follow our simple 4-step process to calculate your commissions quickly and accurately.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {steps.map((step, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} viewport={{
            once: true
          }} className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={`space-y-6 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="inline-flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-[#9b87f5] flex items-center justify-center text-white font-semibold text-lg">
                      {step.number}
                    </div>
                    <div className="h-0.5 w-12 bg-gradient-to-r from-[#9b87f5] to-transparent"></div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900">{step.title}</h2>
                  <p className="text-lg text-gray-600">{step.description}</p>
                  
                  <div className="pt-4">
                    <Link to={step.number === 1 ? "/retention-calculator" : 
                             step.number === 2 ? "/expansion-calculator" : 
                             step.number === 3 ? "/quota-configuration" : 
                             "/commission-calculator"} 
                         className="inline-flex items-center text-[#8B5CF6] font-medium hover:text-[#7C3AED] transition-colors">
                      Try {step.title} <ChevronRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
                
                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transform hover:scale-105 transition-transform duration-300">
                    <div className="aspect-[4/3] bg-gradient-to-b from-gray-50 to-white p-6 flex items-center justify-center">
                      {/* Step 1 Mock */}
                      {step.number === 1 && <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                          <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 rounded-full bg-[#9b87f5]/10 flex items-center justify-center text-[#9b87f5]">
                                <Calculator className="w-5 h-5" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">Retention Calculation</h3>
                                <p className="text-sm text-gray-500">Step 1 of 4</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Book Start ARR</label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">$</span>
                                  </div>
                                  <input type="text" className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md" placeholder="0.00" value="4,250,000" />
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Churn ARR</label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">$</span>
                                  </div>
                                  <input type="text" className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md" placeholder="0.00" value="212,500" />
                                </div>
                              </div>
                              
                              <div className="pt-2">
                                <div className="px-4 py-3 bg-purple-50 rounded-lg text-center">
                                  <p className="text-sm text-purple-700 font-medium">Retention Rate</p>
                                  <p className="text-2xl font-bold text-purple-700">95.0%</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>}
                      
                      {/* Step 2 Mock */}
                      {step.number === 2 && <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                          <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 rounded-full bg-[#9b87f5]/10 flex items-center justify-center text-[#9b87f5]">
                                <Calculator className="w-5 h-5" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">Expansion Calculation</h3>
                                <p className="text-sm text-gray-500">Step 2 of 4</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Expansion Target</label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">$</span>
                                  </div>
                                  <input type="text" className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md" placeholder="0.00" value="350,000" />
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Actual Expansion</label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">$</span>
                                  </div>
                                  <input type="text" className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md" placeholder="0.00" value="402,500" />
                                </div>
                              </div>
                              
                              <div className="pt-2">
                                <div className="px-4 py-3 bg-purple-50 rounded-lg text-center">
                                  <p className="text-sm text-purple-700 font-medium">Expansion Attainment</p>
                                  <p className="text-2xl font-bold text-purple-700">115.0%</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>}
                      
                      {/* Step 3 Mock */}
                      {step.number === 3 && <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                          <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 rounded-full bg-[#9b87f5]/10 flex items-center justify-center text-[#9b87f5]">
                                <Calculator className="w-5 h-5" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">Quota Configuration</h3>
                                <p className="text-sm text-gray-500">Step 3 of 4</p>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Role</label>
                                <select className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                  <option>CSM</option>
                                  <option disabled>AM [Coming Soon!]</option>
                                </select>
                              </div>
                              
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Variable Compensation</label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">₹</span>
                                  </div>
                                  <input type="text" className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md" placeholder="0.00" value="45,000" />
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="px-4 py-3 bg-purple-50 rounded-lg text-center">
                                  <p className="text-sm text-purple-700 font-medium">Retention</p>
                                  <p className="text-xl font-bold text-purple-700">70%</p>
                                </div>
                                <div className="px-4 py-3 bg-purple-50 rounded-lg text-center">
                                  <p className="text-sm text-purple-700 font-medium">Expansion</p>
                                  <p className="text-xl font-bold text-purple-700">30%</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>}
                      
                      {/* Step 4 Mock */}
                      {step.number === 4 && <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                          <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 rounded-full bg-[#9b87f5]/10 flex items-center justify-center text-[#9b87f5]">
                                <Calculator className="w-5 h-5" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">Commission Calculation</h3>
                                <p className="text-sm text-gray-500">Step 4 of 4</p>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <p className="text-xs text-gray-500 mb-1">Retention Attainment</p>
                                  <p className="text-lg font-bold text-gray-900">105%</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <p className="text-xs text-gray-500 mb-1">Expansion Attainment</p>
                                  <p className="text-lg font-bold text-gray-900">115%</p>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Additional Quota Credits</label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">₹</span>
                                  </div>
                                  <input type="text" className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md" placeholder="0.00" value="0" />
                                </div>
                              </div>
                              
                              <div className="pt-2">
                                <div className="px-4 py-3 bg-purple-50 rounded-lg text-center">
                                  <p className="text-sm text-purple-700 font-medium">Quarterly Commission</p>
                                  <p className="text-2xl font-bold text-purple-700">₹12,487</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>}
                    </div>
                  </div>
                </div>
              </motion.div>)}
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
                CommCal
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
            &copy; {new Date().getFullYear()} CommCal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>;
};
export default HowItWorks;
