"""
Keyword scraping module for collecting data from various sources.
"""
import time
import json
import requests
from bs4 import BeautifulSoup
from pytrends.request import TrendReq
from typing import List, Dict, Optional
from utils.logger import get_logger
from config.settings import SCRAPING_DELAY, USER_AGENT

logger = get_logger(__name__)

class KeywordScraper:
    """Main class for scraping keywords from various sources."""
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({'User-Agent': USER_AGENT})
        self.pytrends = TrendReq(hl='en-US', tz=360)
        
    def scrape_answerthepublic(self, keyword: str) -> List[Dict]:
        """
        Scrape keyword data from AnswerThePublic.
        
        Args:
            keyword: The seed keyword to search for
            
        Returns:
            List of keyword data dictionaries
        """
        logger.info(f"Scraping AnswerThePublic for keyword: {keyword}")
        
        try:
            # Note: This is a simplified example. AnswerThePublic may require
            # more sophisticated handling including JavaScript rendering
            url = f"https://answerthepublic.com/reports/{keyword.replace(' ', '-')}"
            
            response = self.session.get(url)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract keyword data (this would need to be customized based on actual page structure)
            keywords = []
            
            # Look for keyword lists in the page
            keyword_elements = soup.find_all(['ul', 'ol'], class_=lambda x: x and 'keyword' in x.lower())
            
            for element in keyword_elements:
                for li in element.find_all('li'):
                    keyword_text = li.get_text(strip=True)
                    if keyword_text:
                        keywords.append({
                            'keyword': keyword_text,
                            'source': 'answerthepublic',
                            'seed_keyword': keyword,
                            'timestamp': time.time()
                        })
            
            logger.info(f"Found {len(keywords)} keywords from AnswerThePublic")
            return keywords
            
        except Exception as e:
            logger.error(f"Error scraping AnswerThePublic: {e}")
            return []
    
    def scrape_keywordtool(self, keyword: str) -> List[Dict]:
        """
        Scrape keyword data from KeywordTool.io.
        
        Args:
            keyword: The seed keyword to search for
            
        Returns:
            List of keyword data dictionaries
        """
        logger.info(f"Scraping KeywordTool.io for keyword: {keyword}")
        
        try:
            # Note: This is a simplified example. KeywordTool.io may require
            # authentication or have different URL structures
            url = f"https://keywordtool.io/search/google/{keyword}"
            
            response = self.session.get(url)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            keywords = []
            
            # Look for keyword tables or lists
            keyword_elements = soup.find_all(['table', 'ul', 'ol'])
            
            for element in keyword_elements:
                for row in element.find_all(['tr', 'li']):
                    cells = row.find_all(['td', 'span', 'div'])
                    if cells:
                        keyword_text = cells[0].get_text(strip=True)
                        if keyword_text and len(keyword_text) > 2:
                            keywords.append({
                                'keyword': keyword_text,
                                'source': 'keywordtool',
                                'seed_keyword': keyword,
                                'timestamp': time.time()
                            })
            
            logger.info(f"Found {len(keywords)} keywords from KeywordTool.io")
            return keywords
            
        except Exception as e:
            logger.error(f"Error scraping KeywordTool.io: {e}")
            return []
    
    def get_google_trends(self, keyword: str) -> List[Dict]:
        """
        Get keyword data from Google Trends using pytrends.
        
        Args:
            keyword: The seed keyword to search for
            
        Returns:
            List of keyword data dictionaries
        """
        logger.info(f"Getting Google Trends data for keyword: {keyword}")
        
        try:
            # Build payload
            self.pytrends.build_payload([keyword], timeframe='today 1-m')
            
            # Get related queries
            related_queries = self.pytrends.related_queries()
            
            keywords = []
            
            if keyword in related_queries:
                # Rising queries
                rising = related_queries[keyword].get('rising')
                if rising is not None:
                    for _, row in rising.iterrows():
                        keywords.append({
                            'keyword': row['query'],
                            'source': 'google_trends_rising',
                            'seed_keyword': keyword,
                            'value': row['value'],
                            'timestamp': time.time()
                        })
                
                # Top queries
                top = related_queries[keyword].get('top')
                if top is not None:
                    for _, row in top.iterrows():
                        keywords.append({
                            'keyword': row['query'],
                            'source': 'google_trends_top',
                            'seed_keyword': keyword,
                            'value': row['value'],
                            'timestamp': time.time()
                        })
            
            logger.info(f"Found {len(keywords)} keywords from Google Trends")
            return keywords
            
        except Exception as e:
            logger.error(f"Error getting Google Trends data: {e}")
            return []
    
    def scrape_all_sources(self, keyword: str) -> List[Dict]:
        """
        Scrape keywords from all available sources.
        
        Args:
            keyword: The seed keyword to search for
            
        Returns:
            Combined list of keyword data from all sources
        """
        logger.info(f"Starting comprehensive keyword scraping for: {keyword}")
        
        all_keywords = []
        
        # Scrape from each source
        sources = [
            self.scrape_answerthepublic,
            self.scrape_keywordtool,
            self.get_google_trends
        ]
        
        for source_func in sources:
            try:
                keywords = source_func(keyword)
                all_keywords.extend(keywords)
                
                # Respect scraping delay
                time.sleep(SCRAPING_DELAY)
                
            except Exception as e:
                logger.error(f"Error with source {source_func.__name__}: {e}")
                continue
        
        # Remove duplicates based on keyword text
        unique_keywords = {}
        for kw in all_keywords:
            if kw['keyword'] not in unique_keywords:
                unique_keywords[kw['keyword']] = kw
        
        result = list(unique_keywords.values())
        logger.info(f"Total unique keywords found: {len(result)}")
        
        return result
    
    def save_keywords(self, keywords: List[Dict], filename: str):
        """
        Save keywords to a JSON file.
        
        Args:
            keywords: List of keyword dictionaries
            filename: Output filename
        """
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(keywords, f, indent=2, ensure_ascii=False)
            logger.info(f"Saved {len(keywords)} keywords to {filename}")
        except Exception as e:
            logger.error(f"Error saving keywords: {e}")

def main():
    """Example usage of the KeywordScraper."""
    scraper = KeywordScraper()
    
    # Example keywords to scrape
    test_keywords = ['pdf merger', 'base64 decoder', 'online tools']
    
    for keyword in test_keywords:
        logger.info(f"Processing keyword: {keyword}")
        keywords = scraper.scrape_all_sources(keyword)
        
        if keywords:
            filename = f"keywords_{keyword.replace(' ', '_')}_{int(time.time())}.json"
            scraper.save_keywords(keywords, filename)

if __name__ == "__main__":
    main()
