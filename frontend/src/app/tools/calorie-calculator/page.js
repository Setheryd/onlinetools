import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import CalorieCalculatorTool from '../../components/tools/CalorieCalculatorTool';

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
    </Body>
    <Footer />
  </div>
);

export default CalorieCalculatorPage;


