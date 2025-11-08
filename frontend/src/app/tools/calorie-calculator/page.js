import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import CalorieCalculatorTool from '../../components/tools/CalorieCalculatorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Calorie Calculator — The Tool Guru',
  description: 'Estimate daily calories (BMR/TDEE) with activity levels.',
  keywords: ['calorie calculator', 'BMR', 'TDEE', 'nutrition'],
  openGraph: {
    title: 'Calorie Calculator — The Tool Guru',
    description: 'Daily calorie estimator (BMR/TDEE).',
  },
};

const CalorieCalculatorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <CalorieCalculatorTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Calorie Calculator"
          description="Estimate daily calories (BMR/TDEE) with activity levels. Our calorie calculator helps you determine your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) based on your age, gender, height, weight, and activity level. Perfect for weight management, fitness planning, nutrition tracking, or understanding your daily calorie needs. The tool provides accurate estimates to help you achieve your health and fitness goals."
          features={[
            "Calculate Basal Metabolic Rate (BMR)",
            "Estimate Total Daily Energy Expenditure (TDEE)",
            "Support for multiple activity levels",
            "Metric and imperial unit support",
            "Age, gender, height, and weight factors",
            "Clear calorie requirement display",
            "Support for weight management goals",
            "Works entirely in your browser for privacy"
          ]}
          howToUse={[
            "Enter your age, gender, height, and weight",
            "Select your activity level",
            "View calculated BMR and TDEE",
            "Use BMR for resting calorie needs",
            "Use TDEE for daily calorie needs",
            "Adjust for weight loss or gain goals",
            "Use for meal planning",
            "Track calorie intake and expenditure"
          ]}
          useCases={[
            "Determine daily calorie needs",
            "Plan weight loss or gain strategies",
            "Calculate maintenance calories",
            "Plan nutrition and meal prep",
            "Track fitness and nutrition goals",
            "Understand metabolic rate",
            "Plan diet and exercise programs",
            "Calculate calorie requirements"
          ]}
          tips={[
            "BMR is calories burned at rest",
            "TDEE includes activity level",
            "Use accurate measurements for best results",
            "Adjust activity level based on your lifestyle",
            "Factor in exercise when calculating TDEE",
            "Use for planning weight management",
            "Consult healthcare professionals for medical advice"
          ]}
          faq={[
            {
              question: "What is BMR?",
              answer: "BMR (Basal Metabolic Rate) is the number of calories your body burns at rest to maintain basic functions like breathing, circulation, and cell production."
            },
            {
              question: "What is TDEE?",
              answer: "TDEE (Total Daily Energy Expenditure) is the total calories you burn per day, including BMR plus calories burned through activity and exercise."
            },
            {
              question: "How do I choose my activity level?",
              answer: "Select the activity level that best matches your daily routine: sedentary (little exercise), lightly active (light exercise 1-3 days/week), moderately active (moderate exercise 3-5 days/week), very active (hard exercise 6-7 days/week), or extra active (very hard exercise and physical job)."
            },
            {
              question: "Are these calculations accurate?",
              answer: "The calculator provides estimates based on standard formulas. Individual results may vary based on metabolism, muscle mass, and other factors. Consult healthcare professionals for personalized advice."
            }
          ]}
        />
      </div>
    </Body>
    <Footer />
  </div>
);

export default CalorieCalculatorPage;


