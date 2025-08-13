#!/usr/bin/env python3
"""
Test Script for New Organic Content Generation System

This script demonstrates the new content generation pipeline that doesn't
rely on Google Ads API. It shows how to collect organic keywords and
generate SEO-optimized content.
"""

import sys
from pathlib import Path

# Add the parent directory to the path so we can import our modules
sys.path.append(str(Path(__file__).parent.parent))

from data_collection.organic_keyword_collector import OrganicKeywordCollector
from content_generation.content_generator import ContentGenerator, ContentTopic
from utils.logger import get_logger

logger = get_logger(__name__)

def test_organic_keyword_collection():
    """Test the organic keyword collection system."""
    print("🔍 Testing Organic Keyword Collection...")
    
    # Initialize collector
    collector = OrganicKeywordCollector()
    
    # Test seed keywords relevant to your online tools
    seed_keywords = [
        "pdf merger",
        "file converter",
        "text case converter"
    ]
    
    print(f"Seed keywords: {seed_keywords}")
    
    # Collect keywords from Google suggestions only (fastest)
    keywords_data = collector.collect_comprehensive_keywords(
        seed_keywords=seed_keywords,
        sources=['google_suggestions']  # Start with just suggestions
    )
    
    print(f"✅ Collected {keywords_data['total_keywords']} keywords")
    print(f"Sources used: {keywords_data['sources_used']}")
    
    # Show some examples
    print("\n📝 Sample keywords collected:")
    for i, kw in enumerate(keywords_data['keywords'][:5], 1):
        print(f"  {i}. {kw['keyword']} (from {kw['source']})")
    
    return keywords_data

def test_content_generation():
    """Test the content generation system."""
    print("\n📝 Testing Content Generation...")
    
    # Initialize generator
    generator = ContentGenerator()
    
    # Test keywords
    test_keywords = [
        "pdf merger online",
        "file converter tool",
        "text case converter"
    ]
    
    print(f"Test keywords: {test_keywords}")
    
    # Generate content for each keyword
    articles = []
    for keyword in test_keywords:
        print(f"\nGenerating content for: {keyword}")
        
        # Create content topic
        topic = ContentTopic(
            keyword=keyword,
            source="test",
            timestamp="2024-12-01T00:00:00"
        )
        
        # Generate article
        article = generator.generate_full_article(topic)
        articles.append(article)
        
        print(f"✅ Generated: {article['title']}")
        print(f"   Word count: {article['word_count']}")
        print(f"   Content type: {article['content_type']}")
        print(f"   Search intent: {article['search_intent']}")
    
    return articles

def test_keyword_analysis():
    """Test the keyword analysis system."""
    print("\n🔍 Testing Keyword Analysis...")
    
    # Initialize generator
    generator = ContentGenerator()
    
    # Test keywords
    test_keywords = [
        "how to merge pdf files",
        "best pdf converter online",
        "free file merger tool",
        "pdf merger vs splitter"
    ]
    
    print(f"Analyzing keywords: {test_keywords}")
    
    # Analyze each keyword
    for keyword in test_keywords:
        analysis = generator.analyze_keyword_potential(keyword)
        
        print(f"\n📊 Analysis for: {keyword}")
        print(f"   Word count: {analysis['word_count']}")
        print(f"   Search intent: {analysis['search_intent']}")
        print(f"   Content type: {analysis['content_type']}")
        print(f"   Target audience: {analysis['target_audience']}")
        print(f"   SEO potential: {analysis['seo_potential']}")
        print(f"   Competition level: {analysis['competition_level']}")

def main():
    """Run all tests."""
    print("🚀 Testing New Organic Content Generation System")
    print("=" * 60)
    
    try:
        # Test 1: Keyword Collection
        keywords_data = test_organic_keyword_collection()
        
        # Test 2: Content Generation
        articles = test_content_generation()
        
        # Test 3: Keyword Analysis
        test_keyword_analysis()
        
        print("\n" + "=" * 60)
        print("✅ All tests completed successfully!")
        print(f"📊 Results:")
        print(f"   - Keywords collected: {keywords_data['total_keywords']}")
        print(f"   - Articles generated: {len(articles)}")
        print(f"   - Sources used: {', '.join(keywords_data['sources_used'])}")
        
        print("\n🎯 Next Steps:")
        print("1. Review the generated content in data_warehouse/articles/")
        print("2. Customize the content for your brand voice")
        print("3. Run the full pipeline: python scripts/generate_content.py generate -k 'your keywords'")
        print("4. Set up automated content generation")
        
    except Exception as e:
        print(f"\n❌ Test failed: {e}")
        logger.error(f"Test failed: {e}")
        return False
    
    return True

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)
