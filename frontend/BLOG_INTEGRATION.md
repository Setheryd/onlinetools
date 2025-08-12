# Blog System Integration Guide

This guide explains how to integrate the blog system with your content generation backend and Vercel API.

## Overview

The blog system is designed to be easily integrated with your content generation backend. It includes:

- **Frontend Components**: React components for displaying blog posts
- **API Routes**: Next.js API routes that can connect to your backend
- **Blog Service**: Utility functions for data management
- **Mock Data**: Sample content for development and testing

## File Structure

```
frontend/src/app/
├── blog/
│   ├── page.js                    # Main blog listing page
│   └── [slug]/
│       └── page.js                # Individual blog post page
├── components/blog/
│   ├── BlogCard.js                # Blog post preview card
│   ├── BlogHero.js                # Blog page header
│   ├── BlogPost.js                # Individual blog post display
│   └── BlogSidebar.js             # Blog sidebar with search/filters
├── api/blog/
│   └── posts/
│       ├── route.js               # GET/POST all posts
│       └── [slug]/
│           └── route.js           # GET/PUT/DELETE individual post
└── utils/
    └── blogService.js             # Blog data management service
```

## Integration Steps

### 1. Environment Variables

Add these environment variables to your `.env.local` file:

```env
# Content Generation Backend
CONTENT_API_BASE_URL=http://localhost:8000
CONTENT_API_KEY=your_api_key_here

# Vercel (if using Vercel for deployment)
VERCEL_URL=your-vercel-url.vercel.app
```

### 2. Backend API Endpoints

Your content generation backend should provide these endpoints:

#### Get All Posts
```
GET /api/posts
Query Parameters:
- page: number (default: 1)
- limit: number (default: 10)
- category: string (optional)
- tag: string (optional)
- search: string (optional)
- featured: boolean (optional)

Response:
{
  "posts": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

#### Get Single Post
```
GET /api/posts/{slug}

Response:
{
  "id": 1,
  "slug": "post-slug",
  "title": "Post Title",
  "excerpt": "Post excerpt...",
  "content": "<h2>HTML content...</h2>",
  "featuredImage": "https://...",
  "category": "Tutorial",
  "tags": ["tag1", "tag2"],
  "publishedAt": "2024-01-15T10:00:00Z",
  "featured": true,
  "author": {
    "name": "Author Name",
    "bio": "Author bio...",
    "social": {
      "twitter": "https://twitter.com/...",
      "linkedin": "https://linkedin.com/..."
    }
  },
  "relatedPosts": [...]
}
```

#### Create Post
```
POST /api/posts
Headers: Authorization: Bearer {api_key}
Body: {
  "title": "Post Title",
  "excerpt": "Post excerpt...",
  "content": "Post content...",
  "category": "Tutorial",
  "tags": ["tag1", "tag2"],
  "featuredImage": "https://...",
  "featured": false,
  "author": {...}
}

Response:
{
  "success": true,
  "id": 123,
  "slug": "generated-slug",
  "message": "Post created successfully"
}
```

#### Update Post
```
PUT /api/posts/{slug}
Headers: Authorization: Bearer {api_key}
Body: { same as POST }

Response:
{
  "success": true,
  "slug": "post-slug",
  "message": "Post updated successfully"
}
```

#### Delete Post
```
DELETE /api/posts/{slug}
Headers: Authorization: Bearer {api_key}

Response:
{
  "success": true,
  "slug": "post-slug",
  "message": "Post deleted successfully"
}
```

### 3. Update API Routes

Replace the mock data in these files with actual API calls:

1. **`frontend/src/app/api/blog/posts/route.js`**
2. **`frontend/src/app/api/blog/posts/[slug]/route.js`**

Uncomment the API calls and update the URLs to match your backend.

### 4. Update Blog Service

Replace the mock data in `frontend/src/app/utils/blogService.js` with actual API calls:

```javascript
// Replace this:
return mockPosts;

