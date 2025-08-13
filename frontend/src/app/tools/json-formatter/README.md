# JSON Formatter & Validator

A comprehensive tool for formatting, validating, and analyzing JSON data.

## Features

### Core Functionality
- **JSON Formatting**: Beautify JSON with customizable indentation (2, 4, 8 spaces, or no indent)
- **JSON Minification**: Remove all unnecessary whitespace for production use
- **JSON Validation**: Real-time syntax validation with detailed error messages
- **Auto-validation**: Validates JSON as you type (with 500ms debouncing)

### Sample Data
- **Simple Object**: Basic key-value pairs
- **Nested Object**: Complex nested structures
- **Array Example**: Array of objects
- **API Response**: Typical API response structure

### Statistics & Analysis
- **Key Count**: Total number of keys in the JSON
- **Value Count**: Total number of values
- **Maximum Depth**: Deepest nesting level
- **Type Breakdown**: Count of strings, numbers, booleans, nulls, arrays, and objects

### User Experience
- **Visual Feedback**: Color-coded input validation (green for valid, red for invalid)
- **Copy to Clipboard**: Easy copying of formatted/minified output
- **Responsive Design**: Works on all device sizes
- **Privacy-First**: All processing happens in your browser

## Usage

1. **Load Sample Data**: Click any sample button to load example JSON
2. **Input JSON**: Paste or type your JSON data in the input area
3. **Choose Action**: 
   - **Format JSON**: Beautify with proper indentation
   - **Minify JSON**: Remove whitespace for production
   - **Validate Only**: Check syntax without formatting
4. **View Results**: See formatted output, validation status, and statistics
5. **Copy Output**: Use the copy button to get the result

## Technical Details

- Built with React and Next.js
- Uses native `JSON.parse()` and `JSON.stringify()` for reliability
- Responsive Tailwind CSS design
- No external dependencies for JSON processing
- Client-side only for privacy and performance

## Use Cases

- **API Development**: Format and validate API responses
- **Debugging**: Beautify minified JSON for readability
- **Documentation**: Prepare JSON examples for documentation
- **Data Analysis**: Understand JSON structure and complexity
- **Code Review**: Validate JSON before committing to repositories
