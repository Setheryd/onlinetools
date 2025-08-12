"""
Configuration Module

This module contains configuration settings and environment variable management
for the Online Tools backend.
"""

from .settings import *

__all__ = [
    'BASE_DIR',
    'DATABASE_URL',
    'GOOGLE_ADS_DEVELOPER_TOKEN',
    'GOOGLE_ADS_CLIENT_ID',
    'GOOGLE_ADS_CLIENT_SECRET',
    'GOOGLE_ADS_REFRESH_TOKEN',
    'VERCEL_API_TOKEN',
    'VERCEL_PROJECT_ID',
    'OPENAI_API_KEY',
    'SCRAPING_DELAY',
    'USER_AGENT',
    'DATA_WAREHOUSE_DIR',
    'KEYWORDS_DIR',
    'IMAGES_DIR',
    'ARTICLES_DIR',
    'LOG_LEVEL',
    'LOG_FILE'
]
