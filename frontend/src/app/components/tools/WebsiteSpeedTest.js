"use client";
import React, { useState, useCallback, useRef, useEffect } from 'react';
import Button from '../ui/Button';

// Real-time Speed Chart Component
const RealTimeSpeedChart = ({ dataPoints = [], isActive = false, testPhase = '' }) => {
  const chartHeight = 300;
  const chartWidth = 600;
  const padding = 50;
  const maxSpeed = Math.max(...dataPoints.map(d => Math.max(d.download || 0, d.upload || 0)), 100);
  const maxPing = Math.max(...dataPoints.map(d => d.ping || 0), 200);

  // Calculate chart dimensions
  const chartAreaWidth = chartWidth - padding * 2;
  const chartAreaHeight = chartHeight - padding * 2;
  const timeRange = 8; // 15 seconds
  const speedRange = maxSpeed;
  const pingRange = maxPing;

  // Generate grid lines for speed
  const speedGridLines = [0, 25, 50, 75, 100, 150, 200, 250, 300, 400, 500].filter(speed => speed <= maxSpeed);
  const pingGridLines = [0, 50, 100, 150, 200, 300, 400, 500].filter(ping => ping <= maxPing);

  // Smooth curve interpolation function
  const createSmoothPath = (data, key) => {
    if (data.length < 2) return '';
    
    const points = data.map(point => ({
      x: padding + (point.time / timeRange) * chartAreaWidth,
      y: chartHeight - padding - ((point[key] || 0) / (key === 'ping' ? pingRange : speedRange)) * chartAreaHeight
    }));

    if (points.length === 2) {
      return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
    }

    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1];
      
      if (next) {
        // Create smooth curve using quadratic bezier
        const cp1x = prev.x + (curr.x - prev.x) * 0.5;
        const cp1y = prev.y;
        const cp2x = curr.x - (next.x - curr.x) * 0.5;
        const cp2y = curr.y;
        
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
      } else {
        // Last point - use line
        path += ` L ${curr.x} ${curr.y}`;
      }
    }
    
    return path;
  };

  // Convert data points to SVG coordinates with smoothing
  const getSpeedPath = (data, key) => {
    if (data.length < 2) return '';
    return createSmoothPath(data, key);
  };

  const getPingPath = (data) => {
    if (data.length < 2) return '';
    return createSmoothPath(data, 'ping');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Real-Time Speed Test</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Download</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Upload</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Ping</span>
          </div>
        </div>
      </div>

      {isActive && (
        <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-700 font-medium">
            🚀 {testPhase} - {dataPoints.length > 0 ? `${dataPoints[dataPoints.length - 1].time.toFixed(1)}s` : '0s'} / 15s
          </p>
        </div>
      )}

      <svg width={chartWidth} height={chartHeight} className="mx-auto">
        {/* Background */}
        <rect width={chartWidth} height={chartHeight} fill="#fafafa" rx="8" />
        
        {/* Speed Grid Lines */}
        {speedGridLines.map((speed) => {
          const y = chartHeight - padding - (speed / speedRange) * chartAreaHeight;
          return (
            <g key={`speed-${speed}`}>
              <line
                x1={padding}
                y1={y}
                x2={chartWidth - padding}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              <text x={padding - 5} y={y + 3} textAnchor="end" fontSize="10" fill="#6b7280">
                {speed} Mbps
              </text>
            </g>
          );
        })}

        {/* Ping Grid Lines */}
        {pingGridLines.map((ping) => {
          const y = chartHeight - padding - (ping / pingRange) * chartAreaHeight;
          return (
            <g key={`ping-${ping}`}>
              <line
                x1={padding}
                y1={y}
                x2={chartWidth - padding}
                y2={y}
                stroke="#f3e8ff"
                strokeWidth="1"
                strokeDasharray="1,3"
              />
              <text x={chartWidth - padding + 5} y={y + 3} textAnchor="start" fontSize="10" fill="#8b5cf6">
                {ping}ms
              </text>
            </g>
          );
        })}

        {/* Time Grid Lines */}
        {[0, 3, 6, 9, 12, 15].map((time) => {
          const x = padding + (time / timeRange) * chartAreaWidth;
          return (
            <g key={`time-${time}`}>
              <line
                x1={x}
                y1={padding}
                x2={x}
                y2={chartHeight - padding}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <text x={x} y={chartHeight - padding + 15} textAnchor="middle" fontSize="10" fill="#6b7280">
                {time}s
              </text>
            </g>
          );
        })}

        {/* Download Speed Line with gradient */}
        {dataPoints.length > 1 && (
          <defs>
            <linearGradient id="downloadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        )}

        {/* Download Speed Line */}
        {dataPoints.length > 1 && (
          <path
            d={getSpeedPath(dataPoints, 'download')}
            stroke="#3b82f6"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))' }}
          />
        )}

        {/* Upload Speed Line */}
        {dataPoints.length > 1 && (
          <path
            d={getSpeedPath(dataPoints, 'upload')}
            stroke="#10b981"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3))' }}
          />
        )}

        {/* Ping Line */}
        {dataPoints.length > 1 && (
          <path
            d={getPingPath(dataPoints)}
            stroke="#8b5cf6"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4,2"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(139, 92, 246, 0.3))' }}
          />
        )}

        {/* Data Points with smooth animations */}
        {dataPoints.map((point, index) => {
          const x = padding + (point.time / timeRange) * chartAreaWidth;
          const downloadY = chartHeight - padding - ((point.download || 0) / speedRange) * chartAreaHeight;
          const uploadY = chartHeight - padding - ((point.upload || 0) / speedRange) * chartAreaHeight;
          const pingY = chartHeight - padding - ((point.ping || 0) / pingRange) * chartAreaHeight;
          
          return (
            <g key={index}>
              {/* Download point */}
              {point.download && (
                <circle
                  cx={x}
                  cy={downloadY}
                  r="4"
                  fill="#3b82f6"
                  stroke="white"
                  strokeWidth="2"
                  style={{ 
                    filter: 'drop-shadow(0 1px 2px rgba(59, 130, 246, 0.5))',
                    animation: isActive ? 'pulse 2s infinite' : 'none'
                  }}
                />
              )}
              {/* Upload point */}
              {point.upload && (
                <circle
                  cx={x}
                  cy={uploadY}
                  r="4"
                  fill="#10b981"
                  stroke="white"
                  strokeWidth="2"
                  style={{ 
                    filter: 'drop-shadow(0 1px 2px rgba(16, 185, 129, 0.5))',
                    animation: isActive ? 'pulse 2s infinite' : 'none'
                  }}
                />
              )}
              {/* Ping point */}
              {point.ping && (
                <circle
                  cx={x}
                  cy={pingY}
                  r="3"
                  fill="#8b5cf6"
                  stroke="white"
                  strokeWidth="2"
                  style={{ 
                    filter: 'drop-shadow(0 1px 2px rgba(139, 92, 246, 0.5))',
                    animation: isActive ? 'pulse 2s infinite' : 'none'
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Current values display with improved styling */}
        {dataPoints.length > 0 && (
          <g>
            <rect
              x={chartWidth - 120}
              y={10}
              width="110"
              height="80"
              fill="rgba(255,255,255,0.95)"
              stroke="#e5e7eb"
              strokeWidth="1"
              rx="6"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            />
            <text x={chartWidth - 115} y={25} fontSize="10" fill="#374151" fontWeight="bold">
              Current Values:
            </text>
            <text x={chartWidth - 115} y={40} fontSize="9" fill="#3b82f6" fontWeight="500">
              ↓ {(dataPoints[dataPoints.length - 1].download || 0).toFixed(1)} Mbps
            </text>
            <text x={chartWidth - 115} y={55} fontSize="9" fill="#10b981" fontWeight="500">
              ↑ {(dataPoints[dataPoints.length - 1].upload || 0).toFixed(1)} Mbps
            </text>
            <text x={chartWidth - 115} y={70} fontSize="9" fill="#8b5cf6" fontWeight="500">
              ⚡ {(dataPoints[dataPoints.length - 1].ping || 0).toFixed(0)}ms
            </text>
          </g>
        )}
      </svg>

      {/* CSS for smooth animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>

      {!isActive && dataPoints.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Start a speed test to see real-time measurements</p>
        </div>
      )}
    </div>
  );
};

const WebsiteSpeedTest = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [testHistory, setTestHistory] = useState([]);
  const [testProgress, setTestProgress] = useState({ current: '', percentage: 0 });
  const [showTips, setShowTips] = useState(false);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const [showChart, setShowChart] = useState(true);
  const [realTimeData, setRealTimeData] = useState([]);
  const [testPhase, setTestPhase] = useState('');
  const abortControllerRef = useRef(null);
  const dataIntervalRef = useRef(null);

  // Better test servers for actual speed testing
  const testServers = [
    { 
      name: 'Cloudflare', 
      downloadUrl: 'https://speed.cloudflare.com/__down?bytes=25000000', // 25MB
      pingUrl: 'https://www.cloudflare.com'
    },
    { 
      name: 'Fast.com', 
      downloadUrl: 'https://fast.com',
      pingUrl: 'https://www.fast.com'
    },
    { 
      name: 'Google', 
      downloadUrl: 'https://www.google.com',
      pingUrl: 'https://www.google.com'
    }
  ];

  // Large file URLs for more accurate speed testing
  const speedTestFiles = [
    'https://speed.cloudflare.com/__down?bytes=10000000', // 10MB
    'https://speed.cloudflare.com/__down?bytes=25000000', // 25MB
    'https://speed.cloudflare.com/__down?bytes=50000000', // 50MB
  ];

  const measurePing = async (serverUrl) => {
    const startTime = performance.now();
    try {
      const response = await fetch(serverUrl, { 
        method: 'HEAD',
        mode: 'no-cors',
        signal: abortControllerRef.current?.signal 
      });
      const endTime = performance.now();
      const ping = Math.round(endTime - startTime);
      
      // Add ping data point to real-time chart
      setRealTimeData(prev => [...prev, {
        time: (endTime - startTime) / 1000,
        download: prev.length > 0 ? prev[prev.length - 1].download : 0,
        upload: prev.length > 0 ? prev[prev.length - 1].upload : 0,
        ping: ping
      }]);
      
      return ping;
    } catch (error) {
      if (error.name === 'AbortError') throw error;
      return null;
    }
  };

  const measureDownloadSpeed = async (testUrl, duration = 10000) => {
    const startTime = performance.now();
    let totalBytes = 0;
    let lastUpdate = startTime;
    let lastDataPoint = startTime;

    try {
      const response = await fetch(testUrl, {
        signal: abortControllerRef.current?.signal
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const contentLength = response.headers.get('content-length');
      const expectedBytes = contentLength ? parseInt(contentLength, 10) : 0;

      while (performance.now() - startTime < duration) {
        const { done, value } = await reader.read();
        if (done) break;
        
        totalBytes += value.length;
        
        // Update progress and real-time data every 500ms
        const now = performance.now();
        if (now - lastUpdate > 500) {
          const elapsed = (now - startTime) / 1000;
          const currentSpeed = (totalBytes * 8) / (1024 * 1024 * elapsed);
          
          setTestProgress({
            current: `Downloading... ${formatBytes(totalBytes)} at ${formatSpeed(currentSpeed)}`,
            percentage: expectedBytes ? (totalBytes / expectedBytes) * 100 : 0
          });

          // Add real-time data point
          setRealTimeData(prev => [...prev, {
            time: elapsed,
            download: Math.round(currentSpeed * 100) / 100,
            upload: prev.length > 0 ? prev[prev.length - 1].upload : 0,
            ping: prev.length > 0 ? prev[prev.length - 1].ping : 0
          }]);

          lastUpdate = now;
        }
      }

      const endTime = performance.now();
      const durationSeconds = (endTime - startTime) / 1000;
      const speedMbps = (totalBytes * 8) / (1024 * 1024 * durationSeconds);
      
      return {
        speed: Math.round(speedMbps * 100) / 100,
        bytes: totalBytes,
        duration: durationSeconds
      };
    } catch (error) {
      if (error.name === 'AbortError') throw error;
      console.error('Download speed test failed:', error);
      return null;
    }
  };

  const measureUploadSpeed = async (testUrl, duration = 5000) => {
    const startTime = performance.now();
    let totalBytes = 0;
    const chunkSize = 1024 * 1024; // 1MB chunks
    let lastUpdate = startTime;

    try {
      while (performance.now() - startTime < duration) {
        const testData = new Uint8Array(chunkSize);
        // Fill with random data
        for (let i = 0; i < chunkSize; i++) {
          testData[i] = Math.floor(Math.random() * 256);
        }

        const response = await fetch(testUrl, {
          method: 'POST',
          body: testData,
          signal: abortControllerRef.current?.signal
        });
        
        if (response.ok) {
          totalBytes += chunkSize;
          
          // Update progress and real-time data
          const now = performance.now();
          if (now - lastUpdate > 500) {
            const elapsed = (now - startTime) / 1000;
            const currentSpeed = (totalBytes * 8) / (1024 * 1024 * elapsed);
            
            setTestProgress({
              current: `Uploading... ${formatBytes(totalBytes)} at ${formatSpeed(currentSpeed)}`,
              percentage: 0
            });

            // Add real-time data point
            setRealTimeData(prev => [...prev, {
              time: elapsed,
              download: prev.length > 0 ? prev[prev.length - 1].download : 0,
              upload: Math.round(currentSpeed * 100) / 100,
              ping: prev.length > 0 ? prev[prev.length - 1].ping : 0
            }]);

            lastUpdate = now;
          }
        }
      }

      const endTime = performance.now();
      const durationSeconds = (endTime - startTime) / 1000;
      const speedMbps = (totalBytes * 8) / (1024 * 1024 * durationSeconds);
      
      return {
        speed: Math.round(speedMbps * 100) / 100,
        bytes: totalBytes,
        duration: durationSeconds
      };
    } catch (error) {
      if (error.name === 'AbortError') throw error;
      console.error('Upload speed test failed:', error);
      return null;
    }
  };

  const getConnectionInfo = () => {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      return {
        effectiveType: connection.effectiveType || 'Unknown',
        downlink: connection.downlink || 'Unknown',
        rtt: connection.rtt || 'Unknown',
        saveData: connection.saveData || false
      };
    }
    return null;
  };

  const getSpeedRating = (speed) => {
    if (speed >= 100) return { label: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (speed >= 50) return { label: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (speed >= 25) return { label: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (speed >= 10) return { label: 'Poor', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { label: 'Very Poor', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const getPingRating = (ping) => {
    if (ping <= 20) return { label: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (ping <= 50) return { label: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (ping <= 100) return { label: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (ping <= 200) return { label: 'Poor', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { label: 'Very Poor', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const runSpeedTest = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setResults(null);
    setTestProgress({ current: 'Initializing test...', percentage: 0 });
    setRealTimeData([]); // Clear previous data
    setTestPhase('Initializing...');
    
    // Create abort controller for the test
    abortControllerRef.current = new AbortController();

    try {
      const testStartTime = Date.now();
      const connectionInfo = getConnectionInfo();
      
      // Step 1: Measure ping to multiple servers
      setTestPhase('Ping Test');
      const pingResults = [];
      for (const server of testServers) {
        const ping = await measurePing(server.pingUrl);
        if (ping !== null) {
          pingResults.push({ server: server.name, ping });
        }
      }
      
      const avgPing = pingResults.length > 0 
        ? Math.round(pingResults.reduce((sum, r) => sum + r.ping, 0) / pingResults.length)
        : null;

      // Step 2: Measure download speed using multiple file sizes
      setTestPhase('Download Speed Test');
      let downloadResult = null;
      let bestSpeed = 0;

      for (const fileUrl of speedTestFiles) {
        try {
          const result = await measureDownloadSpeed(fileUrl, 8000); // 8 seconds per file
          if (result && result.speed > bestSpeed) {
            downloadResult = result;
            bestSpeed = result.speed;
          }
        } catch (error) {
          console.error('Download test failed for:', fileUrl, error);
        }
      }

      // Step 3: Measure upload speed (simulated for now)
      setTestPhase('Upload Speed Test');
      let uploadResult = null;
      
      // Try to measure actual upload speed
      try {
        uploadResult = await measureUploadSpeed('https://httpbin.org/post', 5000);
      } catch (error) {
        // Fallback to estimated upload speed
        if (downloadResult) {
          uploadResult = {
            speed: Math.round(downloadResult.speed * 0.3 * 100) / 100,
            bytes: downloadResult.bytes * 0.3,
            duration: downloadResult.duration
          };
        }
      }

      const testEndTime = Date.now();
      const totalDuration = testEndTime - testStartTime;

      setTestProgress({ current: 'Completing test...', percentage: 100 });
      setTestPhase('Test Complete');

      const result = {
        timestamp: new Date().toISOString(),
        url: url.trim() || 'Local Internet Connection',
        ping: avgPing,
        pingResults,
        download: downloadResult,
        upload: uploadResult,
        connectionInfo,
        totalDuration,
        downloadRating: downloadResult ? getSpeedRating(downloadResult.speed) : null,
        uploadRating: uploadResult ? getSpeedRating(uploadResult.speed) : null,
        pingRating: avgPing ? getPingRating(avgPing) : null
      };

      setResults(result);
      
      // Add to history
      setTestHistory(prev => [result, ...prev.slice(0, 9)]);
      
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError('Speed test failed. Please check your internet connection and try again.');
        console.error('Speed test error:', error);
      }
    } finally {
      setIsLoading(false);
      setTestProgress({ current: '', percentage: 0 });
      setTestPhase('');
      abortControllerRef.current = null;
    }
  }, [url]);

  const stopTest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const formatSpeed = (speed) => {
    if (speed >= 1000) return `${(speed / 1000).toFixed(1)} Gbps`;
    return `${speed} Mbps`;
  };

  const formatBytes = (bytes) => {
    if (bytes >= 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${bytes} B`;
  };

  const getTroubleshootingTips = (results) => {
    const tips = [];
    
    if (results.download && results.download.speed < 25) {
      tips.push('Your download speed is below recommended levels. Try:');
      tips.push('• Restart your router and modem');
      tips.push('• Move closer to your WiFi router');
      tips.push('• Close other applications using internet');
      tips.push('• Contact your ISP if issues persist');
    }
    
    if (results.upload && results.upload.speed < 10) {
      tips.push('Your upload speed is very slow. Consider:');
      tips.push('• Upgrading your internet plan');
      tips.push('• Using a wired connection instead of WiFi');
      tips.push('• Checking for background uploads');
    }
    
    if (results.ping && results.ping > 100) {
      tips.push('High ping detected. Try:');
      tips.push('• Using a wired connection');
      tips.push('• Moving closer to your router');
      tips.push('• Closing other network applications');
      tips.push('• Checking for network congestion');
    }
    
    if (tips.length === 0) {
      tips.push('Your connection looks good! For even better performance:');
      tips.push('• Use a wired connection when possible');
      tips.push('• Keep your router firmware updated');
      tips.push('• Position your router centrally');
      tips.push('• Consider upgrading your plan for heavy usage');
    }
    
    return tips;
  };



  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Internet Speed Test</h1>
            <p className="text-gray-600">
              Test your actual internet connection speed, ping, and performance metrics in real-time.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isLoading ? (
              <Button variant="danger" size="sm" onClick={stopTest}>
                ⏹️ Stop Test
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={runSpeedTest}>
                🚀 Start Test
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={runSpeedTest} 
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            ⚡ Quick Test
          </Button>
          <Button 
            variant="outline"
            onClick={() => setShowTips(!showTips)}
            className="flex items-center gap-2"
          >
            💡 Speed Tips
          </Button>
          <Button 
            variant="outline"
            onClick={() => setShowTroubleshooting(!showTroubleshooting)}
            className="flex items-center gap-2"
          >
            🔧 Troubleshooting
          </Button>
          {results && (
            <>
              <Button 
                variant="outline"
                onClick={() => setShowChart(!showChart)}
                className="flex items-center gap-2"
              >
                {showChart ? '📊 Hide Chart' : '📊 Show Chart'}
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.print()}
                className="flex items-center gap-2"
              >
                📄 Print Results
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Tips Panel */}
      {showTips && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">🚀 Speed Test Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 className="font-semibold mb-2">Before Testing:</h4>
              <ul className="space-y-1">
                <li>• Close other applications and browser tabs</li>
                <li>• Disconnect other devices from your network</li>
                <li>• Use a wired connection if possible</li>
                <li>• Restart your router if speeds are slow</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">During Testing:</h4>
              <ul className="space-y-1">
                <li>• Don't use other internet applications</li>
                <li>• Stay close to your WiFi router</li>
                <li>• Run multiple tests for accuracy</li>
                <li>• Test at different times of day</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Troubleshooting Panel */}
      {showTroubleshooting && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 mb-3">🔧 Common Issues & Solutions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-red-700">
            <div>
              <h4 className="font-semibold mb-2">Slow Download Speed:</h4>
              <ul className="space-y-1">
                <li>• Restart your router and modem</li>
                <li>• Check for background downloads</li>
                <li>• Move closer to WiFi router</li>
                <li>• Contact your ISP</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">High Ping/Latency:</h4>
              <ul className="space-y-1">
                <li>• Use wired connection instead of WiFi</li>
                <li>• Close gaming/video applications</li>
                <li>• Check for network congestion</li>
                <li>• Consider upgrading your plan</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* URL Input (Optional) */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Website URL (Optional)</label>
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com (leave empty for general speed test)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600"
            disabled={isLoading}
          />
          <Button 
            onClick={runSpeedTest} 
            disabled={isLoading}
            className="whitespace-nowrap flex items-center gap-2"
          >
            {isLoading ? '⏳ Testing...' : '📊 Test Speed'}
          </Button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>

      {/* Loading State with Progress */}
      {isLoading && (
        <div className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <div className="flex-1">
              <p className="text-blue-800 font-medium">{testProgress.current}</p>
              <p className="text-blue-600 text-sm">This may take 10-15 seconds</p>
            </div>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${testProgress.percentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Real-time Chart during test */}
      {showChart && (isLoading || realTimeData.length > 0) && (
        <div className="mb-6">
          <RealTimeSpeedChart 
            dataPoints={realTimeData} 
            isActive={isLoading} 
            testPhase={testPhase}
          />
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Test Results</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowChart(!showChart)}
              >
                {showChart ? '📊 Hide Chart' : '📊 Show Chart'}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowTroubleshooting(!showTroubleshooting)}
              >
                🔧 Get Help
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.print()}
              >
                📄 Print
              </Button>
            </div>
          </div>
          
          {/* Main Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Download Speed */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-blue-800">Download Speed</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${results.downloadRating?.bg} ${results.downloadRating?.color}`}>
                  {results.downloadRating?.label}
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-900">
                {results.download ? formatSpeed(results.download.speed) : 'N/A'}
              </p>
              {results.download && (
                <p className="text-xs text-blue-600 mt-1">
                  {formatBytes(results.download.bytes)} in {results.download.duration.toFixed(1)}s
                </p>
              )}
            </div>

            {/* Upload Speed */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-green-800">Upload Speed</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${results.uploadRating?.bg} ${results.uploadRating?.color}`}>
                  {results.uploadRating?.label}
                </span>
              </div>
              <p className="text-2xl font-bold text-green-900">
                {results.upload ? formatSpeed(results.upload.speed) : 'N/A'}
              </p>
              {results.upload && (
                <p className="text-xs text-green-600 mt-1">
                  {formatBytes(results.upload.bytes)} in {results.upload.duration.toFixed(1)}s
                </p>
              )}
            </div>

            {/* Ping */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-purple-800">Ping</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${results.pingRating?.bg} ${results.pingRating?.color}`}>
                  {results.pingRating?.label}
                </span>
              </div>
              <p className="text-2xl font-bold text-purple-900">
                {results.ping ? `${results.ping}ms` : 'N/A'}
              </p>
              <p className="text-xs text-purple-600 mt-1">
                Average response time
              </p>
            </div>
          </div>





          {/* Troubleshooting Tips for Results */}
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h3 className="text-sm font-semibold text-orange-800 mb-2">💡 Recommendations</h3>
            <ul className="text-sm text-orange-700 space-y-1">
              {getTroubleshootingTips(results).map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          {/* Detailed Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Connection Info */}
            {results.connectionInfo && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Connection Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Connection Type:</span>
                    <span className="font-medium">{results.connectionInfo.effectiveType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Downlink:</span>
                    <span className="font-medium">{results.connectionInfo.downlink} Mbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">RTT:</span>
                    <span className="font-medium">{results.connectionInfo.rtt}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data Saver:</span>
                    <span className="font-medium">{results.connectionInfo.saveData ? 'Enabled' : 'Disabled'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Ping Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Server Response Times</h3>
              <div className="space-y-2 text-sm">
                {results.pingResults.map((result, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-600">{result.server}:</span>
                    <span className="font-medium">{result.ping}ms</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Test Info */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-700">
              <strong>Test Type:</strong> {results.url} | 
              <strong> Test Duration:</strong> {Math.round(results.totalDuration / 1000)}s | 
              <strong> Timestamp:</strong> {new Date(results.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Test History */}
      {testHistory.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Recent Tests</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setTestHistory([])}
            >
              🗑️ Clear History
            </Button>
          </div>
          <div className="space-y-2">
            {testHistory.map((test, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{test.url}</p>
                  <p className="text-sm text-gray-600">
                    {test.download ? `${formatSpeed(test.download.speed)} ↓` : 'N/A'} | 
                    {test.upload ? ` ${formatSpeed(test.upload.speed)} ↑` : 'N/A'} | 
                    {test.ping ? ` ${test.ping}ms ping` : 'N/A'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">
                    {new Date(test.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">About Speed Testing</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Tests your actual internet connection speed</li>
            <li>• Downloads large files to measure real bandwidth</li>
            <li>• Measures upload speed by sending data</li>
            <li>• Tests multiple servers for accurate ping</li>
            <li>• Results reflect your actual connection performance</li>
          </ul>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <h3 className="text-sm font-semibold text-green-800 mb-2">Speed Guidelines</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• <strong>100+ Mbps:</strong> Excellent for streaming 4K, gaming</li>
            <li>• <strong>50-100 Mbps:</strong> Good for HD streaming, video calls</li>
            <li>• <strong>25-50 Mbps:</strong> Adequate for basic streaming</li>
            <li>• <strong>10-25 Mbps:</strong> Minimum for web browsing</li>
            <li>• <strong>Below 10 Mbps:</strong> May experience slow loading</li>
          </ul>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-md p-4">
          <h3 className="text-sm font-semibold text-purple-800 mb-2">When to Test</h3>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• <strong>Morning:</strong> Usually fastest speeds</li>
            <li>• <strong>Evening:</strong> May be slower due to congestion</li>
            <li>• <strong>Weekends:</strong> Often slower than weekdays</li>
            <li>• <strong>After changes:</strong> Test after router restarts</li>
            <li>• <strong>Regular monitoring:</strong> Test weekly for trends</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WebsiteSpeedTest;
