# Backend Setup Guide for Keyword Data Collection

This guide will walk you through setting up the complete backend infrastructure for collecting keyword data and generating content suggestions for your online tools website.

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   cd backend/python
   pip install -r requirements.txt
   ```

2. **Configure Environment**
   ```bash
   cp env.example .env
   # Edit .env with your API keys
   ```

3. **Test the Setup**
   ```bash
   python scripts/collect_keywords.py setup
   python scripts/collect_keywords.py collect -k "pdf merger" -k "online tools"
   ```

## 📋 Prerequisites

### Required
- Python 3.8 or higher
- pip (Python package manager)
- Internet connection for API access

### Optional (for enhanced functionality)
- Google Ads account (for Google Ads API access)
- Google Cloud Platform account (for additional APIs)
- Oracle Cloud account (for production data warehouse)

## 🔧 Step-by-Step Setup

### Step 1: Environment Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend/python
   ```

2. **Create and configure your environment file:**
   ```bash
   cp env.example .env
   ```

3. **Edit the .env file with your configuration:**
   ```bash
   # Database Configuration
   DATABASE_URL=sqlite:///./data_warehouse.db
   # For PostgreSQL: postgresql://username:password@localhost:5432/database_name
   
   # Google Ads API Configuration (Optional)
   GOOGLE_ADS_DEVELOPER_TOKEN=your_developer_token_here
   GOOGLE_ADS_CLIENT_ID=your_client_id_here
   GOOGLE_ADS_CLIENT_SECRET=your_client_secret_here
   GOOGLE_ADS_REFRESH_TOKEN=your_refresh_token_here
   
   # OpenAI Configuration (for content generation)
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Scraping Configuration
   SCRAPING_DELAY=2
   USER_AGENT=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
   
   # Logging Configuration
   LOG_LEVEL=INFO
   ```

### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

This will install all required packages including:
- Web scraping libraries (requests, beautifulsoup4, selenium)
- Google APIs (google-ads, pytrends)
- Database connectors (sqlalchemy, psycopg2-binary)
- Content generation (openai)
- Utilities (click, python-dotenv)

### Step 3: Google Ads API Setup (Optional but Recommended)

The Google Ads API provides the most comprehensive keyword data. Follow these steps:

