#!/usr/bin/env python3
"""
Keyword Data Collection Orchestrator

This script orchestrates the collection of keyword data from multiple sources
and stores it in the data warehouse for content generation.
"""

import sys
import time
import json
import click
from pathlib import Path
from typing import List, Dict, Optional, Any
from datetime import datetime

# Add the parent directory to the path so we can import our modules
sys.path.append(str(Path(__file__).parent.parent))

from data_collection.google_ads_collector import GoogleAdsKeywordCollector
from data_collection.google_trends_collector import GoogleTrendsCollector
from data_collection.data_warehouse_manager import DataWarehouseManager
from config.settings import BASE_DIR
from utils.logger import get_logger

logger = get_logger(__name__)

class KeywordCollectionOrchestrator:
    """Orchestrates keyword data collection from multiple sources."""
    
    def __init__(self):
        """Initialize the orchestrator with all collectors."""
        self.warehouse = DataWarehouseManager()
        self.google_ads_collector = None
        self.google_trends_collector = None
        
        # Initialize collectors based on configuration
        self._initialize_collectors()
    
    def _initialize_collectors(self):
        """Initialize data collectors based on available configuration."""
        try:
            # Initialize Google Trends collector (always available)
            self.google_trends_collector = GoogleTrendsCollector()
            logger.info("Google Trends collector initialized")
            
            # Try to initialize Google Ads collector
            try:
                self.google_ads_collector = GoogleAdsKeywordCollector()
                logger.info("Google Ads collector initialized")
            except Exception as e:
                logger.warning(f"Google Ads collector not available: {e}")
                logger.info("Continuing with Google Trends only")
                
        except Exception as e:
            logger.error(f"Error initializing collectors: {e}")
            raise
    
    def collect_from_google_trends(self, 
                                  keywords: List[str],
                                  timeframes: List[str] = None) -> Dict:
        """
        Collect keyword data from Google Trends.
        
        Args:
            keywords: List of keywords to analyze
            timeframes: List of timeframes to analyze
            
        Returns:
            Dictionary containing collected trend data
        """
        if not self.google_trends_collector:
            logger.error("Google Trends collector not available")
            return {}
        
        logger.info(f"Collecting Google Trends data for {len(keywords)} keywords")
        
        try:
            # Collect comprehensive trend data
            trends_data = self.google_trends_collector.collect_comprehensive_trends(
                keywords=keywords,
                timeframes=timeframes,
                save_to_file=True
            )
            
            # Store in data warehouse
            if trends_data:
                self.warehouse.store_trends(trends_data)
                logger.info("Google Trends data stored in warehouse")
            
            return trends_data
            
        except Exception as e:
            logger.error(f"Error collecting Google Trends data: {e}")
            return {}
    
    def collect_from_google_ads(self, 
                               keywords: List[str],
                               customer_id: Optional[str] = None) -> Dict:
        """
        Collect keyword data from Google Ads API.
        
        Args:
            keywords: List of keywords to analyze
            customer_id: Google Ads customer ID (optional)
            
        Returns:
            Dictionary containing collected keyword data
        """
        if not self.google_ads_collector:
            logger.error("Google Ads collector not available")
            return {}
        
        logger.info(f"Collecting Google Ads data for {len(keywords)} keywords")
        
        try:
            # Collect comprehensive keyword data
            ads_data = self.google_ads_collector.collect_comprehensive_data(
                seed_keywords=keywords,
                save_to_file=True
            )
            
            # Store in data warehouse
            if ads_data and ads_data.get('keyword_ideas'):
                self.warehouse.store_keywords(ads_data['keyword_ideas'])
                logger.info("Google Ads keyword data stored in warehouse")
            
            return ads_data
            
        except Exception as e:
            logger.error(f"Error collecting Google Ads data: {e}")
            return {}
    
    def collect_comprehensive_data(self,
                                  keywords: List[str],
                                  sources: List[str] = None,
                                  timeframes: List[str] = None) -> Dict[str, Any]:
        """
        Collect comprehensive keyword data from all available sources.
        
        Args:
            keywords: List of keywords to analyze
            sources: List of sources to collect from (default: all available)
            timeframes: List of timeframes for trend analysis
            
        Returns:
            Dictionary containing all collected data
        """
        if sources is None:
            sources = ['google_trends', 'google_ads']
        
        if timeframes is None:
            timeframes = ['today 12-m', 'today 3-m']
        
        logger.info(f"Starting comprehensive keyword collection for: {keywords}")
        logger.info(f"Sources: {sources}")
        logger.info(f"Timeframes: {timeframes}")
        
        results = {
            'collection_timestamp': datetime.now().isoformat(),
            'keywords': keywords,
            'sources': sources,
            'timeframes': timeframes,
            'google_trends_data': {},
            'google_ads_data': {},
            'summary': {}
        }
        
        # Collect from Google Trends
        if 'google_trends' in sources:
            logger.info("Collecting from Google Trends...")
            trends_data = self.collect_from_google_trends(keywords, timeframes)
            results['google_trends_data'] = trends_data
            
            # Add summary
            if trends_data:
                results['summary']['trends'] = {
                    'related_queries_count': sum(
                        len(timeframe_data.get('rising_queries', [])) + 
                        len(timeframe_data.get('top_queries', []))
                        for keyword_data in trends_data.get('related_queries', {}).values()
                        for timeframe_data in keyword_data.values()
                    ),
                    'trending_searches_count': len(trends_data.get('trending_searches', [])),
                    'realtime_trending_count': len(trends_data.get('realtime_trending', []))
                }
        
        # Collect from Google Ads
        if 'google_ads' in sources:
            logger.info("Collecting from Google Ads...")
            ads_data = self.collect_from_google_ads(keywords)
            results['google_ads_data'] = ads_data
            
            # Add summary
            if ads_data:
                results['summary']['ads'] = {
                    'keyword_ideas_count': len(ads_data.get('keyword_ideas', [])),
                    'historical_metrics_count': len(ads_data.get('historical_metrics', [])),
                    'related_keywords_count': sum(
                        len(related) for related in ads_data.get('related_keywords', {}).values()
                    )
                }
        
        # Save comprehensive results
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"comprehensive_collection_{timestamp}.json"
        output_path = BASE_DIR / 'data_warehouse' / 'keywords' / filename
        
        with open(output_path, 'w') as f:
            json.dump(results, f, indent=2)
        
        logger.info(f"Comprehensive collection results saved to: {output_path}")
        logger.info("Keyword collection completed successfully")
        
        return results
    
    def get_trending_keywords_for_content(self, 
                                        days: int = 7, 
                                        limit: int = 20) -> List[Dict]:
        """
        Get trending keywords suitable for content generation.
        
        Args:
            days: Number of days to look back
            limit: Maximum number of keywords to return
            
        Returns:
            List of trending keyword dictionaries
        """
        logger.info(f"Getting trending keywords for content generation (last {days} days)")
        
        # Get trending keywords from warehouse
        trending_keywords = self.warehouse.get_trending_keywords(days=days, limit=limit)
        
        # Filter and rank by potential for content generation
        content_keywords = []
        for keyword_data in trending_keywords:
            # Calculate content potential score
            search_volume = keyword_data.get('avg_monthly_searches', 0)
            frequency = keyword_data.get('frequency', 1)
            
            # Simple scoring algorithm
            content_score = search_volume * frequency
            
            content_keywords.append({
                **keyword_data,
                'content_score': content_score,
                'content_potential': 'high' if content_score > 50000 else 'medium' if content_score > 10000 else 'low'
            })
        
        # Sort by content score
        content_keywords.sort(key=lambda x: x['content_score'], reverse=True)
        
        logger.info(f"Found {len(content_keywords)} keywords suitable for content generation")
        return content_keywords
    
    def generate_content_suggestions(self, 
                                   keywords: List[str],
                                   max_suggestions: int = 10) -> List[Dict]:
        """
        Generate content suggestions based on keyword data.
        
        Args:
            keywords: List of seed keywords
            max_suggestions: Maximum number of suggestions to generate
            
        Returns:
            List of content suggestion dictionaries
        """
        logger.info(f"Generating content suggestions for {len(keywords)} keywords")
        
        suggestions = []
        
        for keyword in keywords:
            # Get keyword suggestions from warehouse
            keyword_suggestions = self.warehouse.get_keyword_suggestions(keyword, limit=5)
            
            for suggestion in keyword_suggestions:
                suggested_keyword = suggestion.get('keyword', '')
                value = suggestion.get('value', 0)
                
                # Generate content ideas
                content_ideas = [
                    f"How to {suggested_keyword}",
                    f"Best {suggested_keyword} tools",
                    f"{suggested_keyword} guide",
                    f"Top {suggested_keyword} solutions",
                    f"{suggested_keyword} tutorial"
                ]
                
                for idea in content_ideas:
                    suggestions.append({
                        'keyword': suggested_keyword,
                        'content_idea': idea,
                        'trend_value': value,
                        'source_keyword': keyword,
                        'content_type': 'how_to' if 'how to' in idea.lower() else 'guide' if 'guide' in idea.lower() else 'tutorial' if 'tutorial' in idea.lower() else 'review',
                        'priority': 'high' if value > 80 else 'medium' if value > 50 else 'low'
                    })
        
        # Sort by trend value and limit results
        suggestions.sort(key=lambda x: x['trend_value'], reverse=True)
        suggestions = suggestions[:max_suggestions]
        
        logger.info(f"Generated {len(suggestions)} content suggestions")
        return suggestions
    
    def cleanup(self):
        """Clean up resources."""
        if self.warehouse:
            self.warehouse.close()

@click.group()
def cli():
    """Keyword Data Collection Tool"""
    pass

@cli.command()
@click.option('--keywords', '-k', multiple=True, help='Keywords to collect data for')
@click.option('--keywords-file', '-f', type=click.Path(exists=True), help='File containing keywords (one per line)')
@click.option('--sources', '-s', multiple=True, default=['google_trends'], help='Data sources to use')
@click.option('--timeframes', '-t', multiple=True, default=['today 12-m'], help='Timeframes for trend analysis')
@click.option('--output', '-o', help='Output file for results')
def collect(keywords, keywords_file, sources, timeframes, output):
    """Collect keyword data from specified sources."""
    orchestrator = KeywordCollectionOrchestrator()
    
    try:
        # Load keywords
        keyword_list = list(keywords)
        if keywords_file:
            with open(keywords_file, 'r') as f:
                file_keywords = [line.strip() for line in f if line.strip()]
                keyword_list.extend(file_keywords)
        
        if not keyword_list:
            click.echo("❌ No keywords provided. Use --keywords or --keywords-file")
            return
        
        click.echo(f"🔍 Collecting data for {len(keyword_list)} keywords: {keyword_list}")
        
        # Collect data
        results = orchestrator.collect_comprehensive_data(
            keywords=keyword_list,
            sources=list(sources),
            timeframes=list(timeframes)
        )
        
        # Save results if output file specified
        if output:
            with open(output, 'w') as f:
                json.dump(results, f, indent=2)
            click.echo(f"✅ Results saved to: {output}")
        
        # Display summary
        click.echo("\n📊 Collection Summary:")
        if results.get('summary', {}).get('trends'):
            trends = results['summary']['trends']
            click.echo(f"  - Google Trends: {trends.get('related_queries_count', 0)} queries, {trends.get('trending_searches_count', 0)} trending")
        
        if results.get('summary', {}).get('ads'):
            ads = results['summary']['ads']
            click.echo(f"  - Google Ads: {ads.get('keyword_ideas_count', 0)} ideas, {ads.get('historical_metrics_count', 0)} metrics")
        
        click.echo("✅ Collection completed successfully!")
        
    except Exception as e:
        click.echo(f"❌ Error during collection: {e}")
    finally:
        orchestrator.cleanup()

