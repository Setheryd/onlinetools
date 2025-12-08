import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import BmiCalculatorTool from '../../components/tools/BmiCalculatorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'BMI Calculator — The Tool Guru',
  description: 'Calculate Body Mass Index and view your category.',
  keywords: ['bmi', 'body mass index', 'health', 'weight', 'height'],
  openGraph: {
    title: 'BMI Calculator — The Tool Guru',
    description: 'BMI calculator with unit switching.',
  },
};

const BmiCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <BmiCalculatorTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="BMI Calculator"
            description="Calculate Body Mass Index (BMI) and view your category with support for both metric and imperial units. Our BMI calculator provides accurate BMI calculations along with category classifications (underweight, normal weight, overweight, obese). Perfect for tracking health metrics, understanding weight status, or monitoring fitness progress. The tool supports easy unit switching between metric (kg, cm) and imperial (lbs, ft/in) measurements."
            features={[
              "Calculate BMI using weight and height",
              "Support for metric (kg, cm) and imperial (lbs, ft/in) units",
              "BMI category classification (underweight, normal, overweight, obese)",
              "Easy unit switching",
              "Visual BMI category indicators",
              "Accurate calculations based on standard BMI formula",
              "Real-time BMI updates",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Select your preferred unit system (metric or imperial)",
              "Enter your weight in the weight field",
              "Enter your height in the height field",
              "View your calculated BMI automatically",
              "Check your BMI category classification",
              "Review health recommendations if provided",
              "Switch units to compare measurements"
            ]}
            useCases={[
              "Track health and fitness metrics",
              "Monitor weight status and changes",
              "Understand BMI categories for health awareness",
              "Calculate BMI for health assessments",
              "Track fitness progress over time",
              "Understand weight-related health indicators",
              "Calculate BMI for medical or insurance purposes",
              "Monitor BMI for health and wellness goals"
            ]}
            tips={[
              "Use accurate weight and height measurements for best results",
              "BMI is a screening tool, not a diagnostic measure",
              "Consider consulting healthcare professionals for health advice",
              "BMI categories are general guidelines",
              "Track BMI over time to monitor changes",
              "Use consistent units for accurate comparisons",
              "Remember that BMI doesn't account for muscle mass or body composition"
            ]}
            faq={[
              {
                question: "What is BMI?",
                answer: "BMI (Body Mass Index) is a measure of body fat based on height and weight. It's calculated as weight divided by height squared (kg/m² or lbs/in² × 703)."
              },
              {
                question: "What do BMI categories mean?",
                answer: "BMI categories: Underweight (<18.5), Normal weight (18.5-24.9), Overweight (25-29.9), Obese (≥30). These are general guidelines and may vary by individual factors."
              },
              {
                question: "Is BMI accurate for everyone?",
                answer: "BMI is a screening tool but doesn't account for muscle mass, bone density, or body composition. Athletes with high muscle mass may have higher BMI despite being healthy."
              },
              {
                question: "Can I switch between metric and imperial units?",
                answer: "Yes, the calculator supports easy switching between metric (kg, cm) and imperial (lbs, ft/in) units for your convenience."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default BmiCalculatorPage;


