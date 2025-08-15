"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Button from '../ui/Button';

const GradientMakerTool = () => {
  const [gradientType, setGradientType] = useState('linear');
  const [colors, setColors] = useState([
    { color: '#ff6b6b', stop: 0 },
    { color: '#4ecdc4', stop: 100 }
  ]);
  const [angle, setAngle] = useState(90);
  const [centerX, setCenterX] = useState(50);
  const [centerY, setCenterY] = useState(50);
  const [shape, setShape] = useState('ellipse');
  const [size, setSize] = useState('farthest-corner');
  const [conicAngle, setConicAngle] = useState(0);
  const [conicCenterX, setConicCenterX] = useState(50);
  const [conicCenterY, setConicCenterY] = useState(50);
  const [canvasSize, setCanvasSize] = useState(400);
  const [exportFormat, setExportFormat] = useState('png');
  const [exportQuality, setExportQuality] = useState(0.9);
  
  // New gradient type specific states
  const [waveFrequency, setWaveFrequency] = useState(3);
  const [waveAmplitude, setWaveAmplitude] = useState(50);
  const [blobComplexity, setBlobComplexity] = useState(8);
  const [blobSmoothness, setBlobSmoothness] = useState(0.5);
  const [meshResolution, setMeshResolution] = useState(20);
  const [noiseScale, setNoiseScale] = useState(0.02);
  const [fractalIterations, setFractalIterations] = useState(4);
  const [cssCode, setCssCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [savedGradients, setSavedGradients] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [presetGradients, setPresetGradients] = useState([
    { name: 'Sunset', colors: [{ color: '#ff9a9e', stop: 0 }, { color: '#fecfef', stop: 100 }] },
    { name: 'Ocean', colors: [{ color: '#667eea', stop: 0 }, { color: '#764ba2', stop: 100 }] },
    { name: 'Forest', colors: [{ color: '#11998e', stop: 0 }, { color: '#38ef7d', stop: 100 }] },
    { name: 'Fire', colors: [{ color: '#ff416c', stop: 0 }, { color: '#ff4b2b', stop: 100 }] },
    { name: 'Purple Rain', colors: [{ color: '#667eea', stop: 0 }, { color: '#764ba2', stop: 50 }, { color: '#f093fb', stop: 100 }] },
    { name: 'Aurora', colors: [{ color: '#a8edea', stop: 0 }, { color: '#fed6e3', stop: 100 }] },
    { name: 'Midnight', colors: [{ color: '#2c3e50', stop: 0 }, { color: '#34495e', stop: 50 }, { color: '#2c3e50', stop: 100 }] },
    { name: 'Neon', colors: [{ color: '#ff00ff', stop: 0 }, { color: '#00ffff', stop: 50 }, { color: '#ffff00', stop: 100 }] },
    { name: 'Golden Hour', colors: [{ color: '#ffecd2', stop: 0 }, { color: '#fcb69f', stop: 100 }] },
    { name: 'Deep Space', colors: [{ color: '#0c0c0c', stop: 0 }, { color: '#1a1a2e', stop: 50 }, { color: '#16213e', stop: 100 }] },
    { name: 'Spring', colors: [{ color: '#a8e6cf', stop: 0 }, { color: '#dcedc1', stop: 50 }, { color: '#ffd3b6', stop: 100 }] },
    { name: 'Autumn', colors: [{ color: '#ff9a56', stop: 0 }, { color: '#ff6b6b', stop: 50 }, { color: '#4ecdc4', stop: 100 }] }
  ]);

  const [colorPalette] = useState([
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f',
    '#bb8fce', '#85c1e9', '#f8c471', '#82e0aa', '#f1948a', '#85c1e9', '#f7dc6f', '#bb8fce',
    '#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#1abc9c', '#e67e22', '#34495e',
    '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#f39c12', '#d35400', '#c0392b', '#7f8c8d'
  ]);

  const canvasRef = useRef(null);
  const downloadRef = useRef(null);

  // Enhanced gradient generation functions
  const generateWaveGradient = useCallback((ctx, width, height) => {
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const wave = Math.sin(x * waveFrequency * 0.01) * waveAmplitude + 
                    Math.sin(y * waveFrequency * 0.01) * waveAmplitude;
        const normalizedWave = (wave + waveAmplitude * 2) / (waveAmplitude * 4);
        
        // Interpolate between colors based on wave value
        const colorIndex = Math.floor(normalizedWave * (colors.length - 1));
        const nextColorIndex = Math.min(colorIndex + 1, colors.length - 1);
        const t = normalizedWave * (colors.length - 1) - colorIndex;
        
        const color1 = colors[colorIndex];
        const color2 = colors[nextColorIndex];
        
        const r = Math.round(parseInt(color1.color.slice(1, 3), 16) * (1 - t) + parseInt(color2.color.slice(1, 3), 16) * t);
        const g = Math.round(parseInt(color1.color.slice(3, 5), 16) * (1 - t) + parseInt(color2.color.slice(3, 5), 16) * t);
        const b = Math.round(parseInt(color1.color.slice(5, 7), 16) * (1 - t) + parseInt(color2.color.slice(5, 7), 16) * t);
        
        const index = (y * width + x) * 4;
        data[index] = r;
        data[index + 1] = g;
        data[index + 2] = b;
        data[index + 3] = 255;
      }
    }
    
    return imageData;
  }, [colors, waveFrequency, waveAmplitude]);

  const generateBlobGradient = useCallback((ctx, width, height) => {
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Generate blob shape using multiple sine waves
    const angles = [];
    for (let i = 0; i < blobComplexity; i++) {
      angles.push(Math.random() * Math.PI * 2);
    }
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        
        // Calculate blob radius at this angle
        let radius = 100;
        for (let i = 0; i < blobComplexity; i++) {
          radius += Math.sin(angle * (i + 1) + angles[i]) * blobSmoothness * 50;
        }
        
        const normalizedDistance = Math.max(0, Math.min(1, distance / radius));
        
        // Interpolate colors based on distance
        const colorIndex = Math.floor(normalizedDistance * (colors.length - 1));
        const nextColorIndex = Math.min(colorIndex + 1, colors.length - 1);
        const t = normalizedDistance * (colors.length - 1) - colorIndex;
        
        const color1 = colors[colorIndex];
        const color2 = colors[nextColorIndex];
        
        const r = Math.round(parseInt(color1.color.slice(1, 3), 16) * (1 - t) + parseInt(color2.color.slice(1, 3), 16) * t);
        const g = Math.round(parseInt(color1.color.slice(3, 5), 16) * (1 - t) + parseInt(color2.color.slice(3, 5), 16) * t);
        const b = Math.round(parseInt(color1.color.slice(5, 7), 16) * (1 - t) + parseInt(color2.color.slice(5, 7), 16) * t);
        
        const index = (y * width + x) * 4;
        data[index] = r;
        data[index + 1] = g;
        data[index + 2] = b;
        data[index + 3] = 255;
      }
    }
    
    return imageData;
  }, [colors, blobComplexity, blobSmoothness]);

  const generateMeshGradient = useCallback((ctx, width, height) => {
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const meshX = Math.floor(x / meshResolution);
        const meshY = Math.floor(y / meshResolution);
        const localX = (x % meshResolution) / meshResolution;
        const localY = (y % meshResolution) / meshResolution;
        
        // Create mesh pattern
        const pattern = Math.sin(meshX * 0.5) * Math.cos(meshY * 0.5) * 0.5 + 0.5;
        const localPattern = Math.sin(localX * Math.PI * 2) * Math.sin(localY * Math.PI * 2) * 0.3 + 0.7;
        const combinedPattern = (pattern + localPattern) / 2;
        
        // Interpolate colors
        const colorIndex = Math.floor(combinedPattern * (colors.length - 1));
        const nextColorIndex = Math.min(colorIndex + 1, colors.length - 1);
        const t = combinedPattern * (colors.length - 1) - colorIndex;
        
        const color1 = colors[colorIndex];
        const color2 = colors[nextColorIndex];
        
        const r = Math.round(parseInt(color1.color.slice(1, 3), 16) * (1 - t) + parseInt(color2.color.slice(1, 3), 16) * t);
        const g = Math.round(parseInt(color1.color.slice(3, 5), 16) * (1 - t) + parseInt(color2.color.slice(3, 5), 16) * t);
        const b = Math.round(parseInt(color1.color.slice(5, 7), 16) * (1 - t) + parseInt(color2.color.slice(5, 7), 16) * t);
        
        const index = (y * width + x) * 4;
        data[index] = r;
        data[index + 1] = g;
        data[index + 2] = b;
        data[index + 3] = 255;
      }
    }
    
    return imageData;
  }, [colors, meshResolution]);

  const generateNoiseGradient = useCallback((ctx, width, height) => {
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    // Simple noise function
    const noise = (x, y) => {
      const n = Math.sin(x * noiseScale) * Math.cos(y * noiseScale) * 10000;
      return (n - Math.floor(n));
    };
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const noiseValue = noise(x, y);
        
        // Interpolate colors based on noise
        const colorIndex = Math.floor(noiseValue * (colors.length - 1));
        const nextColorIndex = Math.min(colorIndex + 1, colors.length - 1);
        const t = noiseValue * (colors.length - 1) - colorIndex;
        
        const color1 = colors[colorIndex];
        const color2 = colors[nextColorIndex];
        
        const r = Math.round(parseInt(color1.color.slice(1, 3), 16) * (1 - t) + parseInt(color2.color.slice(1, 3), 16) * t);
        const g = Math.round(parseInt(color1.color.slice(3, 5), 16) * (1 - t) + parseInt(color2.color.slice(3, 5), 16) * t);
        const b = Math.round(parseInt(color1.color.slice(5, 7), 16) * (1 - t) + parseInt(color2.color.slice(5, 7), 16) * t);
        
        const index = (y * width + x) * 4;
        data[index] = r;
        data[index + 1] = g;
        data[index + 2] = b;
        data[index + 3] = 255;
      }
    }
    
    return imageData;
  }, [colors, noiseScale]);

  const generateFractalGradient = useCallback((ctx, width, height) => {
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let zx = (x - width / 2) / (width / 4);
        let zy = (y - height / 2) / (height / 4);
        let iteration = 0;
        let maxIteration = fractalIterations * 10;
        
        while (zx * zx + zy * zy < 4 && iteration < maxIteration) {
          const temp = zx * zx - zy * zy + 0.5;
          zy = 2 * zx * zy + 0.5;
          zx = temp;
          iteration++;
        }
        
        const normalizedIteration = iteration / maxIteration;
        
        // Interpolate colors based on iteration count
        const colorIndex = Math.floor(normalizedIteration * (colors.length - 1));
        const nextColorIndex = Math.min(colorIndex + 1, colors.length - 1);
        const t = normalizedIteration * (colors.length - 1) - colorIndex;
        
        const color1 = colors[colorIndex];
        const color2 = colors[nextColorIndex];
        
        const r = Math.round(parseInt(color1.color.slice(1, 3), 16) * (1 - t) + parseInt(color2.color.slice(1, 3), 16) * t);
        const g = Math.round(parseInt(color1.color.slice(3, 5), 16) * (1 - t) + parseInt(color2.color.slice(3, 5), 16) * t);
        const b = Math.round(parseInt(color1.color.slice(5, 7), 16) * (1 - t) + parseInt(color2.color.slice(5, 7), 16) * t);
        
        const index = (y * width + x) * 4;
        data[index] = r;
        data[index + 1] = g;
        data[index + 2] = b;
        data[index + 3] = 255;
      }
    }
    
    return imageData;
  }, [colors, fractalIterations]);

  // Generate CSS gradient string
  const generateGradientCSS = useCallback(() => {
    let gradientString = '';
    
    if (gradientType === 'linear') {
      gradientString = `linear-gradient(${angle}deg, ${colors.map(c => `${c.color} ${c.stop}%`).join(', ')})`;
    } else if (gradientType === 'radial') {
      gradientString = `radial-gradient(${shape} ${size} at ${centerX}% ${centerY}%, ${colors.map(c => `${c.color} ${c.stop}%`).join(', ')})`;
    } else if (gradientType === 'conic') {
      gradientString = `conic-gradient(from ${conicAngle}deg at ${conicCenterX}% ${conicCenterY}%, ${colors.map(c => `${c.color} ${c.stop}deg`).join(', ')})`;
    } else {
      // For custom gradients, return a fallback
      gradientString = `linear-gradient(${angle}deg, ${colors.map(c => `${c.color} ${c.stop}%`).join(', ')})`;
    }
    
    return gradientString;
  }, [gradientType, colors, angle, centerX, centerY, shape, size, conicAngle, conicCenterX, conicCenterY]);

  // Update CSS code
  useEffect(() => {
    const gradientCSS = generateGradientCSS();
    setCssCode(`background: ${gradientCSS};`);
  }, [generateGradientCSS]);

  // Draw gradient on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    
    // Handle different gradient types
    if (['linear', 'radial', 'conic'].includes(gradientType)) {
      // Create gradient on canvas for standard types
      let gradient;
      if (gradientType === 'linear') {
        const rad = (angle - 90) * Math.PI / 180;
        const x1 = canvasSize * (0.5 - Math.cos(rad) * 0.5);
        const y1 = canvasSize * (0.5 - Math.sin(rad) * 0.5);
        const x2 = canvasSize * (0.5 + Math.cos(rad) * 0.5);
        const y2 = canvasSize * (0.5 + Math.sin(rad) * 0.5);
        gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      } else if (gradientType === 'radial') {
        const cx = (centerX / 100) * canvasSize;
        const cy = (centerY / 100) * canvasSize;
        const radius = canvasSize * 0.7;
        gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      } else {
        // For conic, we'll use a radial approximation
        const cx = (conicCenterX / 100) * canvasSize;
        const cy = (conicCenterY / 100) * canvasSize;
        const radius = canvasSize * 0.7;
        gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      }

      colors.forEach(colorStop => {
        gradient.addColorStop(colorStop.stop / 100, colorStop.color);
      });

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasSize, canvasSize);
    } else {
      // Handle custom gradient types
      let imageData;
      switch (gradientType) {
        case 'wave':
          imageData = generateWaveGradient(ctx, canvasSize, canvasSize);
          break;
        case 'blob':
          imageData = generateBlobGradient(ctx, canvasSize, canvasSize);
          break;
        case 'mesh':
          imageData = generateMeshGradient(ctx, canvasSize, canvasSize);
          break;
        case 'noise':
          imageData = generateNoiseGradient(ctx, canvasSize, canvasSize);
          break;
        case 'fractal':
          imageData = generateFractalGradient(ctx, canvasSize, canvasSize);
          break;
        default:
          // Fallback to linear gradient
          const rad = (angle - 90) * Math.PI / 180;
          const x1 = canvasSize * (0.5 - Math.cos(rad) * 0.5);
          const y1 = canvasSize * (0.5 - Math.sin(rad) * 0.5);
          const x2 = canvasSize * (0.5 + Math.cos(rad) * 0.5);
          const y2 = canvasSize * (0.5 + Math.sin(rad) * 0.5);
          const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
          colors.forEach(colorStop => {
            gradient.addColorStop(colorStop.stop / 100, colorStop.color);
          });
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvasSize, canvasSize);
          return;
      }
      
      ctx.putImageData(imageData, 0, 0);
    }
  }, [generateGradientCSS, canvasSize, gradientType, colors, angle, centerX, centerY, conicCenterX, conicCenterY, generateWaveGradient, generateBlobGradient, generateMeshGradient, generateNoiseGradient, generateFractalGradient]);

  // Add new color stop
  const addColorStop = () => {
    const newStop = Math.max(...colors.map(c => c.stop)) + 25;
    setColors([...colors, { color: '#ffffff', stop: Math.min(newStop, 100) }]);
  };

  // Remove color stop
  const removeColorStop = (index) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  // Update color stop
  const updateColorStop = (index, field, value) => {
    const newColors = [...colors];
    newColors[index] = { ...newColors[index], [field]: value };
    setColors(newColors);
  };

  // Load preset
  const loadPreset = (preset) => {
    setColors(preset.colors);
  };

  // Generate random gradient
  const generateRandomGradient = () => {
    const numColors = Math.floor(Math.random() * 3) + 2; // 2-4 colors
    const newColors = [];
    
    for (let i = 0; i < numColors; i++) {
      const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      const stop = Math.round((i / (numColors - 1)) * 100);
      newColors.push({ color: randomColor, stop });
    }
    
    setColors(newColors);
    
    // Random gradient type including new types
    const gradientTypes = ['linear', 'radial', 'conic', 'wave', 'blob', 'mesh', 'noise', 'fractal'];
    const randomType = gradientTypes[Math.floor(Math.random() * gradientTypes.length)];
    setGradientType(randomType);
    
    // Set random parameters based on type
    setAngle(Math.floor(Math.random() * 360));
    setWaveFrequency(Math.random() * 5 + 1);
    setWaveAmplitude(Math.random() * 50 + 25);
    setBlobComplexity(Math.floor(Math.random() * 8) + 4);
    setBlobSmoothness(Math.random() * 0.5 + 0.3);
    setMeshResolution(Math.floor(Math.random() * 20) + 15);
    setNoiseScale(Math.random() * 0.05 + 0.01);
    setFractalIterations(Math.floor(Math.random() * 5) + 3);
  };

  // Copy CSS to clipboard
  const copyCSS = async () => {
    try {
      await navigator.clipboard.writeText(cssCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy CSS');
    }
  };

  // Save current gradient
  const saveGradient = () => {
    const gradientName = prompt('Enter a name for this gradient:');
    if (gradientName) {
      const gradientData = {
        name: gradientName,
        gradientType,
        colors: [...colors],
        angle,
        centerX,
        centerY,
        shape,
        size,
        conicAngle,
        conicCenterX,
        conicCenterY,
        timestamp: Date.now()
      };
      
      const updated = [...savedGradients, gradientData];
      setSavedGradients(updated);
      localStorage.setItem('savedGradients', JSON.stringify(updated));
    }
  };

  // Load saved gradient
  const loadSavedGradient = (gradient) => {
    setGradientType(gradient.gradientType);
    setColors(gradient.colors);
    setAngle(gradient.angle);
    setCenterX(gradient.centerX);
    setCenterY(gradient.centerY);
    setShape(gradient.shape);
    setSize(gradient.size);
    setConicAngle(gradient.conicAngle);
    setConicCenterX(gradient.conicCenterX);
    setConicCenterY(gradient.conicCenterY);
  };

  // Delete saved gradient
  const deleteSavedGradient = (index) => {
    const updated = savedGradients.filter((_, i) => i !== index);
    setSavedGradients(updated);
    localStorage.setItem('savedGradients', JSON.stringify(updated));
  };

  // Load saved gradients from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedGradients');
    if (saved) {
      setSavedGradients(JSON.parse(saved));
    }
  }, []);

  // Export gradient
  const exportGradient = async () => {
    try {
      if (exportFormat === 'svg') {
        // Use API for SVG export
        const response = await fetch('/api/gradient', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gradientType,
            colors,
            angle,
            centerX,
            centerY,
            shape,
            size,
            conicAngle,
            conicCenterX,
            conicCenterY,
            waveFrequency,
            waveAmplitude,
            blobComplexity,
            blobSmoothness,
            meshResolution,
            noiseScale,
            fractalIterations,
            width: canvasSize,
            height: canvasSize,
            format: 'svg'
          })
        });

        if (!response.ok) throw new Error('Failed to generate SVG');
        
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'gradient.svg';
        link.click();
        URL.revokeObjectURL(url);
      } else {
        // For PNG/JPEG, create a temporary canvas for export
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvasSize;
        tempCanvas.height = canvasSize;
        const tempCtx = tempCanvas.getContext('2d');
        
        // Handle different gradient types for export
        if (['linear', 'radial', 'conic'].includes(gradientType)) {
          // Create gradient on canvas for standard types
          let gradient;
          if (gradientType === 'linear') {
            const rad = (angle - 90) * Math.PI / 180;
            const x1 = canvasSize * (0.5 - Math.cos(rad) * 0.5);
            const y1 = canvasSize * (0.5 - Math.sin(rad) * 0.5);
            const x2 = canvasSize * (0.5 + Math.cos(rad) * 0.5);
            const y2 = canvasSize * (0.5 + Math.sin(rad) * 0.5);
            gradient = tempCtx.createLinearGradient(x1, y1, x2, y2);
          } else if (gradientType === 'radial') {
            const cx = (centerX / 100) * canvasSize;
            const cy = (centerY / 100) * canvasSize;
            const radius = canvasSize * 0.7;
            gradient = tempCtx.createRadialGradient(cx, cy, 0, cx, cy, radius);
          } else {
            // For conic, we'll use a radial approximation
            const cx = (conicCenterX / 100) * canvasSize;
            const cy = (conicCenterY / 100) * canvasSize;
            const radius = canvasSize * 0.7;
            gradient = tempCtx.createRadialGradient(cx, cy, 0, cx, cy, radius);
          }

          colors.forEach(colorStop => {
            gradient.addColorStop(colorStop.stop / 100, colorStop.color);
          });

          tempCtx.fillStyle = gradient;
          tempCtx.fillRect(0, 0, canvasSize, canvasSize);
        } else {
          // Handle custom gradient types
          let imageData;
          switch (gradientType) {
            case 'wave':
              imageData = generateWaveGradient(tempCtx, canvasSize, canvasSize);
              break;
            case 'blob':
              imageData = generateBlobGradient(tempCtx, canvasSize, canvasSize);
              break;
            case 'mesh':
              imageData = generateMeshGradient(tempCtx, canvasSize, canvasSize);
              break;
            case 'noise':
              imageData = generateNoiseGradient(tempCtx, canvasSize, canvasSize);
              break;
            case 'fractal':
              imageData = generateFractalGradient(tempCtx, canvasSize, canvasSize);
              break;
            default:
              // Fallback to linear gradient
              const rad = (angle - 90) * Math.PI / 180;
              const x1 = canvasSize * (0.5 - Math.cos(rad) * 0.5);
              const y1 = canvasSize * (0.5 - Math.sin(rad) * 0.5);
              const x2 = canvasSize * (0.5 + Math.cos(rad) * 0.5);
              const y2 = canvasSize * (0.5 + Math.sin(rad) * 0.5);
              const gradient = tempCtx.createLinearGradient(x1, y1, x2, y2);
              colors.forEach(colorStop => {
                gradient.addColorStop(colorStop.stop / 100, colorStop.color);
              });
              tempCtx.fillStyle = gradient;
              tempCtx.fillRect(0, 0, canvasSize, canvasSize);
              break;
          }
          
          if (imageData) {
            tempCtx.putImageData(imageData, 0, 0);
          }
        }

        // Export canvas
        tempCanvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `gradient.${exportFormat}`;
          link.click();
          URL.revokeObjectURL(url);
        }, `image/${exportFormat}`, exportQuality);
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export gradient. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Gradient Maker</h1>
        <p className="text-lg text-gray-600">
          Create stunning gradients with our comprehensive gradient maker. Generate linear, radial, conic, wave, blob, mesh, noise, and fractal gradients with unlimited color stops. Export up to 16K resolution images.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Controls Panel */}
        <div className="xl:col-span-1 space-y-6">
                     {/* Gradient Type */}
           <div className="bg-gray-50 p-4 rounded-lg">
             <div className="flex justify-between items-center mb-3">
               <h3 className="text-lg font-semibold">Gradient Type</h3>
               <button
                 onClick={generateRandomGradient}
                 className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700"
                 title="Generate Random Gradient"
               >
                 🎲 Random
               </button>
             </div>
             <div className="grid grid-cols-3 gap-2">
               {[
                 { type: 'linear', label: 'Linear', icon: '➡️' },
                 { type: 'radial', label: 'Radial', icon: '⭕' },
                 { type: 'conic', label: 'Conic', icon: '🔄' },
                 { type: 'wave', label: 'Wave', icon: '🌊' },
                 { type: 'blob', label: 'Blob', icon: '🫧' },
                 { type: 'mesh', label: 'Mesh', icon: '🔲' },
                 { type: 'noise', label: 'Noise', icon: '📊' },
                 { type: 'fractal', label: 'Fractal', icon: '🌀' }
               ].map(({ type, label, icon }) => (
                 <button
                   key={type}
                   onClick={() => setGradientType(type)}
                   className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                     gradientType === type
                       ? 'bg-blue-600 text-white'
                       : 'bg-white text-gray-700 hover:bg-gray-100'
                   }`}
                 >
                   <div className="flex flex-col items-center gap-1">
                     <span className="text-lg">{icon}</span>
                     <span>{label}</span>
                   </div>
                 </button>
               ))}
             </div>
           </div>

          {/* Color Stops */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Color Stops</h3>
              <button
                onClick={addColorStop}
                className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
              >
                Add Color
              </button>
            </div>
            <div className="space-y-3">
              {colors.map((colorStop, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="color"
                    value={colorStop.color}
                    onChange={(e) => updateColorStop(index, 'color', e.target.value)}
                    className="w-12 h-10 rounded border-2 border-gray-300 cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={colorStop.stop}
                    onChange={(e) => updateColorStop(index, 'stop', parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={colorStop.stop}
                    onChange={(e) => updateColorStop(index, 'stop', parseInt(e.target.value))}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  {colors.length > 2 && (
                    <button
                      onClick={() => removeColorStop(index)}
                      className="px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Properties */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Properties</h3>
            
            {gradientType === 'linear' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Angle</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={angle}
                      onChange={(e) => setAngle(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      min="0"
                      max="360"
                      value={angle}
                      onChange={(e) => setAngle(parseInt(e.target.value))}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {gradientType === 'radial' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shape</label>
                  <select
                    value={shape}
                    onChange={(e) => setShape(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="circle">Circle</option>
                    <option value="ellipse">Ellipse</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="closest-side">Closest Side</option>
                    <option value="closest-corner">Closest Corner</option>
                    <option value="farthest-side">Farthest Side</option>
                    <option value="farthest-corner">Farthest Corner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Center X (%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={centerX}
                    onChange={(e) => setCenterX(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600">{centerX}%</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Center Y (%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={centerY}
                    onChange={(e) => setCenterY(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600">{centerY}%</div>
                </div>
              </div>
            )}

            {gradientType === 'conic' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Starting Angle</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={conicAngle}
                      onChange={(e) => setConicAngle(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      min="0"
                      max="360"
                      value={conicAngle}
                      onChange={(e) => setConicAngle(parseInt(e.target.value))}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Center X (%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={conicCenterX}
                    onChange={(e) => setConicCenterX(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600">{conicCenterX}%</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Center Y (%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={conicCenterY}
                    onChange={(e) => setConicCenterY(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600">{conicCenterY}%</div>
                </div>
              </div>
            )}

            {gradientType === 'wave' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.1"
                      value={waveFrequency}
                      onChange={(e) => setWaveFrequency(parseFloat(e.target.value))}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      min="1"
                      max="10"
                      step="0.1"
                      value={waveFrequency}
                      onChange={(e) => setWaveFrequency(parseFloat(e.target.value))}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amplitude</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={waveAmplitude}
                      onChange={(e) => setWaveAmplitude(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      min="10"
                      max="100"
                      value={waveAmplitude}
                      onChange={(e) => setWaveAmplitude(parseInt(e.target.value))}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {gradientType === 'blob' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Complexity</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="3"
                      max="15"
                      value={blobComplexity}
                      onChange={(e) => setBlobComplexity(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      min="3"
                      max="15"
                      value={blobComplexity}
                      onChange={(e) => setBlobComplexity(parseInt(e.target.value))}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Smoothness</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      value={blobSmoothness}
                      onChange={(e) => setBlobSmoothness(parseFloat(e.target.value))}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      min="0.1"
                      max="1"
                      step="0.1"
                      value={blobSmoothness}
                      onChange={(e) => setBlobSmoothness(parseFloat(e.target.value))}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {gradientType === 'mesh' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resolution</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="10"
                      max="50"
                      value={meshResolution}
                      onChange={(e) => setMeshResolution(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      min="10"
                      max="50"
                      value={meshResolution}
                      onChange={(e) => setMeshResolution(parseInt(e.target.value))}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {gradientType === 'noise' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Scale</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0.001"
                      max="0.1"
                      step="0.001"
                      value={noiseScale}
                      onChange={(e) => setNoiseScale(parseFloat(e.target.value))}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      min="0.001"
                      max="0.1"
                      step="0.001"
                      value={noiseScale}
                      onChange={(e) => setNoiseScale(parseFloat(e.target.value))}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {gradientType === 'fractal' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Iterations</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={fractalIterations}
                      onChange={(e) => setFractalIterations(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={fractalIterations}
                      onChange={(e) => setFractalIterations(parseInt(e.target.value))}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

                     {/* Color Palette */}
           <div className="bg-gray-50 p-4 rounded-lg">
             <h3 className="text-lg font-semibold mb-3">Color Palette</h3>
             <div className="grid grid-cols-8 gap-1">
               {colorPalette.map((color, index) => (
                 <button
                   key={index}
                   onClick={() => {
                     const newColors = [...colors];
                     if (newColors.length > 0) {
                       newColors[0] = { ...newColors[0], color };
                       setColors(newColors);
                     }
                   }}
                   className="w-8 h-8 rounded border-2 border-gray-300 hover:border-blue-500 transition-colors"
                   style={{ backgroundColor: color }}
                   title={color}
                 />
               ))}
             </div>
           </div>

           {/* Presets */}
           <div className="bg-gray-50 p-4 rounded-lg">
             <h3 className="text-lg font-semibold mb-3">Presets</h3>
             <div className="grid grid-cols-2 gap-2">
               {presetGradients.map((preset, index) => (
                 <button
                   key={index}
                   onClick={() => loadPreset(preset)}
                   className="p-2 rounded-lg border border-gray-300 hover:border-blue-500 transition-colors"
                   style={{
                     background: `linear-gradient(45deg, ${preset.colors.map(c => `${c.color} ${c.stop}%`).join(', ')})`
                   }}
                 >
                   <span className="text-xs font-medium text-white drop-shadow-lg">{preset.name}</span>
                 </button>
               ))}
             </div>
           </div>

          {/* Export Options */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Export</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="svg">SVG</option>
                </select>
              </div>
              {exportFormat !== 'svg' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quality</label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={exportQuality}
                    onChange={(e) => setExportQuality(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600">{Math.round(exportQuality * 100)}%</div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                <select
                  value={canvasSize}
                  onChange={(e) => setCanvasSize(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value={200}>200x200</option>
                  <option value={400}>400x400</option>
                  <option value={800}>800x800</option>
                  <option value={1200}>1200x1200</option>
                  <option value={2048}>2048x2048 (2K)</option>
                  <option value={4096}>4096x4096 (4K)</option>
                  <option value={8192}>8192x8192 (8K)</option>
                  <option value={16384}>16384x16384 (16K)</option>
                </select>
              </div>
              <Button onClick={exportGradient} className="w-full">
                Export Gradient
              </Button>
            </div>
          </div>
        </div>

        {/* Preview and CSS */}
        <div className="xl:col-span-2 space-y-6">
          {/* Preview */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Preview</h3>
            <div className="flex justify-center">
              <canvas
                ref={canvasRef}
                width={canvasSize}
                height={canvasSize}
                className="border border-gray-300 rounded-lg shadow-lg"
                style={{
                  background: generateGradientCSS(),
                  maxWidth: '100%',
                  height: 'auto'
                }}
              />
            </div>
          </div>

                     {/* CSS Code */}
           <div className="bg-gray-50 p-6 rounded-lg">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-semibold">CSS Code</h3>
               <div className="flex gap-2">
                 <button
                   onClick={saveGradient}
                   className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                 >
                   💾 Save
                 </button>
                 <button
                   onClick={copyCSS}
                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                     copied
                       ? 'bg-green-600 text-white'
                       : 'bg-blue-600 text-white hover:bg-blue-700'
                   }`}
                 >
                   {copied ? 'Copied!' : 'Copy CSS'}
                 </button>
               </div>
             </div>
             <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
               <pre>{cssCode}</pre>
             </div>
           </div>

           {/* Saved Gradients */}
           {savedGradients.length > 0 && (
             <div className="bg-gray-50 p-6 rounded-lg">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg font-semibold">Saved Gradients</h3>
                 <button
                   onClick={() => setShowSaved(!showSaved)}
                   className="px-3 py-1 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700"
                 >
                   {showSaved ? 'Hide' : 'Show'}
                 </button>
               </div>
               {showSaved && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                   {savedGradients.map((gradient, index) => (
                     <div key={index} className="bg-white p-3 rounded-lg border flex items-center gap-3">
                       <div
                         className="w-12 h-12 rounded border"
                         style={{
                           background: gradient.gradientType === 'linear' 
                             ? `linear-gradient(${gradient.angle}deg, ${gradient.colors.map(c => `${c.color} ${c.stop}%`).join(', ')})`
                             : gradient.gradientType === 'radial'
                             ? `radial-gradient(${gradient.shape} ${gradient.size} at ${gradient.centerX}% ${gradient.centerY}%, ${gradient.colors.map(c => `${c.color} ${c.stop}%`).join(', ')})`
                             : `conic-gradient(from ${gradient.conicAngle}deg at ${gradient.conicCenterX}% ${gradient.conicCenterY}%, ${gradient.colors.map(c => `${c.color} ${c.stop}deg`).join(', ')})`
                         }}
                       />
                       <div className="flex-1">
                         <div className="font-medium text-sm">{gradient.name}</div>
                         <div className="text-xs text-gray-500">{new Date(gradient.timestamp).toLocaleDateString()}</div>
                       </div>
                       <div className="flex gap-1">
                         <button
                           onClick={() => loadSavedGradient(gradient)}
                           className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                         >
                           Load
                         </button>
                         <button
                           onClick={() => deleteSavedGradient(index)}
                           className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                         >
                           ×
                         </button>
                       </div>
                     </div>
                   ))}
                 </div>
               )}
             </div>
           )}

          {/* Additional CSS Examples */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Additional CSS Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Background</h4>
                <code className="text-sm text-gray-600">background: {cssCode.replace('background: ', '')};</code>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Background Image</h4>
                <code className="text-sm text-gray-600">background-image: {cssCode.replace('background: ', '')};</code>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Border Image</h4>
                <code className="text-sm text-gray-600">border-image: {cssCode.replace('background: ', '')} 1;</code>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Mask Image</h4>
                <code className="text-sm text-gray-600">mask-image: {cssCode.replace('background: ', '')};</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientMakerTool;
