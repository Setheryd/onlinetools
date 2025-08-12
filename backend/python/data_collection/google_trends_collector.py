"""
Google Trends Data Collector

This module provides functionality to collect keyword trend data using the pytrends library.
It includes methods for getting related queries, trending topics, and interest over time.
"""

import time
import json
from typing import List, Dict, Optional, Any
from datetime import datetime, timedelta
from pathlib import Path
import sys

# Add the parent directory to the path so we can import our modules
sys.path.append(str(Path(__file__).parent.parent.parent))

from pytrends.request import TrendReq
from config.settings import BASE_DIR
from utils.logger import get_logger

logger = get_logger(__name__)

class GoogleTrendsCollector:
    """Collects keyword trend data using Google Trends."""
    
    def __init__(self, hl: str = 'en-US', tz: int = 360):
        """
        Initialize the Google Trends collector.
        
        Args:
            hl: Host language (default: 'en-US')
            tz: Timezone offset in minutes (default: 360 for EST)
        """
        self.pytrends = TrendReq(hl=hl, tz=tz)
        self.session = self.pytrends.session
        logger.info("Google Trends collector initialized")
    
    def get_related_queries(self, 
                           keyword: str, 
                           timeframe: str = 'today 12-m') -> Dict[str, Any]:
        """
        Get related queries for a keyword.
        
        Args:
            keyword: The keyword to search for
            timeframe: Time range for the search (default: 'today 12-m')
            
        Returns:
            Dictionary containing rising and top queries
        """
        logger.info(f"Getting related queries for: {keyword}")
        
        try:
            # Build payload
            self.pytrends.build_payload([keyword], timeframe=timeframe)
            
            # Get related queries
            related_queries = self.pytrends.related_queries()
            
            if keyword in related_queries and related_queries[keyword]:
                rising_queries = related_queries[keyword].get('rising', pd.DataFrame())
                top_queries = related_queries[keyword].get('top', pd.DataFrame())
                
                # Convert to list of dictionaries
                rising_data = []
                if not rising_queries.empty:
                    for _, row in rising_queries.iterrows():
                        rising_data.append({
                            'query': row['query'],
                            'value': int(row['value']),
                            'type': 'rising'
                        })
                
                top_data = []
                if not top_queries.empty:
                    for _, row in top_queries.iterrows():
                        top_data.append({
                            'query': row['query'],
                            'value': int(row['value']),
                            'type': 'top'
                        })
                
                result = {
                    'keyword': keyword,
                    'timeframe': timeframe,
                    'rising_queries': rising_data,
                    'top_queries': top_data,
                    'source': 'google_trends',
                    'timestamp': datetime.now().isoformat()
                }
                
                logger.info(f"Found {len(rising_data)} rising and {len(top_data)} top queries")
                return result
            else:
                logger.warning(f"No related queries found for: {keyword}")
                return {
                    'keyword': keyword,
                    'timeframe': timeframe,
                    'rising_queries': [],
                    'top_queries': [],
                    'source': 'google_trends',
                    'timestamp': datetime.now().isoformat()
                }
                
        except Exception as e:
            logger.error(f"Error getting related queries for {keyword}: {e}")
            return {
                'keyword': keyword,
                'timeframe': timeframe,
                'rising_queries': [],
                'top_queries': [],
                'source': 'google_trends',
                'error': str(e),
                'timestamp': datetime.now().isoformat()
            }
    
    def get_related_topics(self, 
                          keyword: str, 
                          timeframe: str = 'today 12-m') -> Dict[str, Any]:
        """
        Get related topics for a keyword.
        
        Args:
            keyword: The keyword to search for
            timeframe: Time range for the search (default: 'today 12-m')
            
        Returns:
            Dictionary containing rising and top topics
        """
        logger.info(f"Getting related topics for: {keyword}")
        
        try:
            # Build payload
            self.pytrends.build_payload([keyword], timeframe=timeframe)
            
            # Get related topics
            related_topics = self.pytrends.related_topics()
            
            if keyword in related_topics and related_topics[keyword]:
                rising_topics = related_topics[keyword].get('rising', pd.DataFrame())
                top_topics = related_topics[keyword].get('top', pd.DataFrame())
                
                # Convert to list of dictionaries
                rising_data = []
                if not rising_topics.empty:
                    for _, row in rising_topics.iterrows():
                        rising_data.append({
                            'topic_title': row['topic_title'],
                            'topic_type': row['topic_type'],
                            'value': int(row['value']),
                            'type': 'rising'
                        })
                
                top_data = []
                if not top_topics.empty:
                    for _, row in top_topics.iterrows():
                        top_data.append({
                            'topic_title': row['topic_title'],
                            'topic_type': row['topic_type'],
                            'value': int(row['value']),
                            'type': 'top'
                        })
                
                result = {
                    'keyword': keyword,
                    'timeframe': timeframe,
                    'rising_topics': rising_data,
                    'top_topics': top_data,
                    'source': 'google_trends',
                    'timestamp': datetime.now().isoformat()
                }
                
                logger.info(f"Found {len(rising_data)} rising and {len(top_data)} top topics")
                return result
            else:
                logger.warning(f"No related topics found for: {keyword}")
                return {
                    'keyword': keyword,
                    'timeframe': timeframe,
                    'rising_topics': [],
                    'top_topics': [],
                    'source': 'google_trends',
                    'timestamp': datetime.now().isoformat()
                }
                
        except Exception as e:
            logger.error(f"Error getting related topics for {keyword}: {e}")
            return {
                'keyword': keyword,
                'timeframe': timeframe,
                'rising_topics': [],
                'top_topics': [],
                'source': 'google_trends',
                'error': str(e),
                'timestamp': datetime.now().isoformat()
            }
    
    def get_interest_over_time(self, 
                              keywords: List[str], 
                              timeframe: str = 'today 12-m') -> Dict[str, Any]:
        """
        Get interest over time for keywords.
        
        Args:
            keywords: List of keywords to track
            timeframe: Time range for the search (default: 'today 12-m')
            
        Returns:
            Dictionary containing interest over time data
        """
        logger.info(f"Getting interest over time for: {keywords}")
        
        try:
            # Build payload
            self.pytrends.build_payload(keywords, timeframe=timeframe)
            
            # Get interest over time
            interest_over_time = self.pytrends.interest_over_time()
            
            if not interest_over_time.empty:
                # Convert to list of dictionaries
                time_data = []
                for date, row in interest_over_time.iterrows():
                    data_point = {
                        'date': date.isoformat(),
                        'is_partial': bool(row.get('isPartial', False))
                    }
                    
                    # Add interest values for each keyword
                    for keyword in keywords:
                        if keyword in row:
                            data_point[keyword] = int(row[keyword])
                    
                    time_data.append(data_point)
                
                result = {
                    'keywords': keywords,
                    'timeframe': timeframe,
                    'interest_over_time': time_data,
                    'source': 'google_trends',
                    'timestamp': datetime.now().isoformat()
                }
                
                logger.info(f"Retrieved interest data for {len(time_data)} time points")
                return result
            else:
                logger.warning(f"No interest over time data found for: {keywords}")
                return {
                    'keywords': keywords,
                    'timeframe': timeframe,
                    'interest_over_time': [],
                    'source': 'google_trends',
                    'timestamp': datetime.now().isoformat()
                }
                
        except Exception as e:
            logger.error(f"Error getting interest over time for {keywords}: {e}")
            return {
                'keywords': keywords,
                'timeframe': timeframe,
                'interest_over_time': [],
                'source': 'google_trends',
                'error': str(e),
                'timestamp': datetime.now().isoformat()
            }
    
    def get_trending_searches(self, geo: str = 'US') -> List[Dict]:
        """
        Get trending searches for a specific location.
        
        Args:
            geo: Geographic location (default: 'US')
            
        Returns:
            List of trending search dictionaries
        """
        logger.info(f"Getting trending searches for: {geo}")
        
        try:
            trending_searches = self.pytrends.trending_searches(pn=geo)
            
            trending_data = []
            for index, search_term in trending_searches.iterrows():
                trending_data.append({
                    'rank': int(index) + 1,
                    'search_term': search_term[0],
                    'location': geo,
                    'source': 'google_trends',
                    'timestamp': datetime.now().isoformat()
                })
            
            logger.info(f"Found {len(trending_data)} trending searches")
            return trending_data
            
        except Exception as e:
            logger.error(f"Error getting trending searches for {geo}: {e}")
            return []
    
    def get_realtime_trending_searches(self, geo: str = 'US') -> List[Dict]:
        """
        Get real-time trending searches for a specific location.
        
        Args:
            geo: Geographic location (default: 'US')
            
        Returns:
            List of real-time trending search dictionaries
        """
        logger.info(f"Getting real-time trending searches for: {geo}")
        
        try:
            realtime_trending = self.pytrends.realtime_trending_searches(pn=geo)
            
            trending_data = []
            for index, row in realtime_trending.iterrows():
                trending_data.append({
                    'rank': int(index) + 1,
                    'title': row.get('title', ''),
                    'traffic': row.get('traffic', ''),
                    'image_url': row.get('image', {}).get('newsUrl', ''),
                    'articles': row.get('articles', []),
                    'location': geo,
                    'source': 'google_trends_realtime',
                    'timestamp': datetime.now().isoformat()
                })
            
            logger.info(f"Found {len(trending_data)} real-time trending searches")
            return trending_data
            
        except Exception as e:
            logger.error(f"Error getting real-time trending searches for {geo}: {e}")
            return []
    
    def save_data_to_file(self, data: Any, filename: str = None):
        """
        Save trend data to a JSON file.
        
        Args:
            data: Data to save
            filename: Output filename (optional)
        """
        if filename is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"google_trends_data_{timestamp}.json"
        
        output_path = BASE_DIR / 'data_warehouse' / 'keywords' / filename
        
        with open(output_path, 'w') as f:
            json.dump(data, f, indent=2)
        
        logger.info(f"Saved trend data to {output_path}")
        return output_path
    
    def collect_comprehensive_trends(self,
                                   keywords: List[str],
                                   timeframes: List[str] = None,
                                   save_to_file: bool = True) -> Dict[str, Any]:
        """
        Collect comprehensive trend data for keywords.
        
        Args:
            keywords: List of keywords to analyze
            timeframes: List of timeframes to analyze (default: ['today 12-m', 'today 3-m'])
            save_to_file: Whether to save results to file
            
        Returns:
            Dictionary containing all collected trend data
        """
        if timeframes is None:
            timeframes = ['today 12-m', 'today 3-m']
        
        logger.info(f"Starting comprehensive trend data collection for: {keywords}")
        
        results = {
            'keywords': keywords,
            'timeframes': timeframes,
            'collection_timestamp': datetime.now().isoformat(),
            'related_queries': {},
            'related_topics': {},
            'interest_over_time': {},
            'trending_searches': [],
            'realtime_trending': []
        }
        
        # Get related queries and topics for each keyword and timeframe
        for keyword in keywords:
            results['related_queries'][keyword] = {}
            results['related_topics'][keyword] = {}
            
            for timeframe in timeframes:
                # Add delay to avoid rate limiting
                time.sleep(1)
                
                results['related_queries'][keyword][timeframe] = self.get_related_queries(keyword, timeframe)
                results['related_topics'][keyword][timeframe] = self.get_related_topics(keyword, timeframe)
        
        # Get interest over time for all keywords
        for timeframe in timeframes:
            time.sleep(1)
            results['interest_over_time'][timeframe] = self.get_interest_over_time(keywords, timeframe)
        
        # Get trending searches
        results['trending_searches'] = self.get_trending_searches()
        results['realtime_trending'] = self.get_realtime_trending_searches()
        
        # Save to file if requested
        if save_to_file:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"comprehensive_trends_{timestamp}.json"
            self.save_data_to_file(results, filename)
        
        logger.info("Comprehensive trend data collection completed")
        return results

# Import pandas for DataFrame handling
import pandas as pd

# Example usage and testing
if __name__ == "__main__":
    # Example usage
    collector = GoogleTrendsCollector()
    
    # Test with some sample keywords
    keywords = ["pdf merger", "online tools", "file converter"]
    
    # Collect comprehensive trend data
    results = collector.collect_comprehensive_trends(keywords)
    
    print(f"Collected trend data for {len(keywords)} keywords")
    print(f"Found trending searches: {len(results['trending_searches'])}")
    print(f"Found real-time trending: {len(results['realtime_trending'])}")
