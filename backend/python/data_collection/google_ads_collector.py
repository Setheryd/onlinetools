"""
Google Ads API Keyword Data Collector

This module provides functionality to collect keyword data using the official Google Ads API.
It includes methods for getting keyword ideas, historical metrics, and search volume data.
"""

import time
import json
from typing import List, Dict, Optional, Any
from datetime import datetime, timedelta
from pathlib import Path
import sys

# Add the parent directory to the path so we can import our modules
sys.path.append(str(Path(__file__).parent.parent.parent))

from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException
from config.settings import BASE_DIR
from utils.logger import get_logger

logger = get_logger(__name__)

class GoogleAdsKeywordCollector:
    """Collects keyword data using the Google Ads API."""
    
    def __init__(self, config_file: Optional[str] = None):
        """
        Initialize the Google Ads keyword collector.
        
        Args:
            config_file: Path to google-ads.yaml config file
        """
        if config_file is None:
            config_file = BASE_DIR / 'google-ads.yaml'
        
        self.config_file = config_file
        self.client = None
        self._initialize_client()
    
    def _initialize_client(self):
        """Initialize the Google Ads client."""
        try:
            self.client = GoogleAdsClient.load_from_storage(str(self.config_file))
            logger.info("Google Ads client initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize Google Ads client: {e}")
            raise
    
    def get_keyword_ideas(self, 
                         seed_keywords: List[str],
                         language_id: str = "1000",  # English
                         location_ids: List[str] = None,
                         customer_id: Optional[str] = None) -> List[Dict]:
        """
        Get keyword ideas using the KeywordPlanIdeaService.
        
        Args:
            seed_keywords: List of seed keywords to generate ideas from
            language_id: Language ID (1000 = English)
            location_ids: List of location IDs (e.g., ["2840"] for United States)
            customer_id: Google Ads customer ID (optional)
            
        Returns:
            List of keyword data dictionaries
        """
        if location_ids is None:
            location_ids = ["2840"]  # United States by default
        
        logger.info(f"Getting keyword ideas for: {seed_keywords}")
        
        try:
            keyword_plan_idea_service = self.client.get_service("KeywordPlanIdeaService")
            
            # Create keyword plan network
            keyword_plan_network = self.client.get_type("KeywordPlanNetworkEnum").KeywordPlanNetwork.GOOGLE_SEARCH
            
            # Create keyword plan historical metrics request
            request = self.client.get_type("GenerateKeywordIdeasRequest")
            request.customer_id = customer_id or "1234567890"  # Replace with actual customer ID
            request.language = f"languageConstants/{language_id}"
            request.geo_target_constants = [f"geoTargetConstants/{loc_id}" for loc_id in location_ids]
            request.keyword_plan_network = keyword_plan_network
            
            # Add seed keywords
            for keyword in seed_keywords:
                keyword_text = self.client.get_type("KeywordPlanHistoricalMetrics")
                keyword_text.text = keyword
                keyword_text.match_type = self.client.get_type("KeywordMatchTypeEnum").KeywordMatchType.EXACT
                request.keyword_texts.append(keyword_text)
            
            # Generate keyword ideas
            response = keyword_plan_idea_service.generate_keyword_ideas(request)
            
            keywords = []
            for result in response.results:
                keyword_data = {
                    'keyword': result.text,
                    'avg_monthly_searches': result.keyword_idea_metrics.avg_monthly_searches,
                    'competition': result.keyword_idea_metrics.competition.name,
                    'competition_index': result.keyword_idea_metrics.competition_index,
                    'low_top_of_page_bid_micros': result.keyword_idea_metrics.low_top_of_page_bid_micros,
                    'high_top_of_page_bid_micros': result.keyword_idea_metrics.high_top_of_page_bid_micros,
                    'source': 'google_ads_api',
                    'seed_keywords': seed_keywords,
                    'timestamp': datetime.now().isoformat()
                }
                keywords.append(keyword_data)
            
            logger.info(f"Retrieved {len(keywords)} keyword ideas")
            return keywords
            
        except GoogleAdsException as ex:
            logger.error(f"Google Ads API error: {ex}")
            for error in ex.failure.errors:
                logger.error(f"  - {error.message}")
            return []
        except Exception as e:
            logger.error(f"Error getting keyword ideas: {e}")
            return []
    
    def get_keyword_historical_metrics(self,
                                     keywords: List[str],
                                     customer_id: Optional[str] = None) -> List[Dict]:
        """
        Get historical metrics for specific keywords.
        
        Args:
            keywords: List of keywords to get metrics for
            customer_id: Google Ads customer ID (optional)
            
        Returns:
            List of keyword metrics dictionaries
        """
        logger.info(f"Getting historical metrics for {len(keywords)} keywords")
        
        try:
            keyword_plan_idea_service = self.client.get_service("KeywordPlanIdeaService")
            
            # Create request
            request = self.client.get_type("GenerateKeywordHistoricalMetricsRequest")
            request.customer_id = customer_id or "1234567890"
            
            # Add keywords
            for keyword in keywords:
                keyword_text = self.client.get_type("KeywordPlanHistoricalMetrics")
                keyword_text.text = keyword
                keyword_text.match_type = self.client.get_type("KeywordMatchTypeEnum").KeywordMatchType.EXACT
                request.keyword_texts.append(keyword_text)
            
            # Get historical metrics
            response = keyword_plan_idea_service.generate_keyword_historical_metrics(request)
            
            metrics = []
            for result in response.results:
                metric_data = {
                    'keyword': result.text,
                    'avg_monthly_searches': result.keyword_metrics.avg_monthly_searches,
                    'competition': result.keyword_metrics.competition.name,
                    'competition_index': result.keyword_metrics.competition_index,
                    'low_top_of_page_bid_micros': result.keyword_metrics.low_top_of_page_bid_micros,
                    'high_top_of_page_bid_micros': result.keyword_metrics.high_top_of_page_bid_micros,
                    'source': 'google_ads_api',
                    'timestamp': datetime.now().isoformat()
                }
                metrics.append(metric_data)
            
            logger.info(f"Retrieved metrics for {len(metrics)} keywords")
            return metrics
            
        except GoogleAdsException as ex:
            logger.error(f"Google Ads API error: {ex}")
            for error in ex.failure.errors:
                logger.error(f"  - {error.message}")
            return []
        except Exception as e:
            logger.error(f"Error getting historical metrics: {e}")
            return []
    
    def get_related_keywords(self,
                           seed_keyword: str,
                           customer_id: Optional[str] = None) -> List[Dict]:
        """
        Get related keywords for a seed keyword.
        
        Args:
            seed_keyword: The seed keyword to find related terms for
            customer_id: Google Ads customer ID (optional)
            
        Returns:
            List of related keyword dictionaries
        """
        logger.info(f"Getting related keywords for: {seed_keyword}")
        
        # Use keyword ideas with the seed keyword
        return self.get_keyword_ideas([seed_keyword], customer_id=customer_id)
    
    def save_keywords_to_file(self, keywords: List[Dict], filename: str = None):
        """
        Save keyword data to a JSON file.
        
        Args:
            keywords: List of keyword dictionaries
            filename: Output filename (optional)
        """
        if filename is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"google_ads_keywords_{timestamp}.json"
        
        output_path = BASE_DIR / 'data_warehouse' / 'keywords' / filename
        
        with open(output_path, 'w') as f:
            json.dump(keywords, f, indent=2)
        
        logger.info(f"Saved {len(keywords)} keywords to {output_path}")
        return output_path
    
    def collect_comprehensive_data(self,
                                 seed_keywords: List[str],
                                 save_to_file: bool = True) -> Dict[str, Any]:
        """
        Collect comprehensive keyword data for seed keywords.
        
        Args:
            seed_keywords: List of seed keywords
            save_to_file: Whether to save results to file
            
        Returns:
            Dictionary containing all collected data
        """
        logger.info(f"Starting comprehensive keyword data collection for: {seed_keywords}")
        
        results = {
            'seed_keywords': seed_keywords,
            'collection_timestamp': datetime.now().isoformat(),
            'keyword_ideas': [],
            'historical_metrics': [],
            'related_keywords': {}
        }
        
        # Get keyword ideas
        results['keyword_ideas'] = self.get_keyword_ideas(seed_keywords)
        
        # Get historical metrics for seed keywords
        results['historical_metrics'] = self.get_keyword_historical_metrics(seed_keywords)
        
        # Get related keywords for each seed keyword
        for seed_keyword in seed_keywords:
            results['related_keywords'][seed_keyword] = self.get_related_keywords(seed_keyword)
        
        # Save to file if requested
        if save_to_file:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"comprehensive_keywords_{timestamp}.json"
            self.save_keywords_to_file(results, filename)
        
        logger.info("Comprehensive keyword data collection completed")
        return results

# Example usage and testing
if __name__ == "__main__":
    # Example usage
    collector = GoogleAdsKeywordCollector()
    
    # Test with some sample keywords
    seed_keywords = ["pdf merger", "online tools", "file converter"]
    
    # Collect comprehensive data
    results = collector.collect_comprehensive_data(seed_keywords)
    
    print(f"Collected data for {len(seed_keywords)} seed keywords")
    print(f"Found {len(results['keyword_ideas'])} keyword ideas")
    print(f"Retrieved metrics for {len(results['historical_metrics'])} keywords")
