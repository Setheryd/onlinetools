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
├── frontend/                         # Next.js frontend application
│   ├── components/
│   │   ├── ui/                      # Reusable UI components
│   │   ├── tools/                   # Tool-specific components
│   │   └── layout/                  # Layout components
│   ├── styles/                      # CSS and styling files
│   ├── pages/
│   │   ├── tools/                   # Tool pages
│   │   └── blog/                    # Blog pages
│   ├── utils/                       # Frontend utilities
│   ├── hooks/                       # Custom React hooks
│   └── types/                       # TypeScript type definitions
├── shared/                          # Shared resources
│   ├── config/                      # Shared configuration
│   └── constants/                   # Shared constants
└── onlinetools/                     # Next.js app directory
    ├── src/
    │   └── app/                     # Next.js 13+ app router
    ├── public/                      # Static assets
    └── package.json                 # Frontend dependencies
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
