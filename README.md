# Online Tools Platform

A comprehensive platform featuring free online utilities and automated content generation.

## Project Structure

```
onlinetools/
├── backend/                          # Python backend for data processing
│   ├── python/
│   │   ├── data_collection/         # Keyword scraping and data gathering
│   │   ├── image_processing/        # Image generation and processing
│   │   ├── content_generation/      # Article and content creation
│   │   ├── utils/                   # Shared utilities and helpers
│   │   └── config/                  # Configuration files
│   └── data_warehouse/              # Data storage and management
├── onlinetools/                      # Next.js frontend application
│   ├── src/
│   │   ├── app/                     # Next.js 13+ app router
│   │   │   ├── components/          # Layout and page components
│   │   │   │   ├── layout/          # Header, Footer, Hero, Body
│   │   │   │   ├── tools/           # Tool-specific components
│   │   │   │   └── ui/              # Reusable UI components
│   │   │   ├── hooks/               # Custom React hooks
│   │   │   ├── pages/               # Page components
│   │   │   │   ├── home.js          # Home page
│   │   │   │   ├── tools/           # Tool pages
│   │   │   │   └── blog/            # Blog pages
│   │   │   ├── styles/              # CSS and styling files
│   │   │   ├── types/               # TypeScript type definitions
│   │   │   └── utils/               # Frontend utilities
│   │   └── public/                  # Static assets
│   └── package.json                 # Frontend dependencies
└── shared/                          # Shared resources
    ├── config/                      # Shared configuration
    └── constants/                   # Shared constants
```

## Features

### Frontend Tools
- Base64 Encoder/Decoder
- PDF Merger
- Additional utilities (to be added)

### Backend Automation
- **Data Collection**: Scrapes keyword data from various sources
- **Image Processing**: Generates or finds images for keywords
- **Content Generation**: Creates articles and posts to website via Vercel API

## Getting Started

### Frontend Development
```bash
cd onlinetools
npm install
npm run dev
```

### Backend Development
```bash
cd backend/python
pip install -r requirements.txt
```

## Data Flow

1. **Data Collection**: Python scripts scrape keyword data from:
   - AnswerThePublic
   - KeywordTool.io
   - Ahrefs Free Keyword Generator
   - Google Trends (via pytrends)
   - Google Ads API (when available)

2. **Image Processing**: Keywords are processed to generate or find relevant images

3. **Content Generation**: Articles are created using collected data and images

4. **Publication**: Content is automatically posted to the website via Vercel API

## Cron Jobs

Backend scripts are designed to run as cron jobs on virtual machines for automated data collection and content generation. 
   