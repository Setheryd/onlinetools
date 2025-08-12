#!/usr/bin/env python3
"""
Google Ads API Setup Script

This script helps you set up and configure the Google Ads API for keyword data collection.
Follow the step-by-step instructions to get your API credentials configured.
"""

import os
import json
import sys
from pathlib import Path
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException
from google.auth.exceptions import RefreshError
import click

# Add the parent directory to the path so we can import our modules
sys.path.append(str(Path(__file__).parent.parent))

from config.settings import BASE_DIR
from utils.logger import get_logger

logger = get_logger(__name__)

class GoogleAdsSetup:
    """Helper class for setting up Google Ads API credentials."""
    
    def __init__(self):
        self.config_file = BASE_DIR / 'google-ads.yaml'
        self.env_file = BASE_DIR / '.env'
        
    def create_config_template(self):
        """Create a template google-ads.yaml configuration file."""
        config_template = """# Google Ads API Configuration
# Replace the placeholder values with your actual credentials

developer_token: "YOUR_DEVELOPER_TOKEN"
client_id: "YOUR_CLIENT_ID"
client_secret: "YOUR_CLIENT_SECRET"
refresh_token: "YOUR_REFRESH_TOKEN"
login_customer_id: "YOUR_LOGIN_CUSTOMER_ID"  # Optional: Your Google Ads account ID
use_proto_plus: True
"""
        
        with open(self.config_file, 'w') as f:
            f.write(config_template)
            
        logger.info(f"Created Google Ads config template at: {self.config_file}")
        return True
    
    def update_env_file(self, credentials: dict):
        """Update the .env file with Google Ads credentials."""
        env_content = []
        
        # Read existing .env file if it exists
        if self.env_file.exists():
            with open(self.env_file, 'r') as f:
                env_content = f.readlines()
        
        # Update or add Google Ads credentials
        credentials_to_update = {
            'GOOGLE_ADS_DEVELOPER_TOKEN': credentials.get('developer_token'),
            'GOOGLE_ADS_CLIENT_ID': credentials.get('client_id'),
            'GOOGLE_ADS_CLIENT_SECRET': credentials.get('client_secret'),
            'GOOGLE_ADS_REFRESH_TOKEN': credentials.get('refresh_token'),
        }
        
        updated_lines = []
        existing_keys = set()
        
        # Process existing lines
        for line in env_content:
            line = line.strip()
            if line and not line.startswith('#'):
                key, value = line.split('=', 1)
                if key in credentials_to_update:
                    updated_lines.append(f"{key}={credentials_to_update[key]}\n")
                    existing_keys.add(key)
                else:
                    updated_lines.append(line + '\n')
            else:
                updated_lines.append(line + '\n')
        
        # Add missing credentials
        for key, value in credentials_to_update.items():
            if key not in existing_keys and value:
                updated_lines.append(f"{key}={value}\n")
        
        # Write back to .env file
        with open(self.env_file, 'w') as f:
            f.writelines(updated_lines)
        
        logger.info(f"Updated .env file with Google Ads credentials")
        return True
    
    def test_connection(self):
        """Test the Google Ads API connection."""
        try:
            client = GoogleAdsClient.load_from_storage(str(self.config_file))
            
            # Test with a simple query
            ga_service = client.get_service("GoogleAdsService")
            query = """
                SELECT 
                    customer.id,
                    customer.descriptive_name
                FROM customer 
                LIMIT 1
            """
            
            response = ga_service.search(customer_id="1234567890", query=query)
            
            logger.info("✅ Google Ads API connection successful!")
            return True
            
        except GoogleAdsException as ex:
            logger.error(f"❌ Google Ads API error: {ex}")
            for error in ex.failure.errors:
                logger.error(f"  - {error.message}")
            return False
        except RefreshError as ex:
            logger.error(f"❌ Authentication error: {ex}")
            logger.error("Please check your refresh token and try again.")
            return False
        except Exception as ex:
            logger.error(f"❌ Unexpected error: {ex}")
            return False

@click.group()
def cli():
    """Google Ads API Setup Tool"""
    pass

