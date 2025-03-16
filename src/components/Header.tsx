
import { Link, useLocation } from "react-router-dom";
import { Calculator } from "lucide-react";

export const Header = () => {
  const location = useLocation();
  const showGetStartedButton = ["/", "/features", "/how-it-works", "/faq"].includes(location.pathname);
  
  return (
    <header className="w-full bg-white/90 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5] p-2 rounded-lg shadow-sm">
            <Calculator className="w-5 h-5 text-white transform group-hover:rotate-12 transition-transform" />
          </div>
          <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5]">
            Commcal
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/features" className="text-gray-600 hover:text-[#8B5CF6] font-medium text-sm transition-colors">
            Features
          </Link>
          <Link to="/how-it-works" className="text-gray-600 hover:text-[#8B5CF6] font-medium text-sm transition-colors">
            How It Works
          </Link>
          <Link to="/faq" className="text-gray-600 hover:text-[#8B5CF6] font-medium text-sm transition-colors">
            FAQ
          </Link>
          <Link to="/manager-mode" className="text-gray-600 hover:text-[#8B5CF6] font-medium text-sm transition-colors">
            Manager Mode <span className="ml-1 text-xs px-1.5 py-0.5 bg-[#9b87f5]/10 text-[#9b87f5] rounded-full">Beta</span>
          </Link>
        </nav>
        
        {showGetStartedButton && (
          <Link to="/retention-calculator" className="bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all">
            Get Started
          </Link>
        )}
      </div>
    </header>
  );
};