// With this:
const response = await fetch('/api/blog/posts');
const data = await response.json();
return data.posts;
```

### 5. Content Generation Integration

To integrate with your content generation backend:

1. **Scheduled Content Generation**: Set up a cron job or scheduled task to generate blog posts
2. **API Integration**: Your content generation script should call the POST `/api/posts` endpoint
3. **Image Generation**: Generate featured images using your image processing backend
4. **SEO Optimization**: Include meta tags and structured data in the generated content

### 6. Vercel Deployment

For Vercel deployment:

1. **Environment Variables**: Add the environment variables in Vercel dashboard
2. **API Routes**: The API routes will work automatically with Vercel
3. **CORS**: Configure CORS if your backend is on a different domain
4. **Webhooks**: Set up webhooks to trigger content generation

## Content Generation Workflow

### Automated Blog Post Creation

1. **Keyword Research**: Use your keyword scraper to find trending topics
2. **Content Generation**: Generate blog posts using your content generation backend
3. **Image Processing**: Generate featured images using your image processing backend
4. **API Submission**: Submit the generated content via API
5. **Scheduling**: Schedule posts for optimal publishing times

### Example Content Generation Script

```python
# backend/python/content_generation/blog_generator.py
import requests
import json

def generate_and_publish_blog_post(topic, keywords):
    # Generate content using your AI model
    content = generate_content(topic, keywords)
    
    # Generate featured image
    image_url = generate_featured_image(topic)
    
    # Prepare post data
    post_data = {
        "title": f"Complete Guide to {topic}",
        "excerpt": f"Learn everything about {topic} and how to implement it effectively.",
        "content": content,
        "category": "Tutorial",
        "tags": keywords,
        "featuredImage": image_url,
        "featured": False,
        "author": {
            "name": "AI Content Generator",
            "bio": "Automated content generation system"
        }
    }
    
    # Submit to frontend API
    response = requests.post(
        "https://your-domain.vercel.app/api/blog/posts",
        json=post_data,
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    
    return response.json()
```

## Features Included

### Frontend Features
- ✅ Responsive blog listing page
- ✅ Individual blog post pages
- ✅ Search functionality
- ✅ Category filtering
- ✅ Tag system
- ✅ Author profiles
- ✅ Related posts
- ✅ Social sharing
- ✅ Newsletter signup
- ✅ SEO-friendly URLs
- ✅ Rich content formatting
- ✅ Featured posts highlighting

### Backend Integration Features
- ✅ RESTful API endpoints
- ✅ CRUD operations for posts
- ✅ Pagination support
- ✅ Search and filtering
- ✅ Error handling
- ✅ Authentication ready
- ✅ CORS support
- ✅ Environment configuration

## Customization

### Styling
- Modify `frontend/src/app/styles/globals.css` for custom styling
- Update Tailwind classes in components for design changes
- Add custom CSS for specific blog features

### Functionality
- Add more filter options in `BlogSidebar.js`
- Implement pagination in the blog listing
- Add comment system
- Implement user authentication
- Add admin panel for content management

### SEO
- Add meta tags to blog posts
- Implement structured data (JSON-LD)
- Add sitemap generation
- Configure Open Graph tags

## Testing

### Local Development
1. Start your content generation backend
2. Set environment variables
3. Run `npm run dev` in the frontend directory
4. Visit `http://localhost:3000/blog`

### API Testing
Test the API endpoints using tools like Postman or curl:

```bash
# Get all posts
curl http://localhost:3000/api/blog/posts

# Get specific post
curl http://localhost:3000/api/blog/posts/getting-started-with-base64-encoding

# Create new post
curl -X POST http://localhost:3000/api/blog/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Post","excerpt":"Test excerpt","content":"<p>Test content</p>"}'
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Configure CORS in your backend
2. **API Connection**: Check environment variables and network connectivity
3. **Image Loading**: Ensure image URLs are accessible
4. **Content Formatting**: Verify HTML content is properly sanitized

### Debug Mode

Enable debug logging by setting:
```env
DEBUG=true
```

This will log API calls and responses to the console.

## Next Steps

1. **Set up your content generation backend**
2. **Configure environment variables**
3. **Test API integration**
4. **Deploy to Vercel**
5. **Set up automated content generation**
6. **Monitor and optimize performance**

The blog system is now ready for integration with your content generation backend!
