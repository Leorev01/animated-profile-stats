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

    // Fetch and convert avatar to base64
    let avatarBase64 = '';
    try {
      const avatarResponse = await fetch(userData.avatar_url);
      if (avatarResponse.ok) {
        const avatarBuffer = await avatarResponse.arrayBuffer();
        const base64 = Buffer.from(avatarBuffer).toString('base64');
        const contentType = avatarResponse.headers.get('content-type') || 'image/jpeg';
        avatarBase64 = `data:${contentType};base64,${base64}`;
      }
    } catch (error) {
      console.log('Failed to fetch avatar:', error.message);
    }

    // Simple test SVG
    const testSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
  <defs>
    <clipPath id="avatarClip">
      <circle cx="200" cy="100" r="80"/>
    </clipPath>
  </defs>
  
  <!-- Background -->
  <rect x="0" y="0" width="400" height="200" fill="#f0f0f0"/>
  
  <!-- Avatar Test -->
  <circle cx="200" cy="100" r="85" fill="#fff" stroke="#ccc" stroke-width="2"/>
  ${avatarBase64 ? `
  <image href="${avatarBase64}" x="120" y="20" width="160" height="160" clip-path="url(#avatarClip)"/>
  ` : `
  <circle cx="200" cy="100" r="80" fill="#e0e0e0"/>
  <text x="200" y="120" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="#666" text-anchor="middle">
    ${userData.login.charAt(0).toUpperCase()}
  </text>
  `}
  
  <!-- Text -->
  <text x="200" y="180" font-family="Arial, sans-serif" font-size="16" fill="#333" text-anchor="middle">
    ${avatarBase64 ? 'Avatar Loaded' : 'Avatar Failed - Using Fallback'}
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