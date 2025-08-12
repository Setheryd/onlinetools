"""
Data Warehouse Manager

This module provides functionality to store and retrieve keyword data from the Oracle Cloud data warehouse.
It includes methods for database operations, data validation, and data transformation.
"""

import json
import sqlite3
import psycopg2
from typing import List, Dict, Optional, Any, Union
from datetime import datetime, timedelta
from pathlib import Path
import sys

# Add the parent directory to the path so we can import our modules
sys.path.append(str(Path(__file__).parent.parent.parent))

from config.settings import DATABASE_URL, BASE_DIR
from utils.logger import get_logger

logger = get_logger(__name__)

class DataWarehouseManager:
    """Manages data storage and retrieval for the keyword data warehouse."""
    
    def __init__(self, database_url: Optional[str] = None):
        """
        Initialize the data warehouse manager.
        
        Args:
            database_url: Database connection URL (optional, uses config default)
        """
        self.database_url = database_url or DATABASE_URL
        self.connection = None
        self._initialize_database()
    
    def _initialize_database(self):
        """Initialize the database connection and create tables if they don't exist."""
        try:
            if self.database_url.startswith('sqlite'):
                # SQLite database (for development/testing)
                db_path = self.database_url.replace('sqlite:///', '')
                if db_path.startswith('./'):
                    db_path = BASE_DIR / db_path[2:]
                else:
                    db_path = Path(db_path)
                
                # Ensure directory exists
                db_path.parent.mkdir(parents=True, exist_ok=True)
                
                self.connection = sqlite3.connect(str(db_path))
                self._create_sqlite_tables()
                
            elif self.database_url.startswith('postgresql'):
                # PostgreSQL database (for production)
                self.connection = psycopg2.connect(self.database_url)
                self._create_postgresql_tables()
            
            logger.info("Database connection established successfully")
            
        except Exception as e:
            logger.error(f"Failed to initialize database: {e}")
            raise
    
    def _create_sqlite_tables(self):
        """Create SQLite tables for keyword data."""
        cursor = self.connection.cursor()
        
        # Keywords table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS keywords (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                keyword TEXT NOT NULL,
                avg_monthly_searches INTEGER,
                competition TEXT,
                competition_index INTEGER,
                low_top_of_page_bid_micros INTEGER,
                high_top_of_page_bid_micros INTEGER,
                source TEXT NOT NULL,
                seed_keywords TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Trends table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS trends (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                keyword TEXT NOT NULL,
                query TEXT,
                value INTEGER,
                trend_type TEXT,
                timeframe TEXT,
                source TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Topics table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS topics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                keyword TEXT NOT NULL,
                topic_title TEXT,
                topic_type TEXT,
                value INTEGER,
                trend_type TEXT,
                timeframe TEXT,
                source TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Interest over time table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS interest_over_time (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                keywords TEXT NOT NULL,
                date TEXT NOT NULL,
                interest_value INTEGER,
                keyword_name TEXT,
                is_partial BOOLEAN,
                timeframe TEXT,
                source TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Trending searches table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS trending_searches (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                rank INTEGER,
                search_term TEXT NOT NULL,
                title TEXT,
                traffic TEXT,
                image_url TEXT,
                articles TEXT,
                location TEXT,
                source TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Create indexes for better performance
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_keywords_keyword ON keywords(keyword)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_keywords_source ON keywords(source)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_keywords_timestamp ON keywords(timestamp)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_trends_keyword ON trends(keyword)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_trends_source ON trends(source)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_topics_keyword ON topics(keyword)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_interest_keywords ON interest_over_time(keywords)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_trending_rank ON trending_searches(rank)')
        
        self.connection.commit()
        logger.info("SQLite tables created successfully")
    
    def _create_postgresql_tables(self):
        """Create PostgreSQL tables for keyword data."""
        cursor = self.connection.cursor()
        
        # Keywords table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS keywords (
                id SERIAL PRIMARY KEY,
                keyword VARCHAR(255) NOT NULL,
                avg_monthly_searches INTEGER,
                competition VARCHAR(50),
                competition_index INTEGER,
                low_top_of_page_bid_micros BIGINT,
                high_top_of_page_bid_micros BIGINT,
                source VARCHAR(50) NOT NULL,
                seed_keywords TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Trends table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS trends (
                id SERIAL PRIMARY KEY,
                keyword VARCHAR(255) NOT NULL,
                query TEXT,
                value INTEGER,
                trend_type VARCHAR(20),
                timeframe VARCHAR(20),
                source VARCHAR(50) NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Topics table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS topics (
                id SERIAL PRIMARY KEY,
                keyword VARCHAR(255) NOT NULL,
                topic_title TEXT,
                topic_type VARCHAR(50),
                value INTEGER,
                trend_type VARCHAR(20),
                timeframe VARCHAR(20),
                source VARCHAR(50) NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Interest over time table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS interest_over_time (
                id SERIAL PRIMARY KEY,
                keywords TEXT NOT NULL,
                date DATE NOT NULL,
                interest_value INTEGER,
                keyword_name VARCHAR(255),
                is_partial BOOLEAN,
                timeframe VARCHAR(20),
                source VARCHAR(50) NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Trending searches table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS trending_searches (
                id SERIAL PRIMARY KEY,
                rank INTEGER,
                search_term VARCHAR(255) NOT NULL,
                title TEXT,
                traffic VARCHAR(50),
                image_url TEXT,
                articles JSONB,
                location VARCHAR(10),
                source VARCHAR(50) NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Create indexes for better performance
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_keywords_keyword ON keywords(keyword)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_keywords_source ON keywords(source)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_keywords_timestamp ON keywords(timestamp)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_trends_keyword ON trends(keyword)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_trends_source ON trends(source)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_topics_keyword ON topics(keyword)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_interest_keywords ON interest_over_time(keywords)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_trending_rank ON trending_searches(rank)')
        
        self.connection.commit()
        logger.info("PostgreSQL tables created successfully")
    
    def store_keywords(self, keywords: List[Dict]) -> bool:
        """
        Store keyword data in the database.
        
        Args:
            keywords: List of keyword dictionaries
            
        Returns:
            True if successful, False otherwise
        """
        try:
            cursor = self.connection.cursor()
            
            for keyword_data in keywords:
                cursor.execute('''
                    INSERT INTO keywords (
                        keyword, avg_monthly_searches, competition, competition_index,
                        low_top_of_page_bid_micros, high_top_of_page_bid_micros,
                        source, seed_keywords, timestamp
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    keyword_data.get('keyword'),
                    keyword_data.get('avg_monthly_searches'),
                    keyword_data.get('competition'),
                    keyword_data.get('competition_index'),
                    keyword_data.get('low_top_of_page_bid_micros'),
                    keyword_data.get('high_top_of_page_bid_micros'),
                    keyword_data.get('source'),
                    json.dumps(keyword_data.get('seed_keywords', [])),
                    keyword_data.get('timestamp', datetime.now().isoformat())
                ))
            
            self.connection.commit()
            logger.info(f"Stored {len(keywords)} keywords in database")
            return True
            
        except Exception as e:
            logger.error(f"Error storing keywords: {e}")
            self.connection.rollback()
            return False
    
    def store_trends(self, trends_data: Dict[str, Any]) -> bool:
        """
        Store trend data in the database.
        
        Args:
            trends_data: Dictionary containing trend data
            
        Returns:
            True if successful, False otherwise
        """
        try:
            cursor = self.connection.cursor()
            
            # Store related queries
            for keyword, timeframes in trends_data.get('related_queries', {}).items():
                for timeframe, data in timeframes.items():
                    # Store rising queries
                    for query in data.get('rising_queries', []):
                        cursor.execute('''
                            INSERT INTO trends (
                                keyword, query, value, trend_type, timeframe, source, timestamp
                            ) VALUES (?, ?, ?, ?, ?, ?, ?)
                        ''', (
                            keyword,
                            query.get('query'),
                            query.get('value'),
                            'rising',
                            timeframe,
                            data.get('source'),
                            data.get('timestamp')
                        ))
                    
                    # Store top queries
                    for query in data.get('top_queries', []):
                        cursor.execute('''
                            INSERT INTO trends (
                                keyword, query, value, trend_type, timeframe, source, timestamp
                            ) VALUES (?, ?, ?, ?, ?, ?, ?)
                        ''', (
                            keyword,
                            query.get('query'),
                            query.get('value'),
                            'top',
                            timeframe,
                            data.get('source'),
                            data.get('timestamp')
                        ))
            
            # Store related topics
            for keyword, timeframes in trends_data.get('related_topics', {}).items():
                for timeframe, data in timeframes.items():
                    # Store rising topics
                    for topic in data.get('rising_topics', []):
                        cursor.execute('''
                            INSERT INTO topics (
                                keyword, topic_title, topic_type, value, trend_type, timeframe, source, timestamp
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                        ''', (
                            keyword,
                            topic.get('topic_title'),
                            topic.get('topic_type'),
                            topic.get('value'),
                            'rising',
                            timeframe,
                            data.get('source'),
                            data.get('timestamp')
                        ))
                    
                    # Store top topics
                    for topic in data.get('top_topics', []):
                        cursor.execute('''
                            INSERT INTO topics (
                                keyword, topic_title, topic_type, value, trend_type, timeframe, source, timestamp
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                        ''', (
                            keyword,
                            topic.get('topic_title'),
                            topic.get('topic_type'),
                            topic.get('value'),
                            'top',
                            timeframe,
                            data.get('source'),
                            data.get('timestamp')
                        ))
            
            # Store interest over time
            for timeframe, data in trends_data.get('interest_over_time', {}).items():
                for time_point in data.get('interest_over_time', []):
                    for keyword in trends_data.get('keywords', []):
                        if keyword in time_point:
                            cursor.execute('''
                                INSERT INTO interest_over_time (
                                    keywords, date, interest_value, keyword_name, is_partial, timeframe, source, timestamp
                                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                            ''', (
                                json.dumps(trends_data.get('keywords', [])),
                                time_point.get('date'),
                                time_point.get(keyword),
                                keyword,
                                time_point.get('is_partial', False),
                                timeframe,
                                data.get('source'),
                                data.get('timestamp')
                            ))
            
            # Store trending searches
            for search in trends_data.get('trending_searches', []):
                cursor.execute('''
                    INSERT INTO trending_searches (
                        rank, search_term, location, source, timestamp
                    ) VALUES (?, ?, ?, ?, ?)
                ''', (
                    search.get('rank'),
                    search.get('search_term'),
                    search.get('location'),
                    search.get('source'),
                    search.get('timestamp')
                ))
            
            # Store real-time trending searches
            for search in trends_data.get('realtime_trending', []):
                cursor.execute('''
                    INSERT INTO trending_searches (
                        rank, search_term, title, traffic, image_url, articles, location, source, timestamp
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    search.get('rank'),
                    search.get('title', ''),
                    search.get('title'),
                    search.get('traffic'),
                    search.get('image_url'),
                    json.dumps(search.get('articles', [])),
                    search.get('location'),
                    search.get('source'),
                    search.get('timestamp')
                ))
            
            self.connection.commit()
            logger.info("Stored trend data in database")
            return True
            
        except Exception as e:
            logger.error(f"Error storing trends: {e}")
            self.connection.rollback()
            return False
    
    def get_keywords_by_source(self, source: str, limit: int = 100) -> List[Dict]:
        """
        Retrieve keywords by source.
        
        Args:
            source: Data source (e.g., 'google_ads_api', 'google_trends')
            limit: Maximum number of results
            
        Returns:
            List of keyword dictionaries
        """
        try:
            cursor = self.connection.cursor()
            
            cursor.execute('''
                SELECT * FROM keywords 
                WHERE source = ? 
                ORDER BY timestamp DESC 
                LIMIT ?
            ''', (source, limit))
            
            columns = [description[0] for description in cursor.description]
            keywords = []
            
            for row in cursor.fetchall():
                keyword_dict = dict(zip(columns, row))
                if keyword_dict.get('seed_keywords'):
                    keyword_dict['seed_keywords'] = json.loads(keyword_dict['seed_keywords'])
                keywords.append(keyword_dict)
            
            logger.info(f"Retrieved {len(keywords)} keywords from source: {source}")
            return keywords
            
        except Exception as e:
            logger.error(f"Error retrieving keywords: {e}")
            return []
    
    def get_trending_keywords(self, days: int = 7, limit: int = 50) -> List[Dict]:
        """
        Get trending keywords from the last N days.
        
        Args:
            days: Number of days to look back
            limit: Maximum number of results
            
        Returns:
            List of trending keyword dictionaries
        """
        try:
            cursor = self.connection.cursor()
            
            # Get keywords with high search volume from recent data
            cursor.execute('''
                SELECT keyword, AVG(avg_monthly_searches) as avg_searches, 
                       COUNT(*) as frequency, MAX(timestamp) as last_seen
                FROM keywords 
                WHERE timestamp >= datetime('now', '-{} days')
                AND avg_monthly_searches > 0
                GROUP BY keyword 
                ORDER BY avg_searches DESC, frequency DESC 
                LIMIT ?
            '''.format(days), (limit,))
            
            trending_keywords = []
            for row in cursor.fetchall():
                trending_keywords.append({
                    'keyword': row[0],
                    'avg_monthly_searches': int(row[1]) if row[1] else 0,
                    'frequency': row[2],
                    'last_seen': row[3]
                })
            
            logger.info(f"Retrieved {len(trending_keywords)} trending keywords")
            return trending_keywords
            
        except Exception as e:
            logger.error(f"Error retrieving trending keywords: {e}")
            return []
    
    def get_keyword_suggestions(self, seed_keyword: str, limit: int = 20) -> List[Dict]:
        """
        Get keyword suggestions based on a seed keyword.
        
        Args:
            seed_keyword: The seed keyword to find suggestions for
            limit: Maximum number of suggestions
            
        Returns:
            List of keyword suggestion dictionaries
        """
        try:
            cursor = self.connection.cursor()
            
            # Get related keywords from trends and topics
            cursor.execute('''
                SELECT DISTINCT query as keyword, value, 'trend' as type
                FROM trends 
                WHERE keyword LIKE ? 
                ORDER BY value DESC 
                LIMIT ?
            ''', (f'%{seed_keyword}%', limit // 2))
            
            suggestions = []
            for row in cursor.fetchall():
                suggestions.append({
                    'keyword': row[0],
                    'value': row[1],
                    'type': row[2]
                })
            
            # Get related topics
            cursor.execute('''
                SELECT DISTINCT topic_title as keyword, value, 'topic' as type
                FROM topics 
                WHERE keyword LIKE ? 
                ORDER BY value DESC 
                LIMIT ?
            ''', (f'%{seed_keyword}%', limit // 2))
            
            for row in cursor.fetchall():
                suggestions.append({
                    'keyword': row[0],
                    'value': row[1],
                    'type': row[2]
                })
            
            # Sort by value and return top results
            suggestions.sort(key=lambda x: x['value'], reverse=True)
            suggestions = suggestions[:limit]
            
            logger.info(f"Retrieved {len(suggestions)} keyword suggestions for: {seed_keyword}")
            return suggestions
            
        except Exception as e:
            logger.error(f"Error retrieving keyword suggestions: {e}")
            return []
    
    def close(self):
        """Close the database connection."""
        if self.connection:
            self.connection.close()
            logger.info("Database connection closed")

# Example usage and testing
if __name__ == "__main__":
    # Example usage
    warehouse = DataWarehouseManager()
    
    # Test storing some sample data
    sample_keywords = [
        {
            'keyword': 'pdf merger',
            'avg_monthly_searches': 12000,
            'competition': 'HIGH',
            'competition_index': 85,
            'source': 'google_ads_api',
            'timestamp': datetime.now().isoformat()
        },
        {
            'keyword': 'online tools',
            'avg_monthly_searches': 8000,
            'competition': 'MEDIUM',
            'competition_index': 65,
            'source': 'google_ads_api',
            'timestamp': datetime.now().isoformat()
        }
    ]
    
    # Store keywords
    warehouse.store_keywords(sample_keywords)
    
    # Retrieve keywords
    keywords = warehouse.get_keywords_by_source('google_ads_api')
    print(f"Retrieved {len(keywords)} keywords")
    
    # Get trending keywords
    trending = warehouse.get_trending_keywords(days=30)
    print(f"Found {len(trending)} trending keywords")
    
    # Close connection
    warehouse.close()
