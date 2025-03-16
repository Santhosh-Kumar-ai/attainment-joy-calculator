import React from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { ArrowLeft } from "lucide-react";
const Privacy = () => {
  return <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-purple-600 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        
        <div className="prose prose-purple max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <p className="text-gray-700 mb-4">
            Last updated: {new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Introduction</h2>
          <p className="text-gray-700 mb-4">
            Commcal ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. 
            This Privacy Policy explains how we handle information when you use our commission calculator application.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Information We Don't Collect</h2>
          <p className="text-gray-700 mb-4">
            Commcal does not store, process, or share any personal data. Our application operates entirely 
            using your device's local storage capabilities. We do not:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Collect or store personal information</li>
            <li>Track your activity across other websites</li>
            <li>Share data with third parties</li>
            <li>Use cookies or similar tracking technologies</li>
            <li>Process payments or billing information</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Local Storage</h2>
          <p className="text-gray-700 mb-4">
            Our application uses local storage on your device to temporarily save calculation data. 
            This means:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>All data remains on your device and is not transmitted to our servers</li>
            <li>Your calculation data is used only to provide the service within the application</li>
            <li>No personally identifiable information is stored</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Data Deletion Recommendation</h2>
          <p className="text-gray-700 mb-4">
            We highly recommend using the "Delete all data" option on the Commissions calculation page after each calculation. 
            This ensures that no sensitive business information remains in your local storage.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Changes to Privacy Policy</h2>
          <p className="text-gray-700 mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
            the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">If you have any questions about this Privacy Policy, please contact us at sortedbiz@gmail.com.</p>
        </div>
      </div>
    </div>;
};
export default Privacy;