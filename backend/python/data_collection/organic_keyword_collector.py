"""
Organic Keyword Data Collector

This module provides functionality to collect keyword data from organic sources
that don't require Google Ads API access. It focuses on finding popular search
terms in your niche for content generation.
"""

import time
import json
import requests
from typing import List, Dict, Optional, Any
from datetime import datetime, timedelta
from pathlib import Path
import sys
import re
from urllib.parse import quote_plus, urlparse
import pandas as pd

# Add the parent directory to the path so we can import our modules
sys.path.append(str(Path(__file__).parent.parent.parent))

from config.settings import BASE_DIR
from utils.logger import get_logger

logger = get_logger(__name__)

class OrganicKeywordCollector:
    """Collects organic keyword data from multiple free sources."""
    
    def __init__(self):
        """Initialize the organic keyword collector."""
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        logger.info("Organic keyword collector initialized")
    
    def get_google_suggestions(self, keyword: str, country: str = 'us') -> List[Dict]:
        """
        Get Google autocomplete suggestions for a keyword.
        
        Args:
            keyword: The seed keyword
            country: Country code for localized suggestions
            
        Returns:
            List of keyword suggestions with metadata
        """
        logger.info(f"Getting Google suggestions for: {keyword}")
        
        suggestions = []
        try:
            # Google autocomplete API endpoint
            url = "https://suggestqueries.google.com/complete/search"
            params = {
                'client': 'firefox',
                'q': keyword,
                'hl': 'en',
                'gl': country
            }
            
            response = self.session.get(url, params=params)
            response.raise_for_status()
            
            data = response.json()
            if len(data) > 1:
                for suggestion in data[1]:
                    suggestions.append({
                        'keyword': suggestion,
                        'source': 'google_suggestions',
                        'seed_keyword': keyword,
                        'country': country,
                        'timestamp': datetime.now().isoformat(),
                        'search_volume': 'unknown',  # Google doesn't provide this
                        'difficulty': 'unknown'
                    })
            
            logger.info(f"Found {len(suggestions)} Google suggestions")
            return suggestions
            
        except Exception as e:
            logger.error(f"Error getting Google suggestions: {e}")
            return []
    
    def get_related_searches(self, keyword: str) -> List[Dict]:
        """
        Get related searches from Google search results.
        
        Args:
            keyword: The seed keyword
            
        Returns:
            List of related search terms
        """
        logger.info(f"Getting related searches for: {keyword}")
        
        related_searches = []
        try:
            # Search for the keyword
            search_url = f"https://www.google.com/search?q={quote_plus(keyword)}"
            response = self.session.get(search_url)
            response.raise_for_status()
            
            # Extract related searches from the page
            content = response.text
            
            # Look for "Searches related to" section
            related_pattern = r'Searches related to.*?<a[^>]*>([^<]+)</a>'
            matches = re.findall(related_pattern, content, re.IGNORECASE | re.DOTALL)
            
            for match in matches:
                related_searches.append({
                    'keyword': match.strip(),
                    'source': 'google_related',
                    'seed_keyword': keyword,
                    'timestamp': datetime.now().isoformat(),
                    'search_volume': 'unknown',
                    'difficulty': 'unknown'
                })
            
            logger.info(f"Found {len(related_searches)} related searches")
            return related_searches
            
        except Exception as e:
            logger.error(f"Error getting related searches: {e}")
            return []
    
    def get_people_also_ask(self, keyword: str) -> List[Dict]:
        """
        Extract "People also ask" questions from Google search results.
        
        Args:
            keyword: The seed keyword
            
        Returns:
            List of questions people ask
        """
        logger.info(f"Getting 'People also ask' for: {keyword}")
        
        questions = []
        try:
            search_url = f"https://www.google.com/search?q={quote_plus(keyword)}"
            response = self.session.get(search_url)
            response.raise_for_status()
            
            content = response.text
            
            # Look for "People also ask" questions
            # This is a simplified pattern - in practice you'd need more sophisticated parsing
            question_pattern = r'<div[^>]*class="[^"]*related-question[^"]*"[^>]*>.*?<span[^>]*>([^<]+)</span>'
            matches = re.findall(question_pattern, content, re.IGNORECASE | re.DOTALL)
            
            for match in matches:
                questions.append({
                    'keyword': match.strip(),
                    'source': 'people_also_ask',
                    'seed_keyword': keyword,
                    'timestamp': datetime.now().isoformat(),
                    'search_volume': 'unknown',
                    'difficulty': 'unknown',
                    'type': 'question'
                })
            
            logger.info(f"Found {len(questions)} 'People also ask' questions")
            return questions
            
        except Exception as e:
            logger.error(f"Error getting 'People also ask': {e}")
            return []
    
    def get_reddit_keywords(self, subreddit: str, limit: int = 100) -> List[Dict]:
        """
        Extract keywords from Reddit posts in relevant subreddits.
        
        Args:
            subreddit: Subreddit name (without r/)
            limit: Number of posts to analyze
            
        Returns:
            List of keywords found in Reddit posts
        """
        logger.info(f"Getting keywords from r/{subreddit}")
        
        keywords = []
        try:
            # Reddit JSON API
            url = f"https://www.reddit.com/r/{subreddit}/hot.json?limit={limit}"
            response = self.session.get(url)
            response.raise_for_status()
            
            data = response.json()
            
            for post in data['data']['children']:
                post_data = post['data']
                title = post_data.get('title', '')
                selftext = post_data.get('selftext', '')
                
                # Extract potential keywords from title and text
                text = f"{title} {selftext}".lower()
                
                # Look for common online tool related terms
                tool_keywords = [
                    'pdf', 'converter', 'merger', 'splitter', 'compressor',
                    'online', 'tool', 'free', 'download', 'merge', 'split',
                    'compress', 'convert', 'format', 'file', 'document'
                ]
                
                for tool_keyword in tool_keywords:
                    if tool_keyword in text:
                        keywords.append({
                            'keyword': tool_keyword,
                            'source': 'reddit',
                            'subreddit': subreddit,
                            'post_title': title[:100],
                            'timestamp': datetime.now().isoformat(),
                            'search_volume': 'unknown',
                            'difficulty': 'unknown'
                        })
            
            logger.info(f"Found {len(keywords)} keywords from r/{subreddit}")
            return keywords
            
        except Exception as e:
            logger.error(f"Error getting Reddit keywords: {e}")
            return []
    
    def get_stackoverflow_tags(self, tag: str, limit: int = 100) -> List[Dict]:
        """
        Extract related tags from Stack Overflow.
        
        Args:
            tag: Base tag to search for
            limit: Number of questions to analyze
            
        Returns:
            List of related tags/keywords
        """
        logger.info(f"Getting Stack Overflow tags related to: {tag}")
        
        keywords = []
        try:
            # Stack Exchange API
            url = f"https://api.stackexchange.com/2.3/questions"
            params = {
                'tagged': tag,
                'site': 'stackoverflow',
                'pagesize': limit,
                'sort': 'votes',
                'order': 'desc'
            }
            
            response = self.session.get(url, params=params)
            response.raise_for_status()
            
            data = response.json()
            
            for question in data.get('items', []):
                tags = question.get('tags', [])
                for tag_name in tags:
                    if tag_name not in [tag]:  # Avoid the base tag
                        keywords.append({
                            'keyword': tag_name,
                            'source': 'stackoverflow',
                            'base_tag': tag,
                            'question_title': question.get('title', '')[:100],
                            'timestamp': datetime.now().isoformat(),
                            'search_volume': 'unknown',
                            'difficulty': 'unknown'
                        })
            
            logger.info(f"Found {len(keywords)} Stack Overflow tags")
            return keywords
            
        except Exception as e:
            logger.error(f"Error getting Stack Overflow tags: {e}")
            return []
    
    def get_github_trending_topics(self, language: str = 'python') -> List[Dict]:
        """
        Extract trending topics from GitHub.
        
        Args:
            language: Programming language to focus on
            
        Returns:
            List of trending topics/keywords
        """
        logger.info(f"Getting GitHub trending topics for: {language}")
        
        keywords = []
        try:
            url = f"https://github.com/trending/{language}"
            response = self.session.get(url)
            response.raise_for_status()
            
            content = response.text
            
            # Extract repository names and descriptions
            repo_pattern = r'<h2[^>]*>.*?<a[^>]*>([^<]+)</a>'
            matches = re.findall(repo_pattern, content, re.IGNORECASE | re.DOTALL)
            
            for match in matches:
                repo_name = match.strip()
                if repo_name:
                    keywords.append({
                        'keyword': repo_name,
                        'source': 'github_trending',
                        'language': language,
                        'timestamp': datetime.now().isoformat(),
                        'search_volume': 'unknown',
                        'difficulty': 'unknown'
                    })
            
            logger.info(f"Found {len(keywords)} GitHub trending topics")
            return keywords
            
        except Exception as e:
            logger.error(f"Error getting GitHub trending topics: {e}")
            return []
    
    def collect_comprehensive_keywords(self, 
                                     seed_keywords: List[str],
                                     sources: List[str] = None) -> Dict[str, Any]:
        """
        Collect keywords from multiple organic sources.
        
        Args:
            seed_keywords: List of seed keywords to expand
            sources: List of sources to use (default: all available)
            
        Returns:
            Dictionary containing all collected keyword data
        """
        if sources is None:
            sources = ['google_suggestions', 'related_searches', 'people_also_ask']
        
        logger.info(f"Starting comprehensive keyword collection for {len(seed_keywords)} seed keywords")
        
        all_keywords = []
        
        for keyword in seed_keywords:
            logger.info(f"Processing seed keyword: {keyword}")
            
            # Google suggestions
            if 'google_suggestions' in sources:
                suggestions = self.get_google_suggestions(keyword)
                all_keywords.extend(suggestions)
                time.sleep(1)  # Be respectful to Google
            
            # Related searches
            if 'related_searches' in sources:
                related = self.get_related_searches(keyword)
                all_keywords.extend(related)
                time.sleep(2)  # Be respectful to Google
            
            # People also ask
            if 'people_also_ask' in sources:
                questions = self.get_people_also_ask(keyword)
                all_keywords.extend(questions)
                time.sleep(2)  # Be respectful to Google
        
        # Community sources (not tied to specific keywords)
        if 'reddit' in sources:
            reddit_keywords = self.get_reddit_keywords('programming', limit=50)
            all_keywords.extend(reddit_keywords)
        
        if 'stackoverflow' in sources:
            stack_keywords = self.get_stackoverflow_tags('python', limit=50)
            all_keywords.extend(stack_keywords)
        
        if 'github' in sources:
            github_keywords = self.get_github_trending_topics('python')
            all_keywords.extend(github_keywords)
        
        # Remove duplicates based on keyword text
        unique_keywords = []
        seen_keywords = set()
        
        for kw in all_keywords:
            if kw['keyword'].lower() not in seen_keywords:
                unique_keywords.append(kw)
                seen_keywords.add(kw['keyword'].lower())
        
        result = {
            'total_keywords': len(unique_keywords),
            'seed_keywords': seed_keywords,
            'sources_used': sources,
            'keywords': unique_keywords,
            'timestamp': datetime.now().isoformat()
        }
        
        logger.info(f"Collection complete. Found {len(unique_keywords)} unique keywords")
        return result
    
    def save_keywords_to_file(self, keywords_data: Dict, filename: str = None) -> str:
        """
        Save collected keywords to a JSON file.
        
        Args:
            keywords_data: The keywords data dictionary
            filename: Optional filename (default: auto-generated)
            
        Returns:
            Path to the saved file
        """
        if filename is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"organic_keywords_{timestamp}.json"
        
        filepath = BASE_DIR / 'data_warehouse' / 'keywords' / filename
        
        # Ensure directory exists
        filepath.parent.mkdir(parents=True, exist_ok=True)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(keywords_data, f, indent=2, ensure_ascii=False)
        
        logger.info(f"Keywords saved to: {filepath}")
        return str(filepath)
