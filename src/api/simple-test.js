export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { type = 'normal' } = req.query;

  // Simple type colors
  const colors = {
    normal: { primary: '#e0e0e0', secondary: '#757575' },
    fire: { primary: '#ff7043', secondary: '#b71c1c' },
    water: { primary: '#4fc3f7', secondary: '#01579b' },
    grass: { primary: '#81c784', secondary: '#388e3c' }
  };

  const color = colors[type] || colors.normal;

  // Very simple SVG test
  const testSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color.secondary};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect x="0" y="0" width="400" height="200" fill="url(#grad)" rx="10"/>
  
  <!-- Test Circle -->
  <circle cx="200" cy="100" r="50" fill="#ffffff" stroke="#000000" stroke-width="2"/>
  
  <!-- Text -->
  <text x="200" y="60" font-family="Arial, sans-serif" font-size="20" font-weight="bold" 
        fill="white" text-anchor="middle">Simple Test</text>
  <text x="200" y="110" font-family="Arial, sans-serif" font-size="16" 
        fill="black" text-anchor="middle">Type: ${type}</text>
  <text x="200" y="130" font-family="Arial, sans-serif" font-size="12" 
        fill="white" text-anchor="middle">Time: ${new Date().toISOString()}</text>
</svg>`;

  // Set headers
  res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.status(200).send(testSvg);
} 