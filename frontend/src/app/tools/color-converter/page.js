import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import ColorConverterTool from '../../components/tools/ColorConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Color Converter — The Tool Guru',
  description: 'Pick a color and convert between HEX, RGB, HSL, HSV, and CMYK. Supports alpha.',
  keywords: ['color converter', 'hex', 'rgb', 'hsl', 'hsv', 'cmyk', 'picker'],
  openGraph: {
    title: 'Color Converter — The Tool Guru',
    description: 'Convert colors between popular formats with a modern color picker.',
  },
};

const ColorConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <ColorConverterTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Color Converter"
            description="Convert colors between HEX, RGB, HSL, HSV, and CMYK formats with a modern color picker. Perfect for web developers, designers, and anyone working with colors across different applications. Our color converter provides accurate conversions and supports alpha transparency, making it easy to work with colors in CSS, design software, and development projects."
            features={[
              "Convert between HEX, RGB, HSL, HSV, and CMYK color formats",
              "Interactive color picker with visual selection",
              "Support for alpha transparency (RGBA, HSLA)",
              "Real-time conversion as you adjust colors",
              "Copy color values in any format to clipboard",
              "Preview color with live color swatch",
              "Input colors in any supported format",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Use the color picker to select a color visually",
              "Or enter a color value in HEX, RGB, HSL, HSV, or CMYK format",
              "View the converted color values in all formats",
              "Adjust the alpha/opacity slider if transparency is needed",
              "Preview the color in the color swatch",
              "Copy any color format to your clipboard",
              "Use the converted values in your CSS, design software, or code"
            ]}
            useCases={[
              "Convert colors for CSS styling (HEX to RGB, etc.)",
              "Match colors between design software and web development",
              "Convert print colors (CMYK) to web colors (RGB/HEX)",
              "Extract colors from images or designs",
              "Create color palettes with consistent formats",
              "Convert colors for use in different programming languages",
              "Match brand colors across different media",
              "Prepare colors for print design (CMYK conversion)"
            ]}
            tips={[
              "HEX format (#RRGGBB) is most common for web development",
              "RGB is used in CSS and many design applications",
              "HSL is great for programmatic color manipulation",
              "CMYK is essential for print design",
              "Use alpha values for transparency in modern web design",
              "Test color contrast for accessibility (WCAG guidelines)",
              "Save frequently used colors for quick access"
            ]}
            faq={[
              {
                question: "What's the difference between RGB and HEX?",
                answer: "RGB uses decimal values (0-255) for red, green, and blue. HEX uses hexadecimal values (00-FF) in a compact format like #FF0000. They represent the same colors, just in different formats."
              },
              {
                question: "When should I use CMYK?",
                answer: "CMYK (Cyan, Magenta, Yellow, Black) is used for print design. RGB/HEX colors are for digital displays. Converting RGB to CMYK may result in slight color shifts, so it's important to use CMYK for print work."
              },
              {
                question: "What is HSL and why use it?",
                answer: "HSL (Hue, Saturation, Lightness) represents colors in a more intuitive way. It's easier to create color variations programmatically - you can adjust lightness or saturation while keeping the same hue."
              },
              {
                question: "Can I use colors with transparency?",
                answer: "Yes, the tool supports alpha transparency. You can work with RGBA (RGB with alpha) and HSLA (HSL with alpha) formats, which are essential for modern web design with semi-transparent colors."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default ColorConverterPage;


