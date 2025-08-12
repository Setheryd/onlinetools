# Backend - Keyword Data Collection System

This directory contains the backend infrastructure for collecting keyword data and generating content suggestions for your online tools website.

## 🚀 Quick Start

1. **Navigate to the Python backend:**
   ```bash
   cd python
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment:**
   ```bash
   cp env.example .env
   # Edit .env with your API keys
   ```

4. **Test the setup:**
   ```bash
   python test_setup.py
   ```

5. **Start collecting keywords:**
   ```bash
   python scripts/collect_keywords.py collect -k "pdf merger" -k "online tools"
   ```

## 📁 Directory Structure

```
backend/
├── python/                          # Main Python backend
│   ├── config/                      # Configuration files
│   │   ├── settings.py             # Main settings
│   │   └── __init__.py
│   ├── data_collection/            # Data collection modules
│   │   ├── google_ads_collector.py # Google Ads API collector
│   │   ├── google_trends_collector.py # Google Trends collector
│   │   ├── data_warehouse_manager.py # Database management
│   │   ├── keyword_scraper.py      # Web scraping utilities
│   │   └── __init__.py
│   ├── content_generation/         # Content generation modules
│   ├── image_processing/           # Image processing utilities
│   ├── utils/                      # Utility functions
│   │   ├── logger.py              # Logging utilities
│   │   └── __init__.py
│   ├── scripts/                    # Command-line scripts
│   │   ├── collect_keywords.py    # Main collection orchestrator
│   │   ├── setup_google_ads.py    # Google Ads setup helper
│   │   └── __init__.py
│   ├── requirements.txt            # Python dependencies
│   ├── env.example                 # Environment template
│   ├── test_setup.py              # Setup verification script
│   ├── SETUP_GUIDE.md             # Detailed setup guide
│   └── __init__.py
├── data_warehouse/                 # Data storage
│   ├── keywords/                   # Keyword data files
│   ├── images/                     # Image assets
│   └── articles/                   # Generated articles
└── README.md                       # This file
```

## 🔧 Main Components

### 1. Data Collectors
- **Google Ads Collector**: Fetches keyword data using the official Google Ads API
- **Google Trends Collector**: Collects trend data using the pytrends library
- **Web Scrapers**: Scrapes data from various keyword research websites

### 2. Data Warehouse Manager
- **Database Operations**: Handles storing and retrieving keyword data
- **Data Validation**: Ensures data quality and consistency
- **Query Interface**: Provides easy access to collected data

### 3. Content Generation
- **Keyword Analysis**: Analyzes collected data for content opportunities
- **Content Suggestions**: Generates content ideas based on trending keywords
- **Article Templates**: Provides templates for different content types

### 4. Command Line Tools
- **Collection Orchestrator**: Main script for collecting keyword data
- **Setup Helpers**: Tools for configuring APIs and databases
- **Analysis Tools**: Scripts for analyzing collected data

## 📊 Data Sources

### Google Ads API (Recommended)
- **Pros**: Most comprehensive data, official API, reliable
- **Cons**: Requires setup, approval process, rate limits
- **Setup**: See `SETUP_GUIDE.md` for detailed instructions

### Google Trends (Always Available)
- **Pros**: Free, no setup required, real-time data
- **Cons**: Limited historical data, rate limits
- **Setup**: Works out of the box

### Web Scraping (Fallback)
- **Pros**: Access to various sources, no API limits
- **Cons**: Less reliable, may break, ethical considerations
- **Setup**: Configured automatically

## 🗄️ Database Support

### Development
- **SQLite**: Default for development and testing
- **Setup**: Automatic, no configuration needed

### Production
- **PostgreSQL**: Recommended for production
- **Oracle Cloud**: Compatible with your Oracle Cloud data warehouse
- **Setup**: Update `DATABASE_URL` in `.env` file

## 🚀 Getting Started

### 1. Basic Setup (Google Trends Only)
```bash
cd python
pip install -r requirements.txt
cp env.example .env
python test_setup.py
python scripts/collect_keywords.py collect -k "pdf merger"
```

### 2. Full Setup (Google Ads + Google Trends)
```bash
# Follow the setup guide for Google Ads API
python scripts/setup_google_ads.py instructions
python scripts/setup_google_ads.py setup

# Test everything
python test_setup.py

# Collect comprehensive data
python scripts/collect_keywords.py collect -k "pdf merger" -s google_trends -s google_ads
```

### 3. Oracle Cloud Integration
```bash
# Update your .env file with Oracle Cloud credentials
DATABASE_URL=postgresql://username:password@your-oracle-host:1521/your-service-name

# Test the connection
python -c "from data_collection.data_warehouse_manager import DataWarehouseManager; DataWarehouseManager()"
```

## 📈 Usage Examples

### Collect Keyword Data
```bash
# Collect from specific keywords
python scripts/collect_keywords.py collect -k "pdf merger" -k "file converter"

# Collect from a file
echo "pdf merger
file converter
online tools" > keywords.txt
python scripts/collect_keywords.py collect -f keywords.txt

# Collect with specific timeframes
python scripts/collect_keywords.py collect -k "pdf merger" -t "today 12-m" -t "today 3-m"
```

### Get Trending Keywords
```bash
# Get trending keywords from the last 7 days
python scripts/collect_keywords.py trending -d 7

# Get trending keywords from the last 30 days
python scripts/collect_keywords.py trending -d 30 -l 50
```

### Generate Content Ideas
```bash
# Generate content suggestions
python scripts/collect_keywords.py suggest -k "pdf merger" -k "file converter" -m 15
```

## 🔄 Automation

### Daily Collection
Create a scheduled task or cron job to run:
```bash
python scripts/collect_keywords.py collect -k "pdf merger" -k "file converter" -k "online tools"
```

### Content Pipeline
1. Collect keyword data daily
2. Identify trending topics
3. Generate content suggestions
4. Create blog posts/articles
5. Publish to your website

## 🛠️ Troubleshooting

### Common Issues
1. **Import Errors**: Run `pip install -r requirements.txt`
2. **API Errors**: Check your credentials in `.env`
3. **Database Errors**: Verify your `DATABASE_URL`
4. **Rate Limiting**: Increase `SCRAPING_DELAY` in `.env`

### Debug Mode
Enable debug logging:
```bash
# In .env file
LOG_LEVEL=DEBUG
```

### Test Individual Components
```bash
# Test Google Trends
python -c "from data_collection.google_trends_collector import GoogleTrendsCollector; g = GoogleTrendsCollector(); print(g.get_trending_searches())"

# Test Data Warehouse
python -c "from data_collection.data_warehouse_manager import DataWarehouseManager; w = DataWarehouseManager(); print('Database connected successfully')"
```

## 📚 Documentation

- **SETUP_GUIDE.md**: Comprehensive setup instructions
- **test_setup.py**: Automated setup verification
- **scripts/collect_keywords.py --help**: Command-line help
- **scripts/setup_google_ads.py --help**: Google Ads setup help

## 🎯 Next Steps

1. **Set up Google Ads API** for comprehensive keyword data
2. **Configure Oracle Cloud** for production data storage
3. **Create automated collection** with scheduled tasks
4. **Integrate with content generation** system
5. **Set up monitoring** for data quality and performance

## 🆘 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the logs in `logs/`
3. Run `python test_setup.py` to verify your setup
4. Check the `SETUP_GUIDE.md` for detailed instructions

---

**Happy keyword collecting! 🎉**