@cli.command()
def setup():
    """Interactive setup for Google Ads API credentials."""
    setup_tool = GoogleAdsSetup()
    
    click.echo("🚀 Google Ads API Setup")
    click.echo("=" * 50)
    click.echo()
    
    # Step 1: Create config template
    if not setup_tool.config_file.exists():
        setup_tool.create_config_template()
        click.echo("📝 Created google-ads.yaml template")
    else:
        click.echo("📝 google-ads.yaml already exists")
    
    click.echo()
    click.echo("📋 Setup Instructions:")
    click.echo("1. Go to https://developers.google.com/google-ads/api/docs/first-call/dev-token")
    click.echo("2. Apply for a developer token")
    click.echo("3. Create a Google Cloud Project and enable the Google Ads API")
    click.echo("4. Create OAuth 2.0 credentials")
    click.echo("5. Update the google-ads.yaml file with your credentials")
    click.echo()
    
    # Collect credentials interactively
    credentials = {}
    
    click.echo("🔑 Enter your Google Ads API credentials:")
    credentials['developer_token'] = click.prompt("Developer Token", type=str)
    credentials['client_id'] = click.prompt("Client ID", type=str)
    credentials['client_secret'] = click.prompt("Client Secret", type=str)
    credentials['refresh_token'] = click.prompt("Refresh Token", type=str)
    
    # Update the config file
    config_content = f"""# Google Ads API Configuration
developer_token: "{credentials['developer_token']}"
client_id: "{credentials['client_id']}"
client_secret: "{credentials['client_secret']}"
refresh_token: "{credentials['refresh_token']}"
use_proto_plus: True
"""
    
    with open(setup_tool.config_file, 'w') as f:
        f.write(config_content)
    
    # Update .env file
    setup_tool.update_env_file(credentials)
    
    click.echo()
    click.echo("✅ Configuration files updated!")
    click.echo()
    click.echo("🧪 Testing connection...")
    
    if setup_tool.test_connection():
        click.echo("🎉 Setup completed successfully!")
    else:
        click.echo("❌ Setup failed. Please check your credentials and try again.")

@cli.command()
def test():
    """Test the current Google Ads API configuration."""
    setup_tool = GoogleAdsSetup()
    
    if not setup_tool.config_file.exists():
        click.echo("❌ google-ads.yaml not found. Run 'setup' first.")
        return
    
    click.echo("🧪 Testing Google Ads API connection...")
    
    if setup_tool.test_connection():
        click.echo("✅ Connection successful!")
    else:
        click.echo("❌ Connection failed!")

@cli.command()
def instructions():
    """Display detailed setup instructions."""
    click.echo("📚 Google Ads API Setup Instructions")
    click.echo("=" * 50)
    click.echo()
    
    click.echo("Step 1: Create a Google Ads Account")
    click.echo("- Go to https://ads.google.com")
    click.echo("- Sign up for a Google Ads account (no payment required for API access)")
    click.echo("- Note your customer ID (found in the top right of the interface)")
    click.echo()
    
    click.echo("Step 2: Apply for Developer Token")
    click.echo("- Go to https://developers.google.com/google-ads/api/docs/first-call/dev-token")
    click.echo("- Click 'Apply for a developer token'")
    click.echo("- Fill out the application form")
    click.echo("- Wait for approval (usually 1-2 business days)")
    click.echo()
    
    click.echo("Step 3: Set Up Google Cloud Project")
    click.echo("- Go to https://console.cloud.google.com")
    click.echo("- Create a new project or select existing one")
    click.echo("- Enable the Google Ads API:")
    click.echo("  * Go to APIs & Services > Library")
    click.echo("  * Search for 'Google Ads API'")
    click.echo("  * Click Enable")
    click.echo()
    
    click.echo("Step 4: Create OAuth 2.0 Credentials")
    click.echo("- Go to APIs & Services > Credentials")
    click.echo("- Click 'Create Credentials' > 'OAuth client ID'")
    click.echo("- Choose 'Desktop app' as application type")
    click.echo("- Download the JSON file")
    click.echo("- Extract client_id and client_secret")
    click.echo()
    
    click.echo("Step 5: Generate Refresh Token")
    click.echo("- Use the Google OAuth 2.0 Playground:")
    click.echo("  * Go to https://developers.google.com/oauthplayground")
    click.echo("  * Click the settings icon (⚙️)")
    click.echo("  * Check 'Use your own OAuth credentials'")
    click.echo("  * Enter your client_id and client_secret")
    click.echo("  * Close settings")
    click.echo("  * Select 'Google Ads API v15' from the left panel")
    click.echo("  * Select 'https://www.googleapis.com/auth/adwords'")
    click.echo("  * Click 'Authorize APIs'")
    click.echo("  * Sign in with your Google account")
    click.echo("  * Click 'Exchange authorization code for tokens'")
    click.echo("  * Copy the refresh_token")
    click.echo()
    
    click.echo("Step 6: Configure Your Application")
    click.echo("- Run: python setup_google_ads.py setup")
    click.echo("- Enter your credentials when prompted")
    click.echo("- Test the connection: python setup_google_ads.py test")
    click.echo()

if __name__ == '__main__':
    cli()
