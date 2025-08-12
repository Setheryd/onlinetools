"""
Configuration settings for the Online Tools backend.
"""
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Base directory
BASE_DIR = Path(__file__).parent.parent.parent

# Database settings
DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///./data_warehouse.db')

# Google API settings
GOOGLE_ADS_DEVELOPER_TOKEN = os.getenv('GOOGLE_ADS_DEVELOPER_TOKEN')
GOOGLE_ADS_CLIENT_ID = os.getenv('GOOGLE_ADS_CLIENT_ID')
GOOGLE_ADS_CLIENT_SECRET = os.getenv('GOOGLE_ADS_CLIENT_SECRET')
GOOGLE_ADS_REFRESH_TOKEN = os.getenv('GOOGLE_ADS_REFRESH_TOKEN')

# Vercel API settings
VERCEL_API_TOKEN = os.getenv('VERCEL_API_TOKEN')
VERCEL_PROJECT_ID = os.getenv('VERCEL_PROJECT_ID')

# OpenAI settings
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

# Scraping settings
SCRAPING_DELAY = int(os.getenv('SCRAPING_DELAY', '2'))  # seconds between requests
USER_AGENT = os.getenv('USER_AGENT', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')

# Data warehouse paths
DATA_WAREHOUSE_DIR = BASE_DIR / 'data_warehouse'
KEYWORDS_DIR = DATA_WAREHOUSE_DIR / 'keywords'
IMAGES_DIR = DATA_WAREHOUSE_DIR / 'images'
ARTICLES_DIR = DATA_WAREHOUSE_DIR / 'articles'

# Create directories if they don't exist
for directory in [DATA_WAREHOUSE_DIR, KEYWORDS_DIR, IMAGES_DIR, ARTICLES_DIR]:
    directory.mkdir(parents=True, exist_ok=True)

# Logging settings
LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
LOG_FILE = BASE_DIR / 'logs' / 'backend.log'

# Create logs directory
LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
