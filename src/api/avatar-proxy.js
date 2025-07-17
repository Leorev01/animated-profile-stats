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

    // Fetch the avatar image
    const avatarResponse = await fetch(userData.avatar_url);
    if (!avatarResponse.ok) {
      res.status(404).send('Avatar not found');
      return;
    }

    // Get the image buffer and content type
    const imageBuffer = await avatarResponse.arrayBuffer();
    const contentType = avatarResponse.headers.get('content-type') || 'image/png';

    // Set proper headers for image serving
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Send the image
    res.status(200).send(Buffer.from(imageBuffer));
  } catch (error) {
    res.status(500).send('Error fetching avatar');
  }
} 