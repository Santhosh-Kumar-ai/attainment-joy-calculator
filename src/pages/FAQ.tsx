import { Header } from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
const FAQ = () => {
  return <div className="min-h-screen bg-gradient-to-b from-white to-[#9b87f5]/5">
      <Header />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-center mb-12 space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight text-[#1A1F2C]">
              Frequently Asked Questions
            </h1>
            <p className="text-[#7E69AB] max-w-lg mx-auto">
              Learn more about our commission calculation methodology and how to get the most out of our tools.
            </p>
          </motion.div>

          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.2
        }} className="bg-white rounded-2xl shadow-sm border border-[#D6BCFA] p-6 overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              {/* Calculation Logic Questions */}
              <AccordionItem value="calc-logic">
                <AccordionTrigger className="text-lg font-medium text-[#1A1F2C]">
                  How does Commcal calculate commission?
                </AccordionTrigger>
                <AccordionContent className="text-[#7E69AB]">
                  <p className="mb-4">
                    Commcal uses a comprehensive approach to calculate commission based on four key components:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 mb-4">
                    <li><strong>Retention Rate Calculation:</strong> Measures your effectiveness at retaining existing ARR against churn targets.</li>
                    <li><strong>Expansion Attainment:</strong> Tracks your performance in growing existing accounts with accelerators for exceeding targets.</li>
                    <li><strong>Quota Configuration:</strong> Customizes your fixed/variable compensation mix and determines the ratio of retention vs expansion components.</li>
                    <li><strong>Commission Calculation:</strong> Combines all factors to calculate your quarterly and annual commission based on attainment.</li>
                  </ol>
                  <p>
                    Each component is designed to align incentives with company growth objectives while providing transparent and fair compensation.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="retention-calculation">
                <AccordionTrigger className="text-lg font-medium text-[#1A1F2C]">
                  How is the Retention Rate calculated?
                </AccordionTrigger>
                <AccordionContent className="text-[#7E69AB]">
                  <p className="mb-4">
                    The Retention Rate is calculated using this formula:
                  </p>
                  <p className="font-mono bg-gray-50 p-3 rounded mb-4">
                    Retention Rate = (1 - (churn $ / start book $))^12 <br/><br/>
                    This can also be seen as the inverse of your churn rate, annualised to be compared against your annualised retention targets.
                  </p>
                  <p className="mb-4">
                    For example, if you start with $1000 in ARR and lose $10 to churn, your churn rate would be 1% and your retention rate would be 99% at a monthly/quarterly runrate. This when annualised (by using ^12) becomes 88.64%.
                  </p>
                  <p>
                    Your attainment is then calculated based on how your actual retention rate compares to your minimum and maximum targets on a linear scale.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="min-max-targets">
                <AccordionTrigger className="text-lg font-medium text-[#1A1F2C]">
                  What are Minimum and Maximum Retention Targets?
                </AccordionTrigger>
                <AccordionContent className="text-[#7E69AB]">
                  <p className="mb-4">
                    <strong>Minimum Retention Target:</strong> This is the baseline retention rate you're expected to achieve. Falling below this target results in zero attainment for the retention component.
                  </p>
                  <p className="mb-4">
                    <strong>Maximum Retention Target:</strong> This is the ideal retention rate that represents 100% attainment. Achieving this rate or higher means you've fully met or exceeded your retention goals.
                  </p>
                  <p>
                    These targets create a scale that determines your attainment percentage. For example, if your minimum target is 80% retention and your maximum is 90%, achieving 85% retention would put you at 50% attainment.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="linear-scale">
                <AccordionTrigger className="text-lg font-medium text-[#1A1F2C]">
                  How does the linear scale work for retention calculations?
                </AccordionTrigger>
                <AccordionContent className="text-[#7E69AB]">
                  <p className="mb-4">
                    The linear scale creates a proportional relationship between your actual retention rate and your attainment percentage, based on your minimum and maximum targets.
                  </p>
                  <p className="mb-4">
                    <strong>Example:</strong> If your minimum retention target is 85% and your maximum is 95%, here's how attainment would be calculated:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>Retention rate of 84% = 0% attainment (below minimum)</li>
                    <li>Retention rate of 85% = 0% attainment (at minimum)</li>
                    <li>Retention rate of 90% = 50% attainment (halfway between min and max)</li>
                    <li>Retention rate of 95% = 100% attainment (at maximum)</li>
                    <li>Retention rate of 97% = 120% attainment (exceeds maximum)</li>
                    <li>Retention rate of 100% = 150% attainment (maximum attainment)</li>
                  </ul>
                  <p>
                    The formula is: Attainment % = (Actual Retention - Minimum Target) / (Maximum Target - Minimum Target) × 100%
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="expansion-accelerators">
                <AccordionTrigger className="text-lg font-medium text-[#1A1F2C]">
                  What are accelerators in expansion attainment calculation?
                </AccordionTrigger>
                <AccordionContent className="text-[#7E69AB]">
                  <p className="mb-4">
                    Accelerators are incentive multipliers that increase the value of expansion ARR when you exceed your targets, rewarding exceptional performance.
                  </p>
                  <p className="mb-4">
                    In our system, accelerators work as follows:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>
                      <strong>Up to 100% of target:</strong> Expansion ARR is counted at 1x (no accelerator)
                    </li>
                    <li>
                      <strong>Between 100% and 200% of target:</strong> Additional expansion ARR is counted at 1.5x
                    </li>
                    <li>
                      <strong>Beyond 200% of target:</strong> Additional expansion ARR reverts to 1x
                    </li>
                  </ul>
                  <p className="mb-4">
                    <strong>Example:</strong> If your expansion target is $100,000 and you achieve $250,000:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>First $100,000 = $100,000 (1x)</li>
                    <li>Next $100,000 = $150,000 (1.5x)</li>
                    <li>Final $50,000 = $50,000 (1x)</li>
                    <li>Total accelerated ARR = $300,000</li>
                    <li>Attainment = 300%</li>
                  </ul>
                  <p>
                    This system encourages exceeding targets while capping the maximum effect of accelerators to maintain sustainability.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="fixed-variable-mix">
                <AccordionTrigger className="text-lg font-medium text-[#1A1F2C]">
                  What is fixed/variable mix?
                </AccordionTrigger>
                <AccordionContent className="text-[#7E69AB]">
                  <p className="mb-4">
                    The fixed/variable mix determines how your total compensation (CTC) is divided between guaranteed salary (fixed) and performance-based commission (variable).
                  </p>
                  <p className="mb-4">
                    <strong>Example ratios include:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li><strong>80/20:</strong> 80% of compensation is fixed, 20% is variable</li>
                    <li><strong>75/25:</strong> 75% fixed, 25% variable</li>
                    <li><strong>70/30:</strong> 70% fixed, 30% variable</li>
                  </ul>
                  
                  <ul className="list-disc list-inside space-y-2">
                    
                    
                    
                    
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="quota-mix">
                <AccordionTrigger className="text-lg font-medium text-[#1A1F2C]">
                  What is Quota mix?
                </AccordionTrigger>
                <AccordionContent className="text-[#7E69AB]">
                  <p className="mb-4">
                    Quota mix determines how your variable compensation is allocated between retention and expansion objectives. This allocation reflects the strategic importance of each objective to your organization.
                  </p>
                  <p className="mb-4">
                    Common quota mixes include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li><strong>70/30:</strong> 70% for retention, 30% for expansion</li>
                    <li><strong>30/70:</strong> 30% for retention, 70% for expansion</li>
                    <li><strong>Custom:</strong> Any other combination that adds up to 100%</li>
                  </ul>
                  <p className="mb-4">
                    <strong>Example:</strong> If your annual variable compensation is ₹300,000 with a 70/30 quota mix:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>₹210,000 would be tied to retention objectives</li>
                    <li>₹90,000 would be tied to expansion objectives</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="additional-credits">
                <AccordionTrigger className="text-lg font-medium text-[#1A1F2C]">
                  What are additional quota credits?
                </AccordionTrigger>
                <AccordionContent className="text-[#7E69AB]">
                  <p className="mb-4">
                    Additional quota credits are bonuses applied to your quota attainment for specific achievements or circumstances that go beyond standard retention and expansion metrics.
                  </p>
                  <p className="mb-4">
                    Examples of activities that might earn additional quota credits include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>Successfully upselling premium features or services</li>
                    <li>Securing multi-year contracts</li>
                    <li>Achieving SPIFFS </li>
                    <li>Securing referrals/Advocacy that convert to new business</li>
                    <li>Successfully implementing strategic solutions</li>
                  </ul>
                  <p>
                    These credits are typically added directly to your retention or expansion attainment, effectively boosting your commission earnings beyond what your standard performance metrics would provide.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="quarterly-churn-target">
                <AccordionTrigger className="text-lg font-medium text-[#1A1F2C]">
                  What is the Quarterly Churn Target?
                </AccordionTrigger>
                <AccordionContent className="text-[#7E69AB]">
                  <p className="mb-4">
                    The Quarterly Churn Target represents the maximum amount of ARR (Annual Recurring Revenue) that can be lost to customer cancellations or downgrades in a quarter while still meeting your retention attainment of 100%.
                  </p>
                  <p className="mb-4">
                    It's calculated based on your starting ARR and your maximum retention target:
                  </p>
                  <p className="font-mono bg-gray-50 p-3 rounded mb-4">
                    Quarterly Churn Target = Starting ARR × (1 - (Maximum Retention Target)^(1/12)) <br/><br/>
                    We use "^(1/12)" to convert the annualised targets to a monthly/quarterly runrate.<br/><br/>
                    This can also be seen as the inverse of your monthly/quarterly retention target.
                  </p>
                  <p className="mb-4">
                    <strong>Example:</strong> If your starting ARR is $1,000,000 and your maximum retention target is 95%:
                  </p>
                  <p className="mb-4">
                    Quarterly Churn Target = $1,000,000 × (1 - ((0.95)^(1/12))) = $4265
                  </p>
                  <p>
                    This means to achieve your maximum retention goal, you need to keep quarterly churn below $4265. Exceeding this amount will reduce your retention attainment percentage.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="max-quarterly-churn">
                <AccordionTrigger className="text-lg font-medium text-[#1A1F2C]">
                  What is the Maximum Quarterly Churn Allowed?
                </AccordionTrigger>
                <AccordionContent className="text-[#7E69AB]">
                  <p className="mb-4">
                    The Maximum Quarterly Churn Allowed represents the absolute maximum ARR that can be lost in a quarter before reaching 0% attainment on your retention target.
                  </p>
                  <p className="mb-4">
                    It's calculated based on your starting ARR and your minimum retention target:
                  </p>
                  <p className="font-mono bg-gray-50 p-3 rounded mb-4">
                    Maximum Quarterly Churn Allowed = Starting ARR × (1 - ((Minimum Retention Target)^(1/12)) <br/><br/>
                    We use "^(1/12)" to convert the annualised targets to a monthly/quarterly runrate.<br/><br/>
                    This can also be seen as the inverse of your monthly/quarterly minimum retention rate target.
                  </p>
                  <p className="mb-4">
                    <strong>Example:</strong> If your starting ARR is $1,000,000 and your minimum retention target is 75%:
                  </p>
                  <p className="mb-4">
                    Maximum Quarterly Churn Allowed = $1,000,000 × (1 - ((0.75)^(1/12))) = $23688
                  </p>
                  <p>
                    If quarterly churn is equal to or exceeds $23,688 in this example, your retention attainment would be 0%.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* Data privacy questions */}
              <AccordionItem value="data-safe">
                <AccordionTrigger className="text-lg font-medium text-[#1A1F2C]">
                  Is my data safe?
                </AccordionTrigger>
                <AccordionContent className="text-[#7E69AB]">
                  <p className="mb-4">
                    Yes, your data is completely safe. Commcal is designed with privacy as a core principle:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>All calculations happen locally in your browser</li>
                    <li>No sensitive business data is transmitted to our servers</li>
                    <li>Your inputs are stored only in your browser's local storage</li>
                    <li>We do not track individual usage or calculation details</li>
                    <li>You can clear all stored data at any time by clearing your browser cache</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-storage">
                <AccordionTrigger className="text-lg font-medium text-[#1A1F2C]">
                  Where is my data stored?
                </AccordionTrigger>
                <AccordionContent className="text-[#7E69AB]">
                  <p className="mb-4">
                    Commcal stores your calculation inputs exclusively in your device's local browser storage. This means:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Your data never leaves your device</li>
                    <li>Your inputs persist between sessions so you don't need to re-enter information</li>
                    <li>No account is required because we don't store your data in our databases</li>
                    <li>Your information is automatically cleared when you clear your browser cache</li>
                    <li>We cannot access your calculation data, even for troubleshooting</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Additional questions */}
              <AccordionItem value="save-calculations">
                <AccordionTrigger className="text-lg font-medium text-[#1A1F2C]">
                  Can I save or export my calculations?
                </AccordionTrigger>
                <AccordionContent className="text-[#7E69AB]">
                  <p>
                    Currently, calculations are saved automatically in your browser's local storage and persist between sessions. We're working on features to export calculations to PDF or spreadsheet formats for easier sharing with your team or for record-keeping purposes. Stay tuned for updates!
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="multi-team">
                <AccordionTrigger className="text-lg font-medium text-[#1A1F2C]">
                  Can I use Commcal for multiple team members?
                </AccordionTrigger>
                <AccordionContent className="text-[#7E69AB]">
                  <p className="mb-4">
                    Yes, you can use Commcal for calculating commissions for multiple team members by:
                  </p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Running separate calculations for each team member</li>
                    <li>Using different browser profiles or private browsing sessions to avoid data overlap</li>
                    <li>Clearing stored data between calculations (by clearing local storage)</li>
                  </ol>
                  <p className="mt-4">
                    For enterprise users managing large teams, we recommend using separate browser sessions for each team member's calculations to prevent data overlap.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </div>
    </div>;
};
export default FAQ;
