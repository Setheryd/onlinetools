import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Body from '../components/layout/Body';
import Card from '../components/ui/Card';

export const metadata = {
  title: 'Printful Designs — The Tool Guru',
  description: 'Download THE TOOL GURU product designs for Printful: logos, taglines, and text designs ready to upload to your store.',
  robots: { index: false, follow: true },
};

const DESIGNS = [
  { id: '01-logo-only', name: 'Logo only', desc: 'Icon + THE TOOL GURU' },
  { id: '02-logo-tagline', name: 'Logo + tagline', desc: 'Fix It. Ship It.' },
  { id: '03-measure-twice-ship-once', name: 'Measure twice. Ship once.', desc: 'Text design' },
  { id: '04-i-fix-things', name: 'I Fix Things.', desc: 'Text design' },
  { id: '05-tool-guru-approved', name: 'Tool Guru Approved', desc: 'Stamp-style' },
  { id: '06-built-right', name: 'Built Right.', desc: 'Text design' },
  { id: '07-if-it-works-dont-touch-it', name: 'If it works. Don\'t touch it.', desc: 'Dev joke' },
  { id: '08-show-me-the-code', name: 'Talk is cheap. Show me the code.', desc: 'Dev joke' },
  { id: '09-its-a-feature', name: "It's not a bug. It's a feature.", desc: 'Dev joke' },
  { id: '10-turn-it-off-and-on', name: 'Turn it off. Turn it on. Sorted.', desc: 'Dev joke' },
  { id: '11-code-blooded-bug-free', name: 'Code blooded. Bug free.', desc: 'Dev joke' },
  { id: '12-this-should-do-the-trick', name: 'This should do the trick.', desc: 'Dev joke' },
  { id: '13-rubber-duck-approved', name: 'Rubber duck approved.', desc: 'Dev joke' },
  { id: '14-10-types-of-people', name: '10 types of people. (Binary joke)', desc: 'Dev joke' },
  { id: '15-sudo-make-me-a-sandwich', name: 'sudo make me a sandwich.', desc: 'Dev joke' },
  { id: '16-404-sleep-not-found', name: '404: Sleep not found.', desc: 'Dev joke' },
];

const PROFILE_DESIGNS = [
  { id: 'profile-logo-only', name: 'Profile logo only', desc: 'Head + tools mark (your asset)' },
  { id: 'profile-fix-it-ship-it', name: 'Profile + Fix It. Ship It.', desc: 'Logo with tagline' },
  { id: 'profile-approved', name: 'Profile + APPROVED', desc: 'Logo with stamp text' },
  { id: 'profile-built-right', name: 'Profile + Built Right.', desc: 'Logo with tagline' },
];

const PrintfulDesignsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Printful product designs</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Download PNGs and upload them to{' '}
              <a href="https://www.printful.com/dashboard/product-templates" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">
                Printful → Product templates
              </a>
              . Use 2250px for standard placement; 4500px for large or all-over print. Vector and profile-logo designs use your purple/blue brand gradient.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-10">Profile logo (head + tools)</h2>
          <p className="text-gray-600 mb-6">Designs using your main logo from <code className="text-sm bg-gray-200 px-1 rounded">Brand_Assets/Profile_Photo_Transparent.png</code>.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {PROFILE_DESIGNS.map((d) => (
              <Card key={d.id} className="overflow-hidden">
                <div className="aspect-[2/1] bg-gray-100 flex items-center justify-center p-4">
                  <img
                    src="/Brand_Assets/Profile_Photo_Transparent.png"
                    alt={d.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{d.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{d.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`/api/printful-design/export?name=${d.id}&width=2250`}
                      download={`${d.id}-printful-2250w.png`}
                      className="inline-block px-3 py-2 text-sm font-medium bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                    >
                      PNG 2250px
                    </a>
                    <a
                      href={`/api/printful-design/export?name=${d.id}&width=4500`}
                      download={`${d.id}-printful-4500w.png`}
                      className="inline-block px-3 py-2 text-sm font-medium bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                    >
                      PNG 4500px
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vector designs</h2>
          <p className="text-gray-600 mb-6">Icon + text and dev joke designs (SVG). Same purple/blue gradient as your profile logo.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {DESIGNS.map((d) => (
              <Card key={d.id} className="overflow-hidden">
                <div className="aspect-[2/1] bg-gray-100 flex items-center justify-center p-4">
                  <img
                    src={`/printful-designs/${d.id}.svg`}
                    alt={d.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-gray-900 mb-1">{d.name}</h2>
                  <p className="text-sm text-gray-600 mb-4">{d.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`/api/printful-design/export?name=${d.id}&width=2250`}
                      download={`${d.id}-printful-2250w.png`}
                      className="inline-block px-3 py-2 text-sm font-medium bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                    >
                      PNG 2250px
                    </a>
                    <a
                      href={`/api/printful-design/export?name=${d.id}&width=4500`}
                      download={`${d.id}-printful-4500w.png`}
                      className="inline-block px-3 py-2 text-sm font-medium bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                    >
                      PNG 4500px
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 text-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">How to use</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Click a PNG size above to download (2250px = standard tees/mugs; 4500px = posters/large print).</li>
              <li>Go to <a href="https://www.printful.com/dashboard/product-templates" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">Printful → Product templates</a>.</li>
              <li>Create product → choose your product → upload the PNG as the print file.</li>
              <li>Save as template, then add to store or order for yourself.</li>
            </ol>
          </Card>
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default PrintfulDesignsPage;
