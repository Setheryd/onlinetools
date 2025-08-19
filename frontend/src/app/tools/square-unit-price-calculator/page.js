import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import SquareUnitPriceCalculatorTool from '../../components/tools/SquareUnitPriceCalculatorTool';

export const metadata = {
  title: 'Square Unit Price Calculator — The Tool Guru',
  description: 'Calculate total price based on area or volume measurements and price per unit. Supports various units for area and volume calculations.',
  keywords: ['square unit', 'price calculator', 'area price', 'volume price', 'cost calculation', 'per square foot', 'per square meter', 'the tool guru'],
  openGraph: {
    title: 'Square Unit Price Calculator — The Tool Guru',
    description: 'Calculate total price based on area or volume measurements and price per unit. Supports various units for area and volume calculations.',
  },
}

const SquareUnitPriceCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <SquareUnitPriceCalculatorTool />
      </Body>
      <Footer />
    </div>
  );
};

export default SquareUnitPriceCalculatorPage;
