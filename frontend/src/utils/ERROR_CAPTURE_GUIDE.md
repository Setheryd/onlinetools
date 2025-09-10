# Error Capture System Guide

## Overview
The Website Screenshot tool now includes a comprehensive error capture system that automatically logs and stores all errors for debugging purposes.

## Features

### 1. Automatic Error Capture
- **JavaScript Errors**: Syntax errors, runtime errors, type errors
- **Promise Rejections**: Unhandled promise rejections
- **Fetch Errors**: HTTP request failures and network errors
- **API Errors**: Screenshot API specific errors

### 2. Error Storage
- **Memory**: Errors are stored in component state for immediate access
- **LocalStorage**: Errors are persisted in browser storage (last 50 errors)
- **Console**: All errors are logged to browser console with detailed information

### 3. Error Export
- **JSON Export**: Download errors as structured JSON files
- **Global Export**: Export all errors from the entire session
- **Tool-Specific Export**: Export only errors related to the screenshot tool

## How to Use

### Viewing Errors
1. **Debug Panel**: Errors automatically appear in a yellow debug panel when they occur
2. **Console**: Check browser console for detailed error logs
3. **LocalStorage**: Errors persist across page reloads

### Exporting Errors
1. **Export All Errors**: Downloads both local and global errors
2. **Export Global Errors**: Downloads all errors from the entire session
3. **Clear Errors**: Removes errors from the current session

### Error Information Included
- **Error Type**: JavaScript, API, Fetch, etc.
- **Message**: Error description
- **Stack Trace**: Full error stack for debugging
- **Timestamp**: When the error occurred
- **Context**: Additional information (URL, parameters, etc.)
- **User Agent**: Browser information
- **Request ID**: Unique identifier for API requests

## API Error Logging

### Server-Side Logging
The API route includes enhanced error logging with:
- **Request ID**: Unique identifier for each request
- **Duration**: How long the request took
- **Context**: All request parameters
- **Stack Traces**: Full error details
- **IP Address**: Client IP for debugging

### Console Output
Server errors appear in the terminal where you run `npm run dev`:
```json
{
  "requestId": "abc123",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "error": {
    "message": "Navigation timeout",
    "stack": "Error: Navigation timeout\n    at ..."
  },
  "context": {
    "url": "https://example.com",
    "format": "png",
    "width": 3840
  },
  "duration": 5000,
  "userAgent": "Mozilla/5.0...",
  "ip": "192.168.1.1"
}
```

## Debugging Workflow

### 1. Reproduce the Error
- Use the screenshot tool normally
- Errors will be automatically captured

### 2. Check the Debug Panel
- Look for the yellow debug panel on the page
- Review error details and context

### 3. Export Error Data
- Click "Export All Errors" to download comprehensive error data
- Share the JSON file for debugging

### 4. Check Server Logs
- Look at the terminal where `npm run dev` is running
- Check for detailed API error logs

### 5. Analyze the Data
- Use the exported JSON to understand error patterns
- Check stack traces for specific failure points
- Review context data for parameter issues

## Error Types

### JavaScript Errors
- Syntax errors in code
- Runtime exceptions
- Type errors
- Reference errors

### API Errors
- Navigation failures
- Timeout errors
- Puppeteer errors
- Network issues

### Fetch Errors
- HTTP status errors (404, 500, etc.)
- Network connectivity issues
- CORS problems
- Request timeouts

## Best Practices

### For Developers
1. **Check Console First**: Always check browser console for immediate errors
2. **Export Error Data**: Use the export feature to get comprehensive error information
3. **Check Server Logs**: Review terminal output for API-specific errors
4. **Reproduce Issues**: Use the same parameters to reproduce errors consistently

### For Users
1. **Report Errors**: If you encounter issues, export the error data and share it
2. **Check Network**: Ensure stable internet connection
3. **Try Different URLs**: Test with various websites to isolate issues
4. **Clear Errors**: Use the clear button to reset error state

## Troubleshooting

### Common Issues
1. **"Navigating frame was detached"**: Website loading issues - try again
2. **"Timeout errors"**: Website too slow - try with different URL
3. **"Connection refused"**: Website down or blocking requests
4. **"SSL errors"**: Try http:// instead of https://

### Error Resolution
1. **Check URL**: Ensure the URL is valid and accessible
2. **Try Different Format**: Switch between PNG, JPEG, WebP
3. **Adjust Width**: Try different viewport widths
4. **Check Network**: Ensure stable internet connection

## Integration

The error capture system is automatically integrated into the Website Screenshot tool. No additional setup is required. The system will:

1. **Auto-initialize** when the component loads
2. **Capture errors** automatically as they occur
3. **Display errors** in the debug panel
4. **Persist errors** in localStorage
5. **Provide export** functionality for debugging

This comprehensive error capture system ensures that all issues can be properly diagnosed and resolved.
