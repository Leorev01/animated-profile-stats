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

  try {
    // Fetch GitHub user data
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) {
      res.status(404).send('User not found');
      return;
    }
    const userData = await userRes.json();

    // Debug info
    let debugInfo = {
      avatarUrl: userData.avatar_url,
      base64Length: 0,
      contentType: '',
      error: null
    };

    // Fetch and convert avatar to base64
    let avatarBase64 = '';
    try {
      const avatarResponse = await fetch(userData.avatar_url);
      if (avatarResponse.ok) {
        const avatarBuffer = await avatarResponse.arrayBuffer();
        const base64 = Buffer.from(avatarBuffer).toString('base64');
        const contentType = avatarResponse.headers.get('content-type') || 'image/jpeg';
        avatarBase64 = `data:${contentType};base64,${base64}`;
        
        debugInfo.base64Length = base64.length;
        debugInfo.contentType = contentType;
      }
    } catch (error) {
      debugInfo.error = error.message;
      console.log('Failed to fetch avatar:', error.message);
    }

    // Simple test SVG with debug info
    const testSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="500" height="300" viewBox="0 0 500 300">
  <!-- Background -->
  <rect x="0" y="0" width="500" height="300" fill="#f0f0f0"/>
  
  <!-- Debug Info -->
  <text x="10" y="20" font-family="Arial, sans-serif" font-size="12" fill="#333">
    Avatar URL: ${debugInfo.avatarUrl}
  </text>
  <text x="10" y="40" font-family="Arial, sans-serif" font-size="12" fill="#333">
    Base64 Length: ${debugInfo.base64Length}
  </text>
  <text x="10" y="60" font-family="Arial, sans-serif" font-size="12" fill="#333">
    Content Type: ${debugInfo.contentType}
  </text>
  <text x="10" y="80" font-family="Arial, sans-serif" font-size="12" fill="#333">
    Error: ${debugInfo.error || 'None'}
  </text>
  
  <!-- Avatar Test -->
  <circle cx="250" cy="150" r="85" fill="#fff" stroke="#ccc" stroke-width="2"/>
  ${avatarBase64 ? `
  <image href="${avatarBase64}" x="165" y="65" width="170" height="170"/>
  ` : `
  <circle cx="250" cy="150" r="80" fill="#e0e0e0"/>
  <text x="250" y="170" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="#666" text-anchor="middle">
    ${userData.login.charAt(0).toUpperCase()}
  </text>
  `}
  
  <!-- Status -->
  <text x="250" y="250" font-family="Arial, sans-serif" font-size="16" fill="#333" text-anchor="middle">
    ${avatarBase64 ? 'Base64 Image Loaded' : 'Base64 Failed - Using Fallback'}
  </text>
</svg>`;

    // Set headers
    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.status(200).send(testSvg);
  } catch (error) {
    res.status(500).send(`<svg xmlns='http://www.w3.org/2000/svg' width='400' height='120'><text x='20' y='60' font-size='20' fill='red'>Error: ${error.message}</text></svg>`);
  }
} 