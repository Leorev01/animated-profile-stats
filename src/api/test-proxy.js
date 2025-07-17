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

  const { username = 'octocat' } = req.query;

  // Debug URL construction
  const host = req.headers.host;
  const avatarUrl = `${host ? `https://${host}` : 'http://localhost:3000'}/api/avatar-proxy?username=${username}`;
  
  // Simple test SVG
  const testSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="500" height="300" viewBox="0 0 500 300">
  <!-- Background -->
  <rect x="0" y="0" width="500" height="300" fill="#f0f0f0"/>
  
  <!-- Debug Info -->
  <text x="10" y="20" font-family="Arial, sans-serif" font-size="12" fill="#333">
    Host: ${host}
  </text>
  <text x="10" y="40" font-family="Arial, sans-serif" font-size="12" fill="#333">
    Avatar URL: ${avatarUrl}
  </text>
  <text x="10" y="60" font-family="Arial, sans-serif" font-size="12" fill="#333">
    Username: ${username}
  </text>
  
  <!-- Avatar Test -->
  <circle cx="250" cy="150" r="85" fill="#fff" stroke="#ccc" stroke-width="2"/>
  <image href="${avatarUrl}" x="165" y="65" width="170" height="170"/>
  
  <!-- Status -->
  <text x="250" y="250" font-family="Arial, sans-serif" font-size="16" fill="#333" text-anchor="middle">
    Testing Avatar Proxy
  </text>
</svg>`;

  // Set headers
  res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.status(200).send(testSvg);
} 