import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import QrCodeGeneratorTool from '../../components/tools/QrCodeGeneratorTool';

export const metadata = {
  title: 'QR Code Generator — The Tool Guru',
  description: 'Generate QR codes for URLs, text, and more. Free online QR code generator with PNG and SVG output.',
  keywords: ['qr code', 'qr generator', 'barcode', 'png', 'svg', 'the tool guru'],
  openGraph: {
    title: 'QR Code Generator — The Tool Guru',
    description: 'Generate QR codes for URLs, text, and more.',
  },
};

const QrCodeGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <QrCodeGeneratorTool />
      </Body>
      <Footer />
    </div>
  );
};

export default QrCodeGeneratorPage;


