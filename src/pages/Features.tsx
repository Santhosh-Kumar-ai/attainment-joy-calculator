import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Link } from "react-router-dom";
import { Calculator, ChartBarIcon, PieChart, DollarSign, Percent, Target, Award, ChevronRight, RefreshCw, BarChart3, UserRound, Check } from "lucide-react";

const Features = () => {
  const featuresList = [{
    title: "Retention Rate Calculator",
    description: "Accurately calculate your retention targets and actual retention performance based on Book Start ARR and Churn ARR.",
    icon: Calculator,
    details: ["Input your Book Start ARR and Churn ARR", "Calculate max quarterly churn allowed", "Track retention targets and actual performance", "Visualize retention rate performance"]
  }, {
    title: "Expansion Calculation",
    description: "Calculate your expansion attainment with accelerator logic to maximize your commissions.",
    icon: ChartBarIcon,
    details: ["Input expansion ARR", "Calculate expansion attainment", "Apply accelerator rules automatically", "Track performance against expansion targets"]
  }, {
    title: "Quota Configuration",
    description: "Configure quota logic based on your specific role and compensation structure.",
    icon: PieChart,
    details: ["Select your specific role", "Configure quota mix ratios", "Visualize variable compensation breakdown", "Adjust to different compensation structures"]
  }, {
    title: "Commission Calculator",
    description: "Calculate your quarterly commission based on attainment and any additional quota credits.",
    icon: DollarSign,
    details: ["See quarterly commission breakdowns", "Calculate based on attainment percentages", "Include additional quota credits", "Generate detailed commission reports"]
  }, {
    title: "Manager Mode (Beta)",
    description: "Upload and analyze retention metrics for multiple CSMs at once with our bulk calculation tool.",
    icon: UserRound,
    details: ["Download CSV template", "Upload CSM data in bulk", "Calculate metrics for all CSMs at once", "Compare performance across your team"]
  }];
  
  const additionalFeatures = [{
    title: "Retention Tracking",
    description: "Track your retention performance over time and identify trends.",
    icon: RefreshCw
  }, {
    title: "Performance Analytics",
    description: "Visualize your performance metrics with intuitive charts and graphs.",
    icon: BarChart3
  }, {
    title: "Target Achievement",
    description: "Set and track progress towards your commission targets.",
    icon: Target
  }, {
    title: "Attainment Percentage",
    description: "Calculate attainment percentages based on your quota achievement.",
    icon: Percent
  }, {
    title: "Performance Recognition",
    description: "Visualize your performance standing and recognition levels.",
    icon: Award
  }];
  
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
              Powerful Features for <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5]">Commission Calculation</span>
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
              Commcal provides a comprehensive suite of tools to help you calculate, track, and optimize your commission earnings.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Main Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16">
            {featuresList.map((feature, index) => <motion.div key={index} initial={{
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
                  <div className="w-14 h-14 rounded-xl bg-[#9b87f5]/10 flex items-center justify-center text-[#9b87f5]">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900">{feature.title}</h2>
                  <p className="text-lg text-gray-600">{feature.description}</p>
                  
                  <ul className="space-y-3">
                    {feature.details.map((detail, detailIndex) => <li key={detailIndex} className="flex items-start">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </span>
                        <span className="text-gray-700">{detail}</span>
                      </li>)}
                  </ul>
                  
                  {index === 0 && <div className="pt-4">
                      <Link to="/retention-calculator" className="inline-flex items-center text-[#8B5CF6] font-medium hover:text-[#7C3AED] transition-colors">
                        Try this feature <ChevronRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>}
                  {index === 1 && <div className="pt-4">
                      <Link to="/expansion-calculator" className="inline-flex items-center text-[#8B5CF6] font-medium hover:text-[#7C3AED] transition-colors">
                        Try this feature <ChevronRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>}
                  {index === 2 && <div className="pt-4">
                      <Link to="/quota-configuration" className="inline-flex items-center text-[#8B5CF6] font-medium hover:text-[#7C3AED] transition-colors">
                        Try this feature <ChevronRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>}
                  {index === 3 && <div className="pt-4">
                      <Link to="/commission-calculator" className="inline-flex items-center text-[#8B5CF6] font-medium hover:text-[#7C3AED] transition-colors">
                        Try this feature <ChevronRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>}
                  {index === 4 && <div className="pt-4">
                      <Link to="/manager-mode" className="inline-flex items-center text-[#8B5CF6] font-medium hover:text-[#7C3AED] transition-colors">
                        Try this feature <ChevronRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>}
                </div>
                
                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transform hover:scale-105 transition-transform duration-300">
                    <div className="aspect-[4/3] bg-gradient-to-b from-gray-50 to-white p-6 flex items-center justify-center">
                      {index === 0 && <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 border border-gray-100">
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
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Book Start ARR</p>
                                <p className="text-lg font-bold text-gray-900">$4,250,000</p>
                              </div>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Churn ARR</p>
                                <p className="text-lg font-bold text-gray-900">$212,500</p>
                              </div>
                              <div className="bg-purple-50 p-4 rounded-lg col-span-2">
                                <p className="text-xs text-purple-700 mb-1">Retention Rate</p>
                                <p className="text-lg font-bold text-purple-700">95%</p>
                              </div>
                            </div>
                          </div>
                        </div>}
                      
                      {index === 1 && <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                          <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 rounded-full bg-[#9b87f5]/10 flex items-center justify-center text-[#9b87f5]">
                                <ChartBarIcon className="w-5 h-5" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">Expansion Metrics</h3>
                                <p className="text-sm text-gray-500">Q2 2023</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Expansion Target</p>
                                <p className="text-lg font-bold text-gray-900">$350,000</p>
                              </div>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Actual Expansion</p>
                                <p className="text-lg font-bold text-gray-900">$402,500</p>
                              </div>
                              <div className="bg-purple-50 p-4 rounded-lg col-span-2">
                                <p className="text-xs text-purple-700 mb-1">Attainment</p>
                                <p className="text-lg font-bold text-purple-700">115%</p>
                              </div>
                            </div>
                          </div>
                        </div>}
                      
                      {index === 2 && <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                          <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 rounded-full bg-[#9b87f5]/10 flex items-center justify-center text-[#9b87f5]">
                                <PieChart className="w-5 h-5" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">Quota Configuration</h3>
                                <p className="text-sm text-gray-500">CSM</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Variable Compensation</p>
                                <p className="text-lg font-bold text-gray-900">₹45,000</p>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="bg-purple-50 p-3 rounded-lg">
                                  <p className="text-xs text-purple-700 mb-1">Retention</p>
                                  <p className="text-md font-bold text-purple-700">70%</p>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-lg">
                                  <p className="text-xs text-purple-700 mb-1">Expansion</p>
                                  <p className="text-md font-bold text-purple-700">30%</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>}
                      
                      {index === 3 && <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                          <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 rounded-full bg-[#9b87f5]/10 flex items-center justify-center text-[#9b87f5]">
                                <DollarSign className="w-5 h-5" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">Quarterly Commission</h3>
                                <p className="text-sm text-gray-500">Q2 2025</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Retention Attainment</p>
                                <p className="text-lg font-bold text-gray-900">105%</p>
                              </div>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Expansion Attainment</p>
                                <p className="text-lg font-bold text-gray-900">115%</p>
                              </div>
                              <div className="bg-purple-50 p-4 rounded-lg col-span-2">
                                <p className="text-xs text-purple-700 mb-1">Quarterly Commission</p>
                                <p className="text-lg font-bold text-purple-700">₹12,487</p>
                              </div>
                            </div>
                          </div>
                        </div>}
                      
                      {index === 4 && <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                          <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 rounded-full bg-[#9b87f5]/10 flex items-center justify-center text-[#9b87f5]">
                                <UserRound className="w-5 h-5" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">Manager Mode</h3>
                                <p className="text-sm text-gray-500">Team Overview</p>
                              </div>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                              <div className="grid grid-cols-3 gap-2 text-sm text-gray-500 border-b pb-2">
                                <div>Rep Name</div>
                                <div className="text-right">Book ARR</div>
                                <div className="text-right">Max Churn</div>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-2">
                                <div className="text-gray-800">John Doe</div>
                                <div className="text-right text-gray-800">$500,000</div>
                                <div className="text-right text-gray-800">$30,940</div>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-2">
                                <div className="text-gray-800">Jane Smith</div>
                                <div className="text-right text-gray-800">$750,000</div>
                                <div className="text-right text-gray-800">$32,850</div>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-2">
                                <div className="text-gray-800">Alex Johnson</div>
                                <div className="text-right text-gray-800">$1,200,000</div>
                                <div className="text-right text-gray-800">$60,770</div>
                              </div>
                            </div>
                            
                            <div className="bg-purple-50 p-3 rounded-lg text-center">
                              <p className="text-xs text-purple-700 mb-1">Team Total Book ARR</p>
                              <p className="text-lg font-bold text-purple-700">$2,450,000</p>
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
              Ready to Calculate Your Commissions?
            </h2>
            <p className="text-xl text-gray-600">Start using our powerful commission calculator today - Completely free!</p>
            <div className="pt-4">
              <Link to="/retention-calculator" className="inline-flex items-center justify-center px-8 py-3 rounded-lg text-lg font-medium text-white bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5] shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all">
                Get Started Now
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
export default Features;