#### 3.1 Create a Google Ads Account
1. Go to [Google Ads](https://ads.google.com)
2. Sign up for an account (no payment required for API access)
3. Note your customer ID (found in the top right of the interface)

#### 3.2 Apply for Developer Token
1. Go to [Google Ads API Developer Token](https://developers.google.com/google-ads/api/docs/first-call/dev-token)
2. Click "Apply for a developer token"
3. Fill out the application form
4. Wait for approval (usually 1-2 business days)

#### 3.3 Set Up Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable the Google Ads API:
   - Go to APIs & Services > Library
   - Search for "Google Ads API"
   - Click Enable

#### 3.4 Create OAuth 2.0 Credentials
1. Go to APIs & Services > Credentials
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Desktop app" as application type
4. Download the JSON file
5. Extract client_id and client_secret

#### 3.5 Generate Refresh Token
1. Go to [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground)
2. Click the settings icon (⚙️)
3. Check "Use your own OAuth credentials"
4. Enter your client_id and client_secret
5. Close settings
6. Select "Google Ads API v15" from the left panel
7. Select "https://www.googleapis.com/auth/adwords"
8. Click "Authorize APIs"
9. Sign in with your Google account
10. Click "Exchange authorization code for tokens"
11. Copy the refresh_token

#### 3.6 Configure Your Application
```bash
python scripts/setup_google_ads.py setup
```

Follow the interactive prompts to enter your credentials.

### Step 4: Test Your Setup

#### 4.1 Test Google Ads API (if configured)
```bash
python scripts/setup_google_ads.py test
```

#### 4.2 Test Keyword Collection
```bash
# Collect data from Google Trends (always available)
python scripts/collect_keywords.py collect -k "pdf merger" -k "online tools" -s google_trends

# Collect data from both sources (if Google Ads is configured)
python scripts/collect_keywords.py collect -k "pdf merger" -k "online tools" -s google_trends -s google_ads
```

#### 4.3 Get Trending Keywords
```bash
python scripts/collect_keywords.py trending
```

#### 4.4 Generate Content Suggestions
```bash
python scripts/collect_keywords.py suggest -k "pdf merger" -k "file converter"
```

## 🗄️ Database Configuration

### Development (SQLite)
The default configuration uses SQLite for development:
```
DATABASE_URL=sqlite:///./data_warehouse.db
```

### Production (PostgreSQL)
For production, use PostgreSQL:
```
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

### Oracle Cloud Integration
To connect to your Oracle Cloud data warehouse:

1. **Get your Oracle Cloud connection details:**
   - Host: Your Oracle Cloud database host
   - Port: Usually 1521
   - Service Name: Your database service name
   - Username: Your database username
   - Password: Your database password

2. **Update your .env file:**
   ```
   DATABASE_URL=postgresql://username:password@host:port/service_name
   ```

3. **Test the connection:**
   ```bash
   python -c "from data_collection.data_warehouse_manager import DataWarehouseManager; DataWarehouseManager()"
   ```

## 📊 Data Collection Workflow

### 1. Collect Keyword Data
```bash
# Collect from specific keywords
python scripts/collect_keywords.py collect -k "pdf merger" -k "file converter" -k "online tools"

# Collect from a file of keywords
echo "pdf merger
file converter
online tools
password generator" > keywords.txt
python scripts/collect_keywords.py collect -f keywords.txt

# Collect with specific timeframes
python scripts/collect_keywords.py collect -k "pdf merger" -t "today 12-m" -t "today 3-m"
```

### 2. Monitor Trending Keywords
```bash
# Get trending keywords from the last 7 days
python scripts/collect_keywords.py trending -d 7

# Get trending keywords from the last 30 days
python scripts/collect_keywords.py trending -d 30 -l 50
```

### 3. Generate Content Ideas
```bash
# Generate content suggestions
python scripts/collect_keywords.py suggest -k "pdf merger" -k "file converter" -m 15
```

## 🔄 Automated Collection

### Create a Scheduled Collection Script
Create a file `scheduled_collection.py`:

```python
#!/usr/bin/env python3
import schedule
import time
from scripts.collect_keywords import KeywordCollectionOrchestrator

def daily_collection():
    orchestrator = KeywordCollectionOrchestrator()
    try:
        # Your seed keywords
        keywords = ["pdf merger", "file converter", "online tools", "password generator"]
        
        # Collect data
        results = orchestrator.collect_comprehensive_data(keywords)
        print(f"Daily collection completed: {len(results.get('summary', {}))} sources")
        
    except Exception as e:
        print(f"Error in daily collection: {e}")
    finally:
        orchestrator.cleanup()

# Schedule daily collection at 2 AM
schedule.every().day.at("02:00").do(daily_collection)

# Run the scheduler
while True:
    schedule.run_pending()
    time.sleep(60)
```

### Run Automated Collection
```bash
python scheduled_collection.py
```

## 📈 Data Analysis

### View Collected Data
All collected data is stored in:
- `backend/data_warehouse/keywords/` - JSON files with raw data
- Database tables (keywords, trends, topics, etc.)

### Analyze Trends
```bash
# Get trending keywords for content
python scripts/collect_keywords.py trending -d 30 -l 100

# Generate content suggestions
python scripts/collect_keywords.py suggest -k "pdf merger" -m 20
```

## 🛠️ Troubleshooting

### Common Issues

#### 1. Google Ads API Errors
- **Error**: "Authentication failed"
  - **Solution**: Check your refresh token and regenerate if needed
- **Error**: "Developer token not approved"
  - **Solution**: Wait for approval or check your application status

#### 2. Rate Limiting
- **Error**: "Too many requests"
  - **Solution**: Increase `SCRAPING_DELAY` in your .env file

#### 3. Database Connection Issues
- **Error**: "Connection refused"
  - **Solution**: Check your database URL and credentials
- **Error**: "Table doesn't exist"
  - **Solution**: The tables will be created automatically on first run

#### 4. Missing Dependencies
- **Error**: "Module not found"
  - **Solution**: Run `pip install -r requirements.txt`

### Debug Mode
Enable debug logging by setting in your .env file:
```
LOG_LEVEL=DEBUG
```

### Test Individual Components
```bash
# Test Google Trends
python -c "from data_collection.google_trends_collector import GoogleTrendsCollector; g = GoogleTrendsCollector(); print(g.get_trending_searches())"

# Test Data Warehouse
python -c "from data_collection.data_warehouse_manager import DataWarehouseManager; w = DataWarehouseManager(); print('Database connected successfully')"
```

## 📚 Next Steps

### 1. Content Generation Integration
Once keyword data is collected, integrate with your content generation system:

```python
from data_collection.data_warehouse_manager import DataWarehouseManager

warehouse = DataWarehouseManager()
trending_keywords = warehouse.get_trending_keywords_for_content(days=7, limit=10)

for keyword_data in trending_keywords:
    # Generate content based on trending keywords
    content_idea = f"How to {keyword_data['keyword']}"
    # Pass to your content generation system
```

### 2. Oracle Cloud Integration
Update your database configuration to point to Oracle Cloud:

```bash
# Update .env file
DATABASE_URL=postgresql://username:password@your-oracle-host:1521/your-service-name
```

### 3. Automated Content Pipeline
Create a pipeline that:
1. Collects keyword data daily
2. Identifies trending topics
3. Generates content ideas
4. Creates blog posts/articles
5. Publishes to your website

### 4. Monitoring and Analytics
Set up monitoring for:
- Collection success rates
- Data quality metrics
- Trending keyword changes
- Content performance

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the logs in `backend/logs/`
3. Test individual components
4. Verify your API credentials
5. Check your internet connection

## 📝 Configuration Reference

### Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `sqlite:///./data_warehouse.db` |
| `GOOGLE_ADS_DEVELOPER_TOKEN` | Google Ads developer token | None |
| `GOOGLE_ADS_CLIENT_ID` | Google Ads OAuth client ID | None |
| `GOOGLE_ADS_CLIENT_SECRET` | Google Ads OAuth client secret | None |
| `GOOGLE_ADS_REFRESH_TOKEN` | Google Ads refresh token | None |
| `OPENAI_API_KEY` | OpenAI API key for content generation | None |
| `SCRAPING_DELAY` | Delay between requests (seconds) | 2 |
| `USER_AGENT` | User agent for web requests | Mozilla/5.0... |
| `LOG_LEVEL` | Logging level | INFO |

### Command Line Options
| Command | Description | Options |
|---------|-------------|---------|
| `collect` | Collect keyword data | `-k`, `-f`, `-s`, `-t`, `-o` |
| `trending` | Get trending keywords | `-d`, `-l` |
| `suggest` | Generate content suggestions | `-k`, `-m` |
| `setup` | Show setup instructions | None |

## 🎯 Best Practices

1. **Start Small**: Begin with a few keywords and expand gradually
2. **Monitor Rate Limits**: Respect API rate limits to avoid blocks
3. **Regular Collection**: Set up automated daily collection
4. **Data Backup**: Regularly backup your keyword data
5. **Quality Over Quantity**: Focus on high-quality, relevant keywords
6. **Stay Updated**: Keep your dependencies and API credentials current

## 🚀 Production Deployment

For production deployment:

1. **Use PostgreSQL**: Switch from SQLite to PostgreSQL
2. **Set Up Monitoring**: Monitor collection success and data quality
3. **Automate**: Set up cron jobs or scheduled tasks
4. **Secure**: Use environment variables for all sensitive data
5. **Backup**: Implement regular database backups
6. **Scale**: Consider using multiple collection instances for large datasets

---

**Happy keyword collecting! 🎉**
