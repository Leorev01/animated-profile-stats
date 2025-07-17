export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Simple test SVG
  const testSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ff6b6b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4ecdc4;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect x="0" y="0" width="400" height="200" fill="url(#grad)" rx="10"/>
  
  <!-- Text -->
  <text x="200" y="80" font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
        fill="white" text-anchor="middle">SVG Test Card</text>
  <text x="200" y="120" font-family="Arial, sans-serif" font-size="16" 
        fill="white" text-anchor="middle">If you can see this, SVG is working!</text>
  <text x="200" y="150" font-family="Arial, sans-serif" font-size="12" 
        fill="white" text-anchor="middle">Timestamp: ${new Date().toISOString()}</text>
</svg>`;

  // Set proper headers for SVG
  res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.status(200).send(testSvg);
} 