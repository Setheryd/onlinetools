"""
Content Generation System

This module provides functionality to generate SEO-optimized content
from collected keyword data for your online tools website.
"""

import json
import time
from typing import List, Dict, Optional, Any
from datetime import datetime
from pathlib import Path
import sys
import re
from dataclasses import dataclass

# Add the parent directory to the path so we can import our modules
sys.path.append(str(Path(__file__).parent.parent.parent))

from config.settings import BASE_DIR
from utils.logger import get_logger

logger = get_logger(__name__)

@dataclass
class ContentTopic:
    """Represents a content topic with keyword and metadata."""
    keyword: str
    search_volume: str = "unknown"
    difficulty: str = "unknown"
    source: str = "unknown"
    seed_keyword: str = ""
    type: str = "keyword"
    timestamp: str = ""

class ContentGenerator:
    """Generates SEO-optimized content from keyword data."""
    
    def __init__(self):
        """Initialize the content generator."""
        self.templates_dir = BASE_DIR / 'content_generation' / 'templates'
        self.output_dir = BASE_DIR / 'data_warehouse' / 'articles'
        
        # Ensure directories exist
        self.templates_dir.mkdir(parents=True, exist_ok=True)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        logger.info("Content generator initialized")
    
    def analyze_keyword_potential(self, keyword: str) -> Dict[str, Any]:
        """
        Analyze a keyword for content potential.
        
        Args:
            keyword: The keyword to analyze
            
        Returns:
            Dictionary with analysis results
        """
        analysis = {
            'keyword': keyword,
            'word_count': len(keyword.split()),
            'search_intent': self._determine_search_intent(keyword),
            'content_type': self._suggest_content_type(keyword),
            'target_audience': self._identify_target_audience(keyword),
            'seo_potential': self._assess_seo_potential(keyword),
            'competition_level': self._assess_competition(keyword)
        }
        
        return analysis
    
    def _determine_search_intent(self, keyword: str) -> str:
        """Determine the search intent behind a keyword."""
        keyword_lower = keyword.lower()
        
        # Informational intent
        if any(word in keyword_lower for word in ['how', 'what', 'why', 'when', 'where', 'guide', 'tutorial', 'learn']):
            return 'informational'
        
        # Transactional intent
        if any(word in keyword_lower for word in ['buy', 'download', 'free', 'online', 'tool', 'converter']):
            return 'transactional'
        
        # Navigational intent
        if any(word in keyword_lower for word in ['website', 'site', 'app', 'software']):
            return 'navigational'
        
        return 'informational'  # Default
    
    def _suggest_content_type(self, keyword: str) -> str:
        """Suggest the best content type for a keyword."""
        keyword_lower = keyword.lower()
        
        if 'how to' in keyword_lower or 'tutorial' in keyword_lower:
            return 'how-to-guide'
        elif 'vs' in keyword_lower or 'comparison' in keyword_lower:
            return 'comparison'
        elif 'best' in keyword_lower or 'top' in keyword_lower:
            return 'listicle'
        elif 'what is' in keyword_lower or 'definition' in keyword_lower:
            return 'definition'
        elif 'free' in keyword_lower or 'online' in keyword_lower:
            return 'tool-showcase'
        else:
            return 'informational'
    
    def _identify_target_audience(self, keyword: str) -> str:
        """Identify the target audience for a keyword."""
        keyword_lower = keyword.lower()
        
        if any(word in keyword_lower for word in ['developer', 'programmer', 'coding']):
            return 'developers'
        elif any(word in keyword_lower for word in ['business', 'professional', 'enterprise']):
            return 'business_users'
        elif any(word in keyword_lower for word in ['student', 'education', 'learning']):
            return 'students'
        else:
            return 'general_users'
    
    def _assess_seo_potential(self, keyword: str) -> str:
        """Assess the SEO potential of a keyword."""
        word_count = len(keyword.split())
        
        if word_count >= 4:
            return 'high'  # Long-tail keywords
        elif word_count >= 2:
            return 'medium'
        else:
            return 'low'  # Single words are usually too competitive
    
    def _assess_competition(self, keyword: str) -> str:
        """Assess the competition level for a keyword."""
        word_count = len(keyword.split())
        
        if word_count >= 4:
            return 'low'  # Long-tail keywords have less competition
        elif word_count >= 2:
            return 'medium'
        else:
            return 'high'  # Single words are highly competitive
    
    def generate_article_outline(self, topic: ContentTopic) -> Dict[str, Any]:
        """
        Generate an article outline for a content topic.
        
        Args:
            topic: The content topic to create an outline for
            
        Returns:
            Dictionary containing the article outline
        """
        analysis = self.analyze_keyword_potential(topic.keyword)
        
        outline = {
            'title': self._generate_title(topic.keyword, analysis),
            'meta_description': self._generate_meta_description(topic.keyword, analysis),
            'headings': self._generate_headings(topic.keyword, analysis),
            'target_keywords': self._generate_target_keywords(topic.keyword),
            'estimated_word_count': self._estimate_word_count(analysis),
            'content_type': analysis['content_type'],
            'search_intent': analysis['search_intent']
        }
        
        return outline
    
    def _generate_title(self, keyword: str, analysis: Dict) -> str:
        """Generate an SEO-optimized title."""
        content_type = analysis['content_type']
        
        if content_type == 'how-to-guide':
            return f"How to {keyword.title()}: Complete Guide"
        elif content_type == 'comparison':
            return f"{keyword.title()}: Best Options Compared"
        elif content_type == 'listicle':
            return f"Best {keyword.title()} Tools in 2024"
        elif content_type == 'definition':
            return f"What is {keyword.title()}? Complete Guide"
        elif content_type == 'tool-showcase':
            return f"Free {keyword.title()} Online Tool"
        else:
            return f"{keyword.title()}: Everything You Need to Know"
    
    def _generate_meta_description(self, keyword: str, analysis: Dict) -> str:
        """Generate an SEO-optimized meta description."""
        content_type = analysis['content_type']
        
        if content_type == 'how-to-guide':
            return f"Learn how to {keyword} with our step-by-step guide. Free online tools and expert tips to help you get started."
        elif content_type == 'tool-showcase':
            return f"Use our free {keyword} online tool. No registration required, instant results, and completely free to use."
        else:
            return f"Discover everything about {keyword}. Expert insights, free tools, and practical tips for your needs."
    
    def _generate_headings(self, keyword: str, analysis: Dict) -> List[str]:
        """Generate article headings based on content type."""
        content_type = analysis['content_type']
        
        if content_type == 'how-to-guide':
            return [
                f"What is {keyword.title()}?",
                f"Why Use {keyword.title()}?",
                f"Step-by-Step Guide to {keyword.title()}",
                f"Best Tools for {keyword.title()}",
                f"Common Mistakes to Avoid",
                f"Tips and Best Practices",
                f"Frequently Asked Questions"
            ]
        elif content_type == 'tool-showcase':
            return [
                f"What is {keyword.title()}?",
                f"Features of Our {keyword.title()} Tool",
                f"How to Use Our {keyword.title()} Tool",
                f"Benefits of Using Our Tool",
                f"Alternative Options",
                f"Frequently Asked Questions"
            ]
        elif content_type == 'comparison':
            return [
                f"What is {keyword.title()}?",
                f"Top {keyword.title()} Options",
                f"Feature Comparison",
                f"Pros and Cons",
                f"Our Recommendation",
                f"Frequently Asked Questions"
            ]
        else:
            return [
                f"What is {keyword.title()}?",
                f"Key Features and Benefits",
                f"How to Get Started",
                f"Best Practices",
                f"Frequently Asked Questions"
            ]
    
    def _generate_target_keywords(self, keyword: str) -> List[str]:
        """Generate target keywords for the article."""
        base_keywords = [keyword]
        
        # Add variations
        variations = [
            f"free {keyword}",
            f"online {keyword}",
            f"{keyword} tool",
            f"best {keyword}",
            f"how to {keyword}",
            f"{keyword} guide"
        ]
        
        return base_keywords + variations
    
    def _estimate_word_count(self, analysis: Dict) -> int:
        """Estimate the word count for the article."""
        content_type = analysis['content_type']
        
        if content_type == 'how-to-guide':
            return 1500
        elif content_type == 'comparison':
            return 2000
        elif content_type == 'listicle':
            return 1200
        elif content_type == 'tool-showcase':
            return 800
        else:
            return 1000
    
    def generate_full_article(self, topic: ContentTopic) -> Dict[str, Any]:
        """
        Generate a full article for a content topic.
        
        Args:
            topic: The content topic to create an article for
            
        Returns:
            Dictionary containing the full article
        """
        logger.info(f"Generating full article for: {topic.keyword}")
        
        outline = self.generate_article_outline(topic)
        
        # Generate content for each section
        sections = []
        for heading in outline['headings']:
            section_content = self._generate_section_content(heading, topic.keyword, outline)
            sections.append({
                'heading': heading,
                'content': section_content
            })
        
        # Combine into full article
        full_content = self._combine_sections(sections)
        
        article = {
            'title': outline['title'],
            'meta_description': outline['meta_description'],
            'content': full_content,
            'target_keywords': outline['target_keywords'],
            'word_count': len(full_content.split()),
            'estimated_word_count': outline['estimated_word_count'],
            'content_type': outline['content_type'],
            'search_intent': outline['search_intent'],
            'topic': topic.keyword,
            'generated_at': datetime.now().isoformat(),
            'sections': sections
        }
        
        return article
    
    def _generate_section_content(self, heading: str, keyword: str, outline: Dict) -> str:
        """Generate content for a specific section."""
        content_type = outline['content_type']
        
        if "What is" in heading:
            return self._generate_what_is_section(keyword)
        elif "How to" in heading or "Step-by-Step" in heading:
            return self._generate_how_to_section(keyword)
        elif "Features" in heading:
            return self._generate_features_section(keyword)
        elif "Benefits" in heading:
            return self._generate_benefits_section(keyword)
        elif "Best" in heading or "Top" in heading:
            return self._generate_best_options_section(keyword)
        elif "FAQ" in heading or "Questions" in heading:
            return self._generate_faq_section(keyword)
        else:
            return self._generate_generic_section(heading, keyword)
    
    def _generate_what_is_section(self, keyword: str) -> str:
        """Generate content for 'What is' sections."""
        return f"""
{keyword.title()} is a powerful tool that helps users accomplish various tasks efficiently. Whether you're a professional, student, or casual user, understanding {keyword} can significantly improve your workflow and productivity.

In today's digital age, {keyword} has become an essential part of many people's daily routines. From basic functionality to advanced features, this tool offers a comprehensive solution for your needs.

Our platform provides a user-friendly interface that makes {keyword} accessible to everyone, regardless of their technical expertise. With our free online tool, you can get started immediately without any downloads or installations.
        """.strip()
    
    def _generate_how_to_section(self, keyword: str) -> str:
        """Generate content for 'How to' sections."""
        return f"""
Follow these simple steps to use our {keyword} tool effectively:

**Step 1: Access the Tool**
Visit our website and navigate to the {keyword} section. Our tool is available 24/7 and requires no registration.

**Step 2: Prepare Your Files**
Ensure your files are in a supported format. Our tool supports most common file types and provides clear instructions for each format.

**Step 3: Upload and Process**
Upload your files using our drag-and-drop interface or file browser. Our system will automatically process your files and provide real-time updates.

**Step 4: Download Results**
Once processing is complete, download your results immediately. All files are automatically deleted from our servers for your privacy and security.

**Pro Tips:**
- Use our preview feature before finalizing your work
- Check the file size limits for optimal performance
- Save your work regularly to avoid any data loss
        """.strip()
    
    def _generate_features_section(self, keyword: str) -> str:
        """Generate content for features sections."""
        return f"""
Our {keyword} tool comes packed with powerful features designed to meet all your needs:

**🔧 Core Features:**
- **Fast Processing**: Get results in seconds, not minutes
- **Multiple Formats**: Support for all major file formats
- **Batch Processing**: Handle multiple files at once
- **Cloud-Based**: No downloads or installations required

**🛡️ Security Features:**
- **SSL Encryption**: All data is encrypted in transit
- **Auto-Deletion**: Files are automatically removed after processing
- **No Registration**: Use our tool without creating an account
- **Privacy-First**: We never store or access your personal data

**💡 Advanced Features:**
- **Custom Settings**: Adjust parameters to match your requirements
- **Preview Mode**: See results before finalizing
- **Download Options**: Multiple output formats available
- **24/7 Availability**: Access our tool anytime, anywhere
        """.strip()
    
    def _generate_benefits_section(self, keyword: str) -> str:
        """Generate content for benefits sections."""
        return f"""
Using our {keyword} tool offers numerous advantages over traditional methods:

**⏰ Time Savings**
Our automated process saves hours of manual work. What used to take days can now be completed in minutes.

**💰 Cost Effective**
Completely free to use with no hidden fees or premium tiers. Save money on expensive software licenses.

**🌐 Accessibility**
Access our tool from any device with an internet connection. No need to install software or worry about compatibility.

**🔒 Security**
Your files are processed securely and automatically deleted. We prioritize your privacy and data protection.

**📈 Scalability**
Handle projects of any size, from individual files to large batches. Our infrastructure scales to meet your needs.

**🎯 Accuracy**
Advanced algorithms ensure consistent, high-quality results every time. Reduce errors and improve efficiency.
        """.strip()
    
    def _generate_best_options_section(self, keyword: str) -> str:
        """Generate content for best options sections."""
        return f"""
Here are the top {keyword} options available in 2024:

**🥇 Our Tool (Recommended)**
- **Pros**: Free, fast, secure, no registration required
- **Cons**: Requires internet connection
- **Best for**: Most users, especially those who value simplicity

**🥈 Alternative Option 1**
- **Pros**: Advanced features, offline capability
- **Cons**: Expensive, complex interface
- **Best for**: Power users with specific requirements

**🥉 Alternative Option 2**
- **Pros**: Good balance of features and ease of use
- **Cons**: Limited free tier, slower processing
- **Best for**: Users who need specific integrations

**Our Recommendation:**
For most users, our free online tool provides the best combination of features, ease of use, and value. It's perfect for both beginners and experienced users who want reliable results without the complexity.
        """.strip()
    
    def _generate_faq_section(self, keyword: str) -> str:
        """Generate content for FAQ sections."""
        return f"""
**Frequently Asked Questions**

**Q: Is the {keyword} tool really free?**
A: Yes, our tool is completely free to use with no hidden costs or premium features.

**Q: What file formats are supported?**
A: We support all major file formats including PDF, DOC, DOCX, TXT, and many more. Check our format guide for the complete list.

**Q: How long does processing take?**
A: Most files are processed within 30 seconds. Larger files may take up to 2 minutes.

**Q: Is my data secure?**
A: Absolutely. We use SSL encryption and automatically delete all files after processing. We never access or store your personal data.

**Q: Can I use the tool on mobile devices?**
A: Yes, our tool is fully responsive and works on all devices including smartphones and tablets.

**Q: What if I encounter an error?**
A: Our support team is available 24/7 to help resolve any issues. Contact us through our support page for immediate assistance.
        """.strip()
    
    def _generate_generic_section(self, heading: str, keyword: str) -> str:
        """Generate content for generic sections."""
        return f"""
{heading}

This section provides valuable information about {keyword} and how it can benefit your workflow. Our comprehensive approach ensures you have all the information you need to make informed decisions.

Whether you're a beginner or an experienced user, understanding the key concepts and best practices will help you achieve better results. Our tool is designed to be intuitive and user-friendly, making it accessible to users of all skill levels.

For the best experience, we recommend exploring all the features our {keyword} tool has to offer. Take advantage of our free trial and see how our solution can improve your productivity and efficiency.
        """.strip()
    
    def _combine_sections(self, sections: List[Dict]) -> str:
        """Combine sections into a full article."""
        article_parts = []
        
        for section in sections:
            article_parts.append(f"## {section['heading']}")
            article_parts.append("")
            article_parts.append(section['content'])
            article_parts.append("")
        
        return "\n".join(article_parts)
    
    def save_article(self, article: Dict, filename: str = None) -> str:
        """
        Save an article to a file.
        
        Args:
            article: The article dictionary
            filename: Optional filename (default: auto-generated)
            
        Returns:
            Path to the saved file
        """
        if filename is None:
            # Create filename from title
            title = article['title']
            safe_title = re.sub(r'[^\w\s-]', '', title.lower())
            safe_title = re.sub(r'[-\s]+', '-', safe_title)
            filename = f"{safe_title}.json"
        
        filepath = self.output_dir / filename
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(article, f, indent=2, ensure_ascii=False)
        
        logger.info(f"Article saved to: {filepath}")
        return str(filepath)
    
    def generate_content_batch(self, topics: List[ContentTopic]) -> List[Dict]:
        """
        Generate content for multiple topics.
        
        Args:
            topics: List of content topics
            
        Returns:
            List of generated articles
        """
        logger.info(f"Generating content batch for {len(topics)} topics")
        
        articles = []
        for i, topic in enumerate(topics, 1):
            logger.info(f"Generating article {i}/{len(topics)}: {topic.keyword}")
            
            try:
                article = self.generate_full_article(topic)
                articles.append(article)
                
                # Save individual article
                self.save_article(article)
                
                # Small delay to be respectful
                time.sleep(1)
                
            except Exception as e:
                logger.error(f"Error generating article for {topic.keyword}: {e}")
                continue
        
        logger.info(f"Generated {len(articles)} articles successfully")
        return articles
