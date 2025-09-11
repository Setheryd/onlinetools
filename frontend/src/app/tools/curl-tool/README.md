# cURL Tool - HTTP Request Builder & API Tester

Make HTTP requests, test APIs, and generate cURL commands with an intuitive interface designed for developers.

## Features

- **All HTTP Methods**: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS
- **Quick Presets**: Start with common API patterns (GitHub API, JSON POST, Form Data)
- **Authentication Support**: Basic Auth, Bearer Tokens, API Keys
- **Custom Headers**: Add, edit, and manage request headers
- **Request Body**: Support for JSON, XML, form data, and raw text
- **Advanced Options**: Timeout, redirects, SSL verification
- **cURL Export**: Generate and copy cURL commands
- **Response Analysis**: Detailed response headers, timing, and status
- **Save & History**: Save requests and view recent history
- **Privacy-First**: All processing happens server-side for security

## How to Use

### 1. Quick Start
1. **Choose a Preset**: Select from GitHub API, JSON POST, or Form Data presets
2. **Enter URL**: Type or paste your API endpoint URL
3. **Send Request**: Click "Send Request" to execute

### 2. Custom Requests
1. **Select Method**: Choose HTTP method from dropdown
2. **Enter URL**: Add your target URL
3. **Add Headers**: Click "Add Header" to include custom headers
4. **Set Authentication**: Configure Basic Auth, Bearer Token, or API Key
5. **Add Body**: For POST/PUT/PATCH requests, add request body
6. **Configure Options**: Set timeout, redirects, and SSL settings
7. **Execute**: Send the request and view results

### 3. Response Analysis
- **Response Tab**: View formatted response body
- **Headers Tab**: See all response headers
- **cURL Tab**: Copy generated cURL command
- **Timing Tab**: Analyze request performance

## Supported Features

### HTTP Methods
- **GET**: Retrieve data from server
- **POST**: Submit data to server
- **PUT**: Update/replace resource
- **PATCH**: Partial update of resource
- **DELETE**: Remove resource
- **HEAD**: Get headers only
- **OPTIONS**: Get allowed methods

### Authentication Types
- **None**: No authentication
- **Basic Auth**: Username/password authentication
- **Bearer Token**: JWT/OAuth token authentication
- **API Key**: Custom API key with configurable header

### Request Body Types
- **JSON**: `application/json` with syntax highlighting
- **Form Data**: `application/x-www-form-urlencoded`
- **XML**: `application/xml` or `text/xml`
- **Raw Text**: Plain text or custom content types
- **Binary**: File upload support (coming soon)

### Advanced Options
- **Timeout**: Request timeout (1-300 seconds)
- **Max Redirects**: Maximum redirect follow count (0-20)
- **Follow Redirects**: Automatically follow redirects
- **SSL Verification**: Verify SSL certificates
- **Custom Headers**: Add any custom HTTP headers

## Use Cases

### API Testing
- Test REST API endpoints
- Validate API responses
- Debug API integration issues
- Test different HTTP methods

### Development
- Generate cURL commands for documentation
- Test webhook endpoints
- Validate API authentication
- Performance testing

### Learning
- Understand HTTP protocol
- Learn API request/response patterns
- Practice with different authentication methods
- Explore API documentation

## Response Information

### Status Codes
- **2xx**: Success (green)
- **3xx**: Redirection (blue)
- **4xx**: Client Error (yellow)
- **5xx**: Server Error (red)

### Timing Metrics
- **Total Time**: Complete request duration
- **DNS Lookup**: Domain name resolution time
- **TCP Connect**: Connection establishment time
- **First Byte**: Time to first response byte
- **Download**: Response body download time

### Response Tabs
- **Response**: Formatted response body with syntax highlighting
- **Headers**: All response headers in key-value format
- **cURL**: Generated cURL command for terminal use
- **Timing**: Detailed performance metrics

## Quick Presets

### GitHub API
```http
GET https://api.github.com/users/octocat
Accept: application/vnd.github.v3+json
User-Agent: TheToolGuru-cURL/1.0
```

### JSON POST
```http
POST https://httpbin.org/post
Content-Type: application/json
Accept: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Form Data
```http
POST https://httpbin.org/post
Content-Type: application/x-www-form-urlencoded

name=John+Doe&email=john%40example.com
```

## Tips for Best Results

### URL Format
- Always include protocol (`http://` or `https://`)
- Use proper URL encoding for special characters
- Include port numbers if not standard (80/443)

### Headers
- Common headers: `Content-Type`, `Accept`, `Authorization`
- Case-sensitive header names
- Use proper MIME types for `Content-Type`

### Authentication
- **Basic Auth**: Use HTTPS to protect credentials
- **Bearer Token**: Include `Bearer ` prefix in token
- **API Key**: Check API documentation for correct header name

### Request Body
- **JSON**: Use proper JSON syntax with quotes
- **Form Data**: URL-encode special characters
- **XML**: Include proper XML declaration

### Performance
- Set appropriate timeouts for your use case
- Use connection pooling for multiple requests
- Monitor response times in timing tab

## Security Considerations

- **HTTPS Only**: Always use HTTPS for production APIs
- **Credential Protection**: Never share saved requests with credentials
- **Input Validation**: Validate all user inputs
- **Rate Limiting**: Respect API rate limits

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Privacy & Security

- Requests are processed server-side for security
- No request data is stored permanently
- Credentials are not logged or saved
- All requests respect CORS policies
