#!/usr/bin/env python3
"""
Test Setup Script

This script tests all components of the keyword data collection system
to ensure everything is working correctly.
"""

import sys
import os
from pathlib import Path

# Add the parent directory to the path so we can import our modules
sys.path.append(str(Path(__file__).parent))

def test_imports():
    """Test that all required modules can be imported."""
    print("🔍 Testing imports...")
    
    try:
        from config.settings import BASE_DIR, DATABASE_URL
        print("✅ Config settings imported successfully")
    except Exception as e:
        print(f"❌ Failed to import config settings: {e}")
        return False
    
    try:
        from utils.logger import get_logger
        logger = get_logger(__name__)
        print("✅ Logger imported and working")
    except Exception as e:
        print(f"❌ Failed to import logger: {e}")
        return False
    
    try:
        from data_collection.google_trends_collector import GoogleTrendsCollector
        print("✅ Google Trends collector imported successfully")
    except Exception as e:
        print(f"❌ Failed to import Google Trends collector: {e}")
        return False
    
    try:
        from data_collection.data_warehouse_manager import DataWarehouseManager
        print("✅ Data warehouse manager imported successfully")
    except Exception as e:
        print(f"❌ Failed to import data warehouse manager: {e}")
        return False
    
    try:
        from data_collection.google_ads_collector import GoogleAdsKeywordCollector
        print("✅ Google Ads collector imported successfully")
    except Exception as e:
        print(f"⚠️  Google Ads collector not available (this is normal if not configured): {e}")
    
    return True

def test_google_trends():
    """Test Google Trends functionality."""
    print("\n🔍 Testing Google Trends...")
    
    try:
        from data_collection.google_trends_collector import GoogleTrendsCollector
        
        collector = GoogleTrendsCollector()
        print("✅ Google Trends collector initialized")
        
        # Test trending searches
        trending = collector.get_trending_searches()
        if trending:
            print(f"✅ Retrieved {len(trending)} trending searches")
        else:
            print("⚠️  No trending searches retrieved (this might be normal)")
        
        return True
        
    except Exception as e:
        print(f"❌ Google Trends test failed: {e}")
        return False

def test_data_warehouse():
    """Test data warehouse functionality."""
    print("\n🔍 Testing Data Warehouse...")
    
    try:
        from data_collection.data_warehouse_manager import DataWarehouseManager
        
        warehouse = DataWarehouseManager()
        print("✅ Data warehouse initialized")
        
        # Test storing some sample data
        sample_keywords = [
            {
                'keyword': 'test keyword',
                'avg_monthly_searches': 1000,
                'competition': 'LOW',
                'competition_index': 25,
                'source': 'test',
                'timestamp': '2024-01-01T00:00:00'
            }
        ]
        
        success = warehouse.store_keywords(sample_keywords)
        if success:
            print("✅ Sample data stored successfully")
        else:
            print("❌ Failed to store sample data")
            return False
        
        # Test retrieving data
        keywords = warehouse.get_keywords_by_source('test', limit=10)
        if keywords:
            print(f"✅ Retrieved {len(keywords)} keywords from warehouse")
        else:
            print("⚠️  No keywords retrieved from warehouse")
        
        warehouse.close()
        print("✅ Data warehouse connection closed")
        
        return True
        
    except Exception as e:
        print(f"❌ Data warehouse test failed: {e}")
        return False

def test_google_ads():
    """Test Google Ads functionality (if configured)."""
    print("\n🔍 Testing Google Ads...")
    
    try:
        from data_collection.google_ads_collector import GoogleAdsKeywordCollector
        
        collector = GoogleAdsKeywordCollector()
        print("✅ Google Ads collector initialized")
        
        # Test with a simple keyword
        test_keywords = ['test keyword']
        results = collector.get_keyword_ideas(test_keywords)
        
        if results:
            print(f"✅ Retrieved {len(results)} keyword ideas from Google Ads")
        else:
            print("⚠️  No keyword ideas retrieved (this might be normal)")
        
        return True
        
    except Exception as e:
        print(f"⚠️  Google Ads test failed (this is normal if not configured): {e}")
        return True  # Don't fail the overall test for this

def test_environment():
    """Test environment configuration."""
    print("\n🔍 Testing Environment Configuration...")
    
    # Check if .env file exists
    env_file = Path(__file__).parent / '.env'
    if env_file.exists():
        print("✅ .env file found")
    else:
        print("⚠️  .env file not found (create one from env.example)")
    
    # Check required directories
    data_warehouse_dir = Path(__file__).parent.parent / 'data_warehouse'
    if data_warehouse_dir.exists():
        print("✅ Data warehouse directory exists")
    else:
        print("⚠️  Data warehouse directory not found (will be created automatically)")
    
    # Check logs directory
    logs_dir = Path(__file__).parent.parent / 'logs'
    if logs_dir.exists():
        print("✅ Logs directory exists")
    else:
        print("⚠️  Logs directory not found (will be created automatically)")
    
    return True

def test_collection_script():
    """Test the main collection script."""
    print("\n🔍 Testing Collection Script...")
    
    try:
        from scripts.collect_keywords import KeywordCollectionOrchestrator
        
        orchestrator = KeywordCollectionOrchestrator()
        print("✅ Collection orchestrator initialized")
        
        # Test trending keywords function
        trending = orchestrator.get_trending_keywords_for_content(days=1, limit=5)
        print(f"✅ Retrieved {len(trending)} trending keywords")
        
        orchestrator.cleanup()
        print("✅ Collection orchestrator cleaned up")
        
        return True
        
    except Exception as e:
        print(f"❌ Collection script test failed: {e}")
        return False

def run_all_tests():
    """Run all tests and provide a summary."""
    print("🚀 Running Keyword Data Collection System Tests")
    print("=" * 60)
    
    tests = [
        ("Environment", test_environment),
        ("Imports", test_imports),
        ("Google Trends", test_google_trends),
        ("Data Warehouse", test_data_warehouse),
        ("Google Ads", test_google_ads),
        ("Collection Script", test_collection_script),
    ]
    
    results = {}
    
    for test_name, test_func in tests:
        try:
            results[test_name] = test_func()
        except Exception as e:
            print(f"❌ {test_name} test crashed: {e}")
            results[test_name] = False
    
    # Print summary
    print("\n" + "=" * 60)
    print("📊 Test Results Summary")
    print("=" * 60)
    
    all_passed = True
    for test_name, passed in results.items():
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{test_name:20} {status}")
        if not passed:
            all_passed = False
    
    print("=" * 60)
    
    if all_passed:
        print("🎉 All tests passed! Your setup is ready to go.")
        print("\nNext steps:")
        print("1. Run: python scripts/collect_keywords.py collect -k 'pdf merger'")
        print("2. Run: python scripts/collect_keywords.py trending")
        print("3. Run: python scripts/collect_keywords.py suggest -k 'pdf merger'")
    else:
        print("⚠️  Some tests failed. Please check the errors above and fix them.")
        print("\nCommon fixes:")
        print("1. Install dependencies: pip install -r requirements.txt")
        print("2. Create .env file: cp env.example .env")
        print("3. Check your internet connection")
        print("4. Review the SETUP_GUIDE.md for detailed instructions")
    
    return all_passed

if __name__ == '__main__':
    success = run_all_tests()
    sys.exit(0 if success else 1)
