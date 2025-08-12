import { NextResponse } from 'next/server';

// TODO: Replace with your content generation backend API
const CONTENT_API_BASE_URL = process.env.CONTENT_API_BASE_URL || 'http://localhost:8000';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');

    // TODO: Replace with actual API call to your content generation backend
    // const response = await fetch(`${CONTENT_API_BASE_URL}/api/posts?page=${page}&limit=${limit}&category=${category}&tag=${tag}&search=${search}&featured=${featured}`);
    // const posts = await response.json();

    // For now, return mock data
    const mockPosts = [
      {
        id: 1,
        slug: 'getting-started-with-base64-encoding',
        title: 'Getting Started with Base64 Encoding: A Complete Guide',
        excerpt: 'Learn everything you need to know about Base64 encoding, from basic concepts to advanced usage in web development and data transmission.',
        content: '<h2>What is Base64 Encoding?</h2><p>Base64 is a group of binary-to-text encoding schemes...</p>',
        featuredImage: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        category: 'Tutorial',
        tags: ['Base64', 'Encoding', 'Web Development', 'JavaScript'],
        publishedAt: '2024-01-15T10:00:00Z',
        featured: true,
        author: {
          name: 'Sarah Johnson',
          bio: 'Full-stack developer with 8+ years of experience in web technologies and data processing.',
          social: {
            twitter: 'https://twitter.com/sarahjohnson',
            linkedin: 'https://linkedin.com/in/sarahjohnson'
          }
        }
      }
    ];

    return NextResponse.json({
      posts: mockPosts,
      pagination: {
        page,
        limit,
        total: mockPosts.length,
        totalPages: Math.ceil(mockPosts.length / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // TODO: Replace with actual API call to your content generation backend
    // const response = await fetch(`${CONTENT_API_BASE_URL}/api/posts`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.CONTENT_API_KEY}`
    //   },
    //   body: JSON.stringify(body)
    // });
    // const result = await response.json();

    // For now, return mock response
    const result = {
      success: true,
      id: Date.now(),
      slug: body.slug || 'new-post-' + Date.now(),
      message: 'Post created successfully'
    };

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
