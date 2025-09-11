"use client";
import React, { useState, useRef, useCallback, useEffect } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { 
  FiPlay, 
  FiCopy, 
  FiDownload, 
  FiTrash2, 
  FiPlus, 
  FiMinus, 
  FiSave, 
  FiFolder,
  FiClock,
  FiGlobe,
  FiShield,
  FiCode,
  FiEye,
  FiEyeOff,
  FiSettings,
  FiHistory,
  FiStar,
  FiZap,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiExternalLink,
  FiEdit3,
  FiSend,
  FiRefreshCw
} from 'react-icons/fi';

const CurlTool = () => {
  const [request, setRequest] = useState({
    method: 'GET',
    url: 'https://api.github.com/users/octocat',
    headers: [
      { key: 'Content-Type', value: 'application/json', enabled: true },
      { key: 'User-Agent', value: 'TheToolGuru-cURL/1.0', enabled: true }
    ],
    body: '',
    auth: {
      type: 'none', // none, basic, bearer, api-key
      username: '',
      password: '',
      token: '',
      apiKey: '',
      apiKeyHeader: 'X-API-Key'
    },
    timeout: 30,
    followRedirects: true,
    maxRedirects: 5,
    verifySSL: true,
    includeHeaders: true,
    includeBody: true
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [curlCommand, setCurlCommand] = useState('');
  const [savedRequests, setSavedRequests] = useState([]);
  const [requestHistory, setRequestHistory] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showHeaders, setShowHeaders] = useState(true);
  const [showBody, setShowBody] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState('');
  const [activeTab, setActiveTab] = useState('response'); // response, headers, curl, timing
  const [presets, setPresets] = useState([
    {
      name: 'GitHub API',
      method: 'GET',
      url: 'https://api.github.com/users/octocat',
      headers: [
        { key: 'Accept', value: 'application/vnd.github.v3+json', enabled: true },
        { key: 'User-Agent', value: 'TheToolGuru-cURL/1.0', enabled: true }
      ],
      body: ''
    },
    {
      name: 'JSON POST',
      method: 'POST',
      url: 'https://httpbin.org/post',
      headers: [
        { key: 'Content-Type', value: 'application/json', enabled: true },
        { key: 'Accept', value: 'application/json', enabled: true }
      ],
      body: '{\n  "name": "John Doe",\n  "email": "john@example.com"\n}'
    },
    {
      name: 'Form Data',
      method: 'POST',
      url: 'https://httpbin.org/post',
      headers: [
        { key: 'Content-Type', value: 'application/x-www-form-urlencoded', enabled: true }
      ],
      body: 'name=John+Doe&email=john%40example.com'
    }
  ]);

  const urlInputRef = useRef(null);
  const bodyTextareaRef = useRef(null);

  // Auto-generate cURL command
  useEffect(() => {
    generateCurlCommand();
  }, [request]);

  // Parse cURL command
  const parseCurlCommand = (curlText) => {
    try {
      console.log('Input text:', curlText); // Debug log
      
      // Extract JSON body first (handle multi-line JSON)
      let jsonBody = '';
      const jsonMatch = curlText.match(/--data-raw\s+['"`]([\s\S]*?)['"`]\s*$/m);
      if (jsonMatch) {
        jsonBody = jsonMatch[1].trim();
        console.log('Extracted JSON body:', jsonBody); // Debug log
      }

      // Remove the JSON body from the text for easier parsing
      const textWithoutJson = curlText.replace(/--data-raw\s+['"`][\s\S]*?['"`]\s*$/m, '');
      
      // Clean up the input - remove line continuations
      const cleanedText = textWithoutJson
        .replace(/\\\s*\n\s*/g, ' ') // Replace line continuations with spaces
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .trim();
      
      console.log('Cleaned text:', cleanedText); // Debug log
      
      // Extract method
      let method = 'GET';
      const methodMatch = cleanedText.match(/-X\s+(\w+)/);
      if (methodMatch) {
        method = methodMatch[1].toUpperCase();
      }
      
      // Extract URL
      let url = '';
      const urlMatch = cleanedText.match(/['"](https?:\/\/[^'"]+)['"]/) || cleanedText.match(/(https?:\/\/[^\s]+)/);
      if (urlMatch) {
        url = urlMatch[1];
      }
      
      // Extract headers
      const headers = [];
      const headerMatches = cleanedText.matchAll(/--header\s+['"]([^'"]+)['"]/g);
      for (const match of headerMatches) {
        const headerText = match[1];
        const colonIndex = headerText.indexOf(':');
        if (colonIndex > 0) {
          const key = headerText.substring(0, colonIndex).trim();
          const value = headerText.substring(colonIndex + 1).trim();
          headers.push({ key, value, enabled: true });
        }
      }
      
      // Extract basic auth
      let auth = { type: 'none', username: '', password: '', token: '', apiKey: '', apiKeyHeader: 'X-API-Key' };
      const authMatch = cleanedText.match(/-u\s+['"]([^'"]+)['"]/);
      if (authMatch) {
        const authString = authMatch[1];
        const colonIndex = authString.indexOf(':');
        if (colonIndex > 0) {
          auth = {
            type: 'basic',
            username: authString.substring(0, colonIndex),
            password: authString.substring(colonIndex + 1),
            token: '',
            apiKey: '',
            apiKeyHeader: 'X-API-Key'
          };
        }
      }
      
      // Extract bearer token
      const bearerMatch = cleanedText.match(/Authorization:\s*Bearer\s+([^\s'"]+)/);
      if (bearerMatch) {
        auth = {
          type: 'bearer',
          username: '',
          password: '',
          token: bearerMatch[1],
          apiKey: '',
          apiKeyHeader: 'X-API-Key'
        };
      }

      // If no explicit headers were found, add default ones
      if (headers.length === 0) {
        headers.push(
          { key: 'User-Agent', value: 'TheToolGuru-cURL/1.0', enabled: true }
        );
      }

      const result = {
        method,
        url,
        headers,
        body: jsonBody || '',
        auth
      };
      
      console.log('Final parsed result:', result); // Debug log
      return result;
    } catch (error) {
      console.error('Error parsing cURL command:', error);
      return null;
    }
  };

  const handleImportCurl = () => {
    const parsed = parseCurlCommand(importText);
    console.log('Parsed result:', parsed); // Debug log
    if (parsed && parsed.url) {
      setRequest(prev => ({
        ...prev,
        method: parsed.method,
        url: parsed.url,
        headers: parsed.headers,
        body: parsed.body,
        auth: parsed.auth
      }));
      setShowImport(false);
      setImportText('');
      setError(''); // Clear any previous errors
    } else {
      console.log('Failed to parse:', { parsed, url: parsed?.url }); // Debug log
      setError('Failed to parse cURL command. Please check the format and ensure a valid URL is included.');
    }
  };

  const generateCurlCommand = () => {
    let cmd = `curl -X ${request.method}`;
    
    // Add headers
    request.headers.forEach(header => {
      if (header.enabled && header.key && header.value) {
        cmd += ` \\\n  -H "${header.key}: ${header.value}"`;
      }
    });

    // Add authentication
    if (request.auth.type === 'basic' && request.auth.username && request.auth.password) {
      cmd += ` \\\n  -u "${request.auth.username}:${request.auth.password}"`;
    } else if (request.auth.type === 'bearer' && request.auth.token) {
      cmd += ` \\\n  -H "Authorization: Bearer ${request.auth.token}"`;
    } else if (request.auth.type === 'api-key' && request.auth.apiKey) {
      cmd += ` \\\n  -H "${request.auth.apiKeyHeader}: ${request.auth.apiKey}"`;
    }

    // Add body
    if (request.body && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
      cmd += ` \\\n  -d '${request.body}'`;
    }

    // Add options
    if (!request.verifySSL) {
      cmd += ` \\\n  -k`;
    }
    if (request.followRedirects) {
      cmd += ` \\\n  -L`;
    }
    if (request.maxRedirects !== 5) {
      cmd += ` \\\n  --max-redirs ${request.maxRedirects}`;
    }
    if (request.timeout !== 30) {
      cmd += ` \\\n  --max-time ${request.timeout}`;
    }
    if (request.includeHeaders) {
      cmd += ` \\\n  -i`;
    }

    cmd += ` \\\n  "${request.url}"`;
    
    setCurlCommand(cmd);
  };

  const addHeader = () => {
    setRequest(prev => ({
      ...prev,
      headers: [...prev.headers, { key: '', value: '', enabled: true }]
    }));
  };

  const removeHeader = (index) => {
    setRequest(prev => ({
      ...prev,
      headers: prev.headers.filter((_, i) => i !== index)
    }));
  };

  const updateHeader = (index, field, value) => {
    setRequest(prev => ({
      ...prev,
      headers: prev.headers.map((header, i) => 
        i === index ? { ...header, [field]: value } : header
      )
    }));
  };

  const loadPreset = (preset) => {
    setRequest(prev => ({
      ...prev,
      method: preset.method,
      url: preset.url,
      headers: preset.headers.map(h => ({ ...h, enabled: true })),
      body: preset.body
    }));
  };

  const saveRequest = () => {
    const name = prompt('Enter a name for this request:');
    if (name) {
      const newRequest = {
        id: Date.now(),
        name,
        ...request,
        timestamp: new Date().toISOString()
      };
      setSavedRequests(prev => [...prev, newRequest]);
    }
  };

  const loadSavedRequest = (savedRequest) => {
    setRequest({
      method: savedRequest.method,
      url: savedRequest.url,
      headers: savedRequest.headers,
      body: savedRequest.body,
      auth: savedRequest.auth || request.auth,
      timeout: savedRequest.timeout || request.timeout,
      followRedirects: savedRequest.followRedirects !== undefined ? savedRequest.followRedirects : request.followRedirects,
      maxRedirects: savedRequest.maxRedirects || request.maxRedirects,
      verifySSL: savedRequest.verifySSL !== undefined ? savedRequest.verifySSL : request.verifySSL,
      includeHeaders: savedRequest.includeHeaders !== undefined ? savedRequest.includeHeaders : request.includeHeaders,
      includeBody: savedRequest.includeBody !== undefined ? savedRequest.includeBody : request.includeBody
    });
  };

  const executeRequest = async () => {
    if (!request.url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    setResponse(null);

    try {
      const response = await fetch('/api/curl/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Request failed');
      }

      setResponse(result);
      
      // Add to history
      const historyItem = {
        id: Date.now(),
        method: request.method,
        url: request.url,
        status: result.status,
        timestamp: new Date().toISOString()
      };
      setRequestHistory(prev => [historyItem, ...prev.slice(0, 49)]); // Keep last 50

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyCurlCommand = () => {
    navigator.clipboard.writeText(curlCommand);
  };

  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(response.body);
    }
  };

  const downloadResponse = () => {
    if (response) {
      const blob = new Blob([response.body], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `response-${Date.now()}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const formatResponseTime = (ms) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return 'text-green-600';
    if (status >= 300 && status < 400) return 'text-blue-600';
    if (status >= 400 && status < 500) return 'text-yellow-600';
    if (status >= 500) return 'text-red-600';
    return 'text-gray-600';
  };

  const getStatusIcon = (status) => {
    if (status >= 200 && status < 300) return <FiCheckCircle className="text-green-500" />;
    if (status >= 300 && status < 400) return <FiRefreshCw className="text-blue-500" />;
    if (status >= 400 && status < 500) return <FiAlertCircle className="text-yellow-500" />;
    if (status >= 500) return <FiAlertCircle className="text-red-500" />;
    return <FiInfo className="text-gray-500" />;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">cURL Tool</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Make HTTP requests, test APIs, and generate cURL commands with an intuitive interface designed for developers.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Request Builder */}
        <div className="xl:col-span-2 space-y-6">
          {/* Quick Start Section */}
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <h3 className="text-lg font-semibold text-gray-900">Quick Start</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowImport(!showImport)}>
                  <FiEdit3 className="mr-2" />
                  Import cURL
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              {presets.map((preset, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => loadPreset(preset)}
                  className="justify-start"
                >
                  <FiZap className="mr-2" />
                  {preset.name}
                </Button>
              ))}
            </div>

            {/* Import cURL Section */}
            {showImport && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-blue-900">Import cURL Command</h4>
                  <Button variant="outline" size="sm" onClick={() => setShowImport(false)}>
                    <FiMinus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  Paste a cURL command below and it will automatically populate the form:
                </p>
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder={`curl -X POST 'https://api.example.com/endpoint' --header 'Content-Type: application/json' --data-raw '{"key": "value"}'`}
                  className="w-full h-24 px-3 py-2 border border-blue-300 rounded-md text-sm bg-white text-gray-900 font-mono resize-none"
                />
                <div className="flex gap-2 mt-3">
                  <Button size="sm" onClick={handleImportCurl} disabled={!importText.trim()}>
                    <FiEdit3 className="mr-2" />
                    Import & Parse
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setImportText('')}>
                    Clear
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Request Builder */}
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <h3 className="text-lg font-semibold text-gray-900">Request Builder</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
                  <FiSettings className="mr-2" />
                  {showAdvanced ? 'Hide' : 'Show'} Advanced
                </Button>
              </div>
            </div>

            {/* Method and URL */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
              <select
                value={request.method}
                onChange={(e) => setRequest(prev => ({ ...prev, method: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 min-w-0"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
                <option value="HEAD">HEAD</option>
                <option value="OPTIONS">OPTIONS</option>
              </select>
              
              <input
                ref={urlInputRef}
                type="url"
                value={request.url}
                onChange={(e) => setRequest(prev => ({ ...prev, url: e.target.value }))}
                placeholder="https://api.example.com/endpoint"
                className="md:col-span-3 px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 min-w-0"
              />
            </div>

            {/* Execute Button */}
            <div className="flex gap-3 mb-4">
              <Button 
                onClick={executeRequest} 
                disabled={loading || !request.url.trim()}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending Request...
                  </>
                ) : (
                  <>
                    <FiSend className="mr-2" />
                    Send Request
                  </>
                )}
              </Button>
              
              <Button variant="outline" onClick={saveRequest}>
                <FiSave className="mr-2" />
                Save
              </Button>
            </div>
          </Card>

          {/* Headers */}
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <h3 className="text-lg font-semibold text-gray-900">Headers</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowHeaders(!showHeaders)}>
                  {showHeaders ? <FiEyeOff className="mr-2" /> : <FiEye className="mr-2" />}
                  {showHeaders ? 'Hide' : 'Show'}
                </Button>
                <Button variant="outline" size="sm" onClick={addHeader}>
                  <FiPlus className="mr-2" />
                  Add Header
                </Button>
              </div>
            </div>

            {showHeaders && (
              <div className="space-y-3">
                {request.headers.map((header, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3">
                    <input
                      type="checkbox"
                      checked={header.enabled}
                      onChange={(e) => updateHeader(index, 'enabled', e.target.checked)}
                      className="rounded flex-shrink-0"
                    />
                    <input
                      type="text"
                      value={header.key}
                      onChange={(e) => updateHeader(index, 'key', e.target.value)}
                      placeholder="Header Name"
                      className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
                    />
                    <span className="text-gray-500 flex-shrink-0">:</span>
                    <input
                      type="text"
                      value={header.value}
                      onChange={(e) => updateHeader(index, 'value', e.target.value)}
                      placeholder="Header Value"
                      className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeHeader(index)}
                      className="text-red-600 hover:text-red-700 flex-shrink-0"
                    >
                      <FiMinus />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Authentication */}
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <h3 className="text-lg font-semibold text-gray-900">Authentication</h3>
              <Button variant="outline" size="sm" onClick={() => setShowAuth(!showAuth)}>
                {showAuth ? <FiEyeOff className="mr-2" /> : <FiEye className="mr-2" />}
                {showAuth ? 'Hide' : 'Show'}
              </Button>
            </div>

            {showAuth && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Auth Type</label>
                  <select
                    value={request.auth.type}
                    onChange={(e) => setRequest(prev => ({ 
                      ...prev, 
                      auth: { ...prev.auth, type: e.target.value } 
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
                  >
                    <option value="none">None</option>
                    <option value="basic">Basic Auth</option>
                    <option value="bearer">Bearer Token</option>
                    <option value="api-key">API Key</option>
                  </select>
                </div>

                {request.auth.type === 'basic' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                      <input
                        type="text"
                        value={request.auth.username}
                        onChange={(e) => setRequest(prev => ({ 
                          ...prev, 
                          auth: { ...prev.auth, username: e.target.value } 
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                      <input
                        type="password"
                        value={request.auth.password}
                        onChange={(e) => setRequest(prev => ({ 
                          ...prev, 
                          auth: { ...prev.auth, password: e.target.value } 
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
                      />
                    </div>
                  </div>
                )}

                {request.auth.type === 'bearer' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bearer Token</label>
                    <input
                      type="password"
                      value={request.auth.token}
                      onChange={(e) => setRequest(prev => ({ 
                        ...prev, 
                        auth: { ...prev.auth, token: e.target.value } 
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
                    />
                  </div>
                )}

                {request.auth.type === 'api-key' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                      <input
                        type="password"
                        value={request.auth.apiKey}
                        onChange={(e) => setRequest(prev => ({ 
                          ...prev, 
                          auth: { ...prev.auth, apiKey: e.target.value } 
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Header Name</label>
                      <input
                        type="text"
                        value={request.auth.apiKeyHeader}
                        onChange={(e) => setRequest(prev => ({ 
                          ...prev, 
                          auth: { ...prev.auth, apiKeyHeader: e.target.value } 
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* Request Body */}
          {['POST', 'PUT', 'PATCH'].includes(request.method) && (
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Request Body</h3>
                <Button variant="outline" size="sm" onClick={() => setShowBody(!showBody)}>
                  {showBody ? <FiEyeOff className="mr-2" /> : <FiEye className="mr-2" />}
                  {showBody ? 'Hide' : 'Show'}
                </Button>
              </div>

              {showBody && (
                <textarea
                  ref={bodyTextareaRef}
                  value={request.body}
                  onChange={(e) => setRequest(prev => ({ ...prev, body: e.target.value }))}
                  placeholder="Enter request body (JSON, XML, form data, etc.)"
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 font-mono"
                />
              )}
            </Card>
          )}

          {/* Advanced Options */}
          {showAdvanced && (
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timeout (seconds)</label>
                  <input
                    type="number"
                    min="1"
                    max="300"
                    value={request.timeout}
                    onChange={(e) => setRequest(prev => ({ ...prev, timeout: parseInt(e.target.value) || 30 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Redirects</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={request.maxRedirects}
                    onChange={(e) => setRequest(prev => ({ ...prev, maxRedirects: parseInt(e.target.value) || 5 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={request.followRedirects}
                    onChange={(e) => setRequest(prev => ({ ...prev, followRedirects: e.target.checked }))}
                    className="rounded mr-2"
                  />
                  <label className="text-sm text-gray-700">Follow Redirects</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={request.verifySSL}
                    onChange={(e) => setRequest(prev => ({ ...prev, verifySSL: e.target.checked }))}
                    className="rounded mr-2"
                  />
                  <label className="text-sm text-gray-700">Verify SSL</label>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right Column - Response & Tools */}
        <div className="xl:col-span-1 space-y-6">
          {/* Response */}
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <h3 className="text-lg font-semibold text-gray-900">Response</h3>
              {response && (
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={copyResponse}>
                    <FiCopy className="mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadResponse}>
                    <FiDownload className="mr-2" />
                    Download
                  </Button>
                </div>
              )}
            </div>

            {response ? (
              <>
                {/* Status */}
                <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                  {getStatusIcon(response.status)}
                  <span className={`font-semibold ${getStatusColor(response.status)}`}>
                    {response.status} {response.statusText}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatResponseTime(response.timing?.total || 0)}
                  </span>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-4 overflow-x-auto">
                  {[
                    { id: 'response', label: 'Response', icon: FiCode },
                    { id: 'headers', label: 'Headers', icon: FiGlobe },
                    { id: 'curl', label: 'cURL', icon: FiCopy },
                    { id: 'timing', label: 'Timing', icon: FiClock }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="max-h-96 overflow-auto">
                  {activeTab === 'response' && (
                    <pre className="text-sm text-gray-900 whitespace-pre-wrap font-mono bg-gray-50 p-4 rounded">
                      {response.body}
                    </pre>
                  )}

                  {activeTab === 'headers' && (
                    <div className="space-y-2">
                      {Object.entries(response.headers || {}).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="font-medium text-gray-700">{key}:</span>
                          <span className="text-gray-900 ml-4">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'curl' && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Generated cURL Command</span>
                        <Button variant="outline" size="sm" onClick={copyCurlCommand}>
                          <FiCopy className="mr-2" />
                          Copy
                        </Button>
                      </div>
                      <pre className="text-xs text-gray-900 whitespace-pre-wrap font-mono bg-gray-50 p-4 rounded overflow-x-auto">
                        {curlCommand}
                      </pre>
                    </div>
                  )}

                  {activeTab === 'timing' && response.timing && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Total Time:</span>
                          <span className="ml-2 font-medium">{formatResponseTime(response.timing.total)}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">DNS Lookup:</span>
                          <span className="ml-2 font-medium">{formatResponseTime(response.timing.dns || 0)}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">TCP Connect:</span>
                          <span className="ml-2 font-medium">{formatResponseTime(response.timing.tcp || 0)}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">First Byte:</span>
                          <span className="ml-2 font-medium">{formatResponseTime(response.timing.firstByte || 0)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="text-center py-12">
                <FiSend className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No Response Yet</h4>
                <p className="text-gray-500 mb-4">
                  Send a request to see the response here
                </p>
                <div className="text-sm text-gray-400">
                  <p>• Response body and headers</p>
                  <p>• Generated cURL command</p>
                  <p>• Performance timing data</p>
                </div>
              </div>
            )}
          </Card>

          {/* Error Display */}
          {error && (
            <Card className="border-red-200 bg-red-50">
              <div className="flex items-center gap-3 text-red-700">
                <FiAlertCircle className="h-5 w-5" />
                <div>
                  <p className="font-medium">Request Failed</p>
                  <p className="text-sm text-red-600 mt-1">{error}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Saved Requests */}
          {savedRequests.length > 0 && (
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Saved Requests</h3>
                <span className="text-sm text-gray-500">{savedRequests.length}</span>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {savedRequests.map((saved) => (
                  <div key={saved.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{saved.name}</p>
                      <p className="text-xs text-gray-500 truncate">{saved.method} {saved.url}</p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => loadSavedRequest(saved)}
                      >
                        <FiFolder className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSavedRequests(prev => prev.filter(r => r.id !== saved.id))}
                        className="text-red-600 hover:text-red-700"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Request History */}
          {requestHistory.length > 0 && (
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Requests</h3>
                <span className="text-sm text-gray-500">{requestHistory.length}</span>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {requestHistory.slice(0, 10).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.method} {item.url}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <span className={`text-xs font-medium flex-shrink-0 ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          cURL Tool Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiZap className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Presets</h3>
            <p className="text-gray-600">
              Start with common API patterns and customize as needed
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiShield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Auth</h3>
            <p className="text-gray-600">
              Support for Basic Auth, Bearer tokens, and API keys
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiCode className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">cURL Export</h3>
            <p className="text-gray-600">
              Generate and copy cURL commands for terminal use
            </p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FiClock className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance</h3>
            <p className="text-gray-600">
              Detailed timing information and response analysis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurlTool;
