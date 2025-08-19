# The Tool Guru - Frontend

A comprehensive collection of free online tools built with Next.js 14 and modern web technologies.

## 🏗️ **Project Structure**

```
frontend/
├── 📁 docs/                          # Documentation
│   ├── 📁 seo/                       # SEO guides and strategies
│   ├── 📁 blog/                      # Blog-related documentation
│   ├── 📁 performance/               # Performance optimization guides
│   └── 📁 ai/                        # AI and automation guides
├── 📁 scripts/                       # Utility scripts
│   ├── 📁 seo/                       # SEO audit and monitoring scripts
│   ├── 📁 build/                     # Build and deployment scripts
│   └── 📁 maintenance/               # Maintenance and cleanup scripts
├── 📁 src/                           # Source code
│   ├── 📁 app/                       # Next.js App Router
│   │   ├── 📁 (routes)/              # Route groups
│   │   │   ├── 📁 tools/             # Individual tool pages
│   │   │   ├── 📁 blog/              # Blog pages
│   │   │   └── 📁 pages/             # Static pages (about, contact)
│   │   ├── 📁 components/            # Shared components
│   │   │   ├── 📁 ui/                # Reusable UI components
│   │   │   ├── 📁 layout/            # Layout components
│   │   │   ├── 📁 tools/             # Tool-specific components
│   │   │   ├── 📁 blog/              # Blog components
│   │   │   └── 📁 analytics/         # Analytics components
│   │   ├── 📁 lib/                   # Library functions
│   │   ├── 📁 utils/                 # Utility functions
│   │   ├── 📁 styles/                # Global styles
│   │   └── 📁 api/                   # API routes
├── 📁 public/                        # Static assets
│   ├── 📁 Brand_Assets/              # Brand assets
│   ├── robots.txt                    # SEO file
│   ├── sitemap.xml                   # SEO file
│   ├── ads.txt                       # SEO file
│   └── favicon.ico                   # Favicon
├── 📁 config/                        # Configuration files
│   ├── tailwind.config.js
│   ├── next.config.mjs
│   ├── postcss.config.mjs
│   └── jsconfig.json
├── package.json                      # Dependencies
└── README.md                         # This file
```

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn

### **Installation**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🛠️ **Development**

### **Adding a New Tool**
1. Create a new directory in `src/app/tools/[tool-name]/`
2. Add a `page.js` file with proper metadata
3. Create the tool component in `src/app/components/tools/`
4. Add tool configuration to `src/lib/tools.js`
5. Update sitemap and robots.txt if needed

### **File Naming Conventions**
- **Components**: PascalCase (e.g., `PasswordGenerator.js`)
- **Pages**: kebab-case (e.g., `password-generator/page.js`)
- **Utilities**: camelCase (e.g., `toolMetadata.js`)
- **Config**: kebab-case (e.g., `tailwind.config.js`)

### **SEO Best Practices**
- Each tool page should have unique metadata
- Include proper canonical URLs
- Add Open Graph and Twitter meta tags
- Use structured data where appropriate
- Run SEO audit: `node scripts/seo-audit.js`

## 📚 **Documentation**

### **SEO Guides**
- [SEO Recovery Action Plan](docs/SEO_RECOVERY_ACTION_PLAN.md)
- [SEO Troubleshooting Guide](docs/SEO_TROUBLESHOOTING_GUIDE.md)
- [SEO Implementation Guide](docs/SEO_IMPLEMENTATION_GUIDE.md)

### **Performance Guides**
- [Lighthouse Fixes](docs/LIGHTHOUSE_FIXES_IMPLEMENTED.md)
- [Alt Tags Guide](docs/ALT_TAGS_GUIDE.md)

### **Blog Guides**
- [Blog Automation Guide](docs/BLOG_AUTOMATION_GUIDE.md)
- [Blog Integration Guide](docs/BLOG_INTEGRATION.md)

## 🔧 **Scripts**

### **SEO Scripts**
```bash
# Run comprehensive SEO audit
node scripts/seo-audit.js

# Check performance metrics
node scripts/performance-check.js
```

### **Build Scripts**
```bash
# Build the project
npm run build

# Analyze bundle size
npm run analyze
```

## 🎯 **Key Features**

### **Tools Available**
- **Text Tools**: Base64 encoder/decoder, JSON formatter, text case converter
- **Calculators**: BMI, mortgage, compound interest, tip calculator
- **Converters**: Temperature, length, area, volume, speed
- **Generators**: Password, UUID, QR codes, Lorem Ipsum
- **Validators**: Email, SSL checker, DNS lookup
- **Image Tools**: Compressor, resizer, converter, filters
- **Developer Tools**: Gitignore generator, htaccess generator, cron job generator

### **Technical Features**
- **Next.js 14** with App Router
- **Tailwind CSS** for styling
- **SEO Optimized** with proper meta tags
- **Performance Optimized** with Core Web Vitals
- **Mobile Responsive** design
- **Accessibility** compliant
- **Analytics** integration

## 📊 **Performance**

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Excellent
- **Page Load Time**: < 1 second
- **SEO Score**: 85%+

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and audits
5. Submit a pull request

### **Development Guidelines**
- Follow the established naming conventions
- Add proper SEO metadata for new pages
- Test on mobile devices
- Run performance checks before committing
- Update documentation as needed

## 📈 **Monitoring**

### **SEO Monitoring**
- Google Search Console
- Google Analytics
- Regular SEO audits
- Performance monitoring

### **Performance Monitoring**
- Core Web Vitals
- Lighthouse scores
- Page load times
- User experience metrics

## 🚀 **Deployment**

The project is deployed on Vercel with automatic deployments from the main branch.

### **Environment Variables**
- `NEXT_PUBLIC_GA_ID`: Google Analytics ID
- `NEXT_PUBLIC_GTM_ID`: Google Tag Manager ID

## 📞 **Support**

For questions or issues:
1. Check the documentation in the `docs/` folder
2. Run the troubleshooting scripts
3. Review the SEO guides for common issues
4. Open an issue on GitHub

---

**Built with ❤️ by The Tool Guru Team**
 