@cli.command()
@click.option('--days', '-d', default=7, help='Number of days to look back')
@click.option('--limit', '-l', default=20, help='Maximum number of keywords')
def trending(days, limit):
    """Get trending keywords suitable for content generation."""
    orchestrator = KeywordCollectionOrchestrator()
    
    try:
        trending_keywords = orchestrator.get_trending_keywords_for_content(days=days, limit=limit)
        
        click.echo(f"🔥 Trending Keywords (last {days} days):")
        click.echo("=" * 80)
        
        for i, keyword_data in enumerate(trending_keywords, 1):
            click.echo(f"{i:2d}. {keyword_data['keyword']}")
            click.echo(f"     📊 Monthly searches: {keyword_data.get('avg_monthly_searches', 0):,}")
            click.echo(f"     📈 Frequency: {keyword_data.get('frequency', 0)}")
            click.echo(f"     🎯 Content potential: {keyword_data.get('content_potential', 'unknown')}")
            click.echo()
        
    except Exception as e:
        click.echo(f"❌ Error getting trending keywords: {e}")
    finally:
        orchestrator.cleanup()

@cli.command()
@click.option('--keywords', '-k', multiple=True, required=True, help='Seed keywords')
@click.option('--max-suggestions', '-m', default=10, help='Maximum suggestions to generate')
def suggest(keywords, max_suggestions):
    """Generate content suggestions based on keywords."""
    orchestrator = KeywordCollectionOrchestrator()
    
    try:
        suggestions = orchestrator.generate_content_suggestions(
            keywords=list(keywords),
            max_suggestions=max_suggestions
        )
        
        click.echo(f"💡 Content Suggestions:")
        click.echo("=" * 80)
        
        for i, suggestion in enumerate(suggestions, 1):
            click.echo(f"{i:2d}. {suggestion['content_idea']}")
            click.echo(f"     🔑 Keyword: {suggestion['keyword']}")
            click.echo(f"     📊 Trend value: {suggestion['trend_value']}")
            click.echo(f"     📝 Type: {suggestion['content_type']}")
            click.echo(f"     ⭐ Priority: {suggestion['priority']}")
            click.echo()
        
    except Exception as e:
        click.echo(f"❌ Error generating suggestions: {e}")
    finally:
        orchestrator.cleanup()

@cli.command()
def setup():
    """Display setup instructions."""
    click.echo("🚀 Keyword Collection Setup Instructions")
    click.echo("=" * 50)
    click.echo()
    
    click.echo("1. Install Dependencies:")
    click.echo("   pip install -r requirements.txt")
    click.echo()
    
    click.echo("2. Configure Environment:")
    click.echo("   cp env.example .env")
    click.echo("   # Edit .env with your API keys")
    click.echo()
    
    click.echo("3. Set up Google Ads API (Optional):")
    click.echo("   python scripts/setup_google_ads.py instructions")
    click.echo("   python scripts/setup_google_ads.py setup")
    click.echo()
    
    click.echo("4. Test Collection:")
    click.echo("   python scripts/collect_keywords.py collect -k 'pdf merger' -k 'online tools'")
    click.echo()
    
    click.echo("5. Get Trending Keywords:")
    click.echo("   python scripts/collect_keywords.py trending")
    click.echo()
    
    click.echo("6. Generate Content Suggestions:")
    click.echo("   python scripts/collect_keywords.py suggest -k 'pdf merger' -k 'file converter'")
    click.echo()

if __name__ == '__main__':
    cli()
