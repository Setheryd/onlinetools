#!/usr/bin/env python3
"""
Content Generation Pipeline

This script orchestrates the complete content generation pipeline:
1. Collect organic keywords from multiple sources
2. Analyze and filter keywords for content potential
3. Generate SEO-optimized articles and blog posts
4. Save content to the data warehouse

This replaces the old Google Ads-dependent approach with a focus on
organic keyword research and content creation.
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

from data_collection.organic_keyword_collector import OrganicKeywordCollector
from content_generation.content_generator import ContentGenerator, ContentTopic
from data_collection.data_warehouse_manager import DataWarehouseManager
from config.settings import BASE_DIR
from utils.logger import get_logger

logger = get_logger(__name__)

class ContentPipeline:
    """Orchestrates the complete content generation pipeline."""
    
    def __init__(self):
        """Initialize the content pipeline."""
        self.keyword_collector = OrganicKeywordCollector()
        self.content_generator = ContentGenerator()
        self.warehouse = DataWarehouseManager()
        
        logger.info("Content pipeline initialized")
    
    def collect_keywords(self, 
                        seed_keywords: List[str],
                        sources: List[str] = None,
                        save_to_file: bool = True) -> Dict[str, Any]:
        """
        Collect keywords from organic sources.
        
        Args:
            seed_keywords: List of seed keywords to expand
            sources: List of sources to use
            save_to_file: Whether to save results to file
            
        Returns:
            Dictionary containing collected keyword data
        """
        logger.info(f"Starting keyword collection for {len(seed_keywords)} seed keywords")
        
        # Collect keywords from organic sources
        keywords_data = self.keyword_collector.collect_comprehensive_keywords(
            seed_keywords=seed_keywords,
            sources=sources
        )
        
        # Save to file if requested
        if save_to_file:
            filepath = self.keyword_collector.save_keywords_to_file(keywords_data)
            logger.info(f"Keywords saved to: {filepath}")
        
        # Store in data warehouse
        self.warehouse.store_keywords(keywords_data)
        
        return keywords_data
    
    def filter_keywords_for_content(self, 
                                   keywords_data: Dict[str, Any],
                                   min_word_count: int = 2,
                                   max_word_count: int = 6,
                                   exclude_words: List[str] = None) -> List[ContentTopic]:
        """
        Filter keywords to find the best content opportunities.
        
        Args:
            keywords_data: The collected keyword data
            min_word_count: Minimum words in keyword
            max_word_count: Maximum words in keyword
            exclude_words: Words to exclude from keywords
            
        Returns:
            List of filtered content topics
        """
        if exclude_words is None:
            exclude_words = ['free', 'online', 'tool', 'download']
        
        logger.info("Filtering keywords for content potential")
        
        content_topics = []
        keywords = keywords_data.get('keywords', [])
        
        for kw_data in keywords:
            keyword = kw_data.get('keyword', '')
            word_count = len(keyword.split())
            
            # Apply filters
            if word_count < min_word_count or word_count > max_word_count:
                continue
            
            # Check for excluded words
            if any(exclude_word in keyword.lower() for exclude_word in exclude_words):
                continue
            
            # Create content topic
            topic = ContentTopic(
                keyword=keyword,
                search_volume=kw_data.get('search_volume', 'unknown'),
                difficulty=kw_data.get('difficulty', 'unknown'),
                source=kw_data.get('source', 'unknown'),
                seed_keyword=kw_data.get('seed_keyword', ''),
                type=kw_data.get('type', 'keyword'),
                timestamp=kw_data.get('timestamp', '')
            )
            
            content_topics.append(topic)
        
        logger.info(f"Filtered {len(content_topics)} keywords for content generation")
        return content_topics
    
    def generate_content(self, 
                        topics: List[ContentTopic],
                        max_articles: int = 10) -> List[Dict[str, Any]]:
        """
        Generate content for the filtered topics.
        
        Args:
            topics: List of content topics
            max_articles: Maximum number of articles to generate
            
        Returns:
            List of generated articles
        """
        logger.info(f"Generating content for {min(len(topics), max_articles)} topics")
        
        # Limit the number of articles to generate
        topics_to_process = topics[:max_articles]
        
        # Generate content
        articles = self.content_generator.generate_content_batch(topics_to_process)
        
        # Store articles in data warehouse
        for article in articles:
            self.warehouse.store_article(article)
        
        logger.info(f"Generated {len(articles)} articles successfully")
        return articles
    
    def run_complete_pipeline(self, 
                             seed_keywords: List[str],
                             sources: List[str] = None,
                             max_articles: int = 10,
                             save_keywords: bool = True) -> Dict[str, Any]:
        """
        Run the complete content generation pipeline.
        
        Args:
            seed_keywords: List of seed keywords to start with
            sources: List of keyword sources to use
            max_articles: Maximum number of articles to generate
            save_keywords: Whether to save keyword data to files
            
        Returns:
            Dictionary containing pipeline results
        """
        logger.info("Starting complete content generation pipeline")
        
        start_time = time.time()
        
        # Step 1: Collect keywords
        logger.info("Step 1: Collecting keywords from organic sources")
        keywords_data = self.collect_keywords(
            seed_keywords=seed_keywords,
            sources=sources,
            save_to_file=save_keywords
        )
        
        # Step 2: Filter keywords for content potential
        logger.info("Step 2: Filtering keywords for content potential")
        content_topics = self.filter_keywords_for_content(keywords_data)
        
        # Step 3: Generate content
        logger.info("Step 3: Generating SEO-optimized content")
        articles = self.generate_content(content_topics, max_articles)
        
        # Calculate pipeline statistics
        end_time = time.time()
        pipeline_time = end_time - start_time
        
        results = {
            'pipeline_time_seconds': pipeline_time,
            'seed_keywords': seed_keywords,
            'total_keywords_collected': keywords_data.get('total_keywords', 0),
            'keywords_filtered_for_content': len(content_topics),
            'articles_generated': len(articles),
            'sources_used': keywords_data.get('sources_used', []),
            'timestamp': datetime.now().isoformat(),
            'articles': articles
        }
        
        logger.info(f"Pipeline completed in {pipeline_time:.2f} seconds")
        logger.info(f"Generated {len(articles)} articles from {len(content_topics)} filtered keywords")
        
        return results
    
    def save_pipeline_results(self, results: Dict[str, Any], filename: str = None) -> str:
        """
        Save pipeline results to a JSON file.
        
        Args:
            results: The pipeline results dictionary
            filename: Optional filename (default: auto-generated)
            
        Returns:
            Path to the saved file
        """
        if filename is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"content_pipeline_results_{timestamp}.json"
        
        filepath = BASE_DIR / 'data_warehouse' / 'pipeline_results' / filename
        
        # Ensure directory exists
        filepath.parent.mkdir(parents=True, exist_ok=True)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        
        logger.info(f"Pipeline results saved to: {filepath}")
        return str(filepath)

@click.group()
def cli():
    """Content Generation Pipeline CLI"""
    pass

@cli.command()
@click.option('--keywords', '-k', multiple=True, help='Seed keywords to start with')
@click.option('--file', '-f', help='File containing seed keywords (one per line)')
@click.option('--sources', '-s', multiple=True, 
              default=['google_suggestions', 'related_searches', 'people_also_ask'],
              help='Keyword sources to use')
@click.option('--max-articles', '-m', default=10, help='Maximum articles to generate')
@click.option('--save-keywords/--no-save-keywords', default=True, help='Save keyword data to files')
@click.option('--output', '-o', help='Output file for pipeline results')
def generate(keywords, file, sources, max_articles, save_keywords, output):
    """Generate content from seed keywords."""
    
    # Get seed keywords
    seed_keywords = list(keywords)
    
    if file:
        try:
            with open(file, 'r', encoding='utf-8') as f:
                file_keywords = [line.strip() for line in f if line.strip()]
                seed_keywords.extend(file_keywords)
        except Exception as e:
            logger.error(f"Error reading keyword file: {e}")
            return
    
    if not seed_keywords:
        logger.error("No seed keywords provided. Use --keywords or --file option.")
        return
    
    # Remove duplicates
    seed_keywords = list(set(seed_keywords))
    
    logger.info(f"Starting content generation with {len(seed_keywords)} seed keywords")
    
    # Initialize pipeline
    pipeline = ContentPipeline()
    
    # Run pipeline
    results = pipeline.run_complete_pipeline(
        seed_keywords=seed_keywords,
        sources=list(sources),
        max_articles=max_articles,
        save_keywords=save_keywords
    )
    
    # Save results
    if output:
        filepath = pipeline.save_pipeline_results(results, output)
    else:
        filepath = pipeline.save_pipeline_results(results)
    
    # Print summary
    print("\n" + "="*50)
    print("CONTENT GENERATION PIPELINE RESULTS")
    print("="*50)
    print(f"Seed Keywords: {len(seed_keywords)}")
    print(f"Keywords Collected: {results['total_keywords_collected']}")
    print(f"Keywords Filtered: {results['keywords_filtered_for_content']}")
    print(f"Articles Generated: {results['articles_generated']}")
    print(f"Pipeline Time: {results['pipeline_time_seconds']:.2f} seconds")
    print(f"Results Saved: {filepath}")
    print("="*50)

@cli.command()
@click.option('--keywords', '-k', multiple=True, help='Keywords to analyze')
@click.option('--file', '-f', help='File containing keywords to analyze')
def analyze(keywords, file):
    """Analyze keywords for content potential."""
    
    # Get keywords
    keywords_to_analyze = list(keywords)
    
    if file:
        try:
            with open(file, 'r', encoding='utf-8') as f:
                file_keywords = [line.strip() for line in f if line.strip()]
                keywords_to_analyze.extend(file_keywords)
        except Exception as e:
            logger.error(f"Error reading keyword file: {e}")
            return
    
    if not keywords_to_analyze:
        logger.error("No keywords provided. Use --keywords or --file option.")
        return
    
    # Remove duplicates
    keywords_to_analyze = list(set(keywords_to_analyze))
    
    logger.info(f"Analyzing {len(keywords_to_analyze)} keywords")
    
    # Initialize content generator
    generator = ContentGenerator()
    
    # Analyze each keyword
    analyses = []
    for keyword in keywords_to_analyze:
        analysis = generator.analyze_keyword_potential(keyword)
        analyses.append(analysis)
        
        # Print analysis
        print(f"\nKeyword: {keyword}")
        print(f"  Word Count: {analysis['word_count']}")
        print(f"  Search Intent: {analysis['search_intent']}")
        print(f"  Content Type: {analysis['content_type']}")
        print(f"  Target Audience: {analysis['target_audience']}")
        print(f"  SEO Potential: {analysis['seo_potential']}")
        print(f"  Competition Level: {analysis['competition_level']}")
    
    # Save analyses
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"keyword_analyses_{timestamp}.json"
    filepath = BASE_DIR / 'data_warehouse' / 'analyses' / filename
    
    # Ensure directory exists
    filepath.parent.mkdir(parents=True, exist_ok=True)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(analyses, f, indent=2, ensure_ascii=False)
    
    logger.info(f"Analyses saved to: {filepath}")

@cli.command()
@click.option('--keywords', '-k', multiple=True, help='Seed keywords to collect')
@click.option('--file', '-f', help='File containing seed keywords')
@click.option('--sources', '-s', multiple=True, 
              default=['google_suggestions', 'related_searches', 'people_also_ask'],
              help='Sources to collect from')
@click.option('--output', '-o', help='Output file for keywords')
def collect(keywords, file, sources, output):
    """Collect keywords from organic sources only."""
    
    # Get seed keywords
    seed_keywords = list(keywords)
    
    if file:
        try:
            with open(file, 'r', encoding='utf-8') as f:
                file_keywords = [line.strip() for line in f if line.strip()]
                seed_keywords.extend(file_keywords)
        except Exception as e:
            logger.error(f"Error reading keyword file: {e}")
            return
    
    if not seed_keywords:
        logger.error("No seed keywords provided. Use --keywords or --file option.")
        return
    
    # Remove duplicates
    seed_keywords = list(set(seed_keywords))
    
    logger.info(f"Collecting keywords for {len(seed_keywords)} seed keywords")
    
    # Initialize collector
    collector = OrganicKeywordCollector()
    
    # Collect keywords
    keywords_data = collector.collect_comprehensive_keywords(
        seed_keywords=seed_keywords,
        sources=list(sources)
    )
    
    # Save keywords
    if output:
        filepath = collector.save_keywords_to_file(keywords_data, output)
    else:
        filepath = collector.save_keywords_to_file(keywords_data)
    
    # Print summary
    print("\n" + "="*50)
    print("KEYWORD COLLECTION RESULTS")
    print("="*50)
    print(f"Seed Keywords: {len(seed_keywords)}")
    print(f"Keywords Collected: {keywords_data['total_keywords']}")
    print(f"Sources Used: {', '.join(keywords_data['sources_used'])}")
    print(f"Results Saved: {filepath}")
    print("="*50)

if __name__ == '__main__':
    cli()
