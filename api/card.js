export default async function handler(req, res) {
  const { user = "Leorev01", type = "normal" } = req.query;

  // Fetch GitHub user data
  const userRes = await fetch(`https://api.github.com/users/${user}`);
  if (!userRes.ok) {
    res.status(404).send(`<svg xmlns='http://www.w3.org/2000/svg' width='400' height='120'><text x='20' y='60' font-size='20' fill='red'>User not found</text></svg>`);
    return;
  }
  const userData = await userRes.json();


  // Type gradient mapping (matches your HTML/CSS)
  const typeGradients = {
    normal: "radial-gradient(circle at 60% 40%, #e0e0e0 60%, #757575 100%)",
    fire: "radial-gradient(circle at 60% 40%, #ff7043 60%, #b71c1c 100%)",
    water: "radial-gradient(circle at 60% 40%, #4fc3f7 60%, #01579b 100%)",
    electric: "radial-gradient(circle at 60% 40%, #fff176 60%, #fbc02d 100%)",
    grass: "radial-gradient(circle at 60% 40%, #81c784 60%, #388e3c 100%)",
    ice: "radial-gradient(circle at 60% 40%, #b3e5fc 60%, #0288d1 100%)",
    fighting: "radial-gradient(circle at 60% 40%, #ff8a65 60%, #6d4c41 100%)",
    poison: "radial-gradient(circle at 60% 40%, #ba68c8 60%, #512da8 100%)",
    ground: "radial-gradient(circle at 60% 40%, #d7ccc8 60%, #8d6e63 100%)",
    flying: "radial-gradient(circle at 60% 40%, #90caf9 60%, #1976d2 100%)",
    psychic: "radial-gradient(circle at 60% 40%, #f06292 60%, #ad1457 100%)",
    bug: "radial-gradient(circle at 60% 40%, #aed581 60%, #689f38 100%)",
    rock: "radial-gradient(circle at 60% 40%, #bcaaa4 60%, #5d4037 100%)",
    ghost: "radial-gradient(circle at 60% 40%, #9575cd 60%, #311b92 100%)",
    dragon: "radial-gradient(circle at 60% 40%, #7986cb 60%, #1a237e 100%)",
    dark: "radial-gradient(circle at 60% 40%, #8d8d8d 60%, #212121 100%)",
    steel: "radial-gradient(circle at 60% 40%, #b0bec5 60%, #37474f 100%)",
    fairy: "radial-gradient(circle at 60% 40%, #f8bbd0 60%, #c2185b 100%)"
  };
  // SVG can't use CSS gradients, so we approximate with SVG radialGradient
  const gradientDefs = {
    normal: ["#e0e0e0", "#757575"],
    fire: ["#ff7043", "#b71c1c"],
    water: ["#4fc3f7", "#01579b"],
    electric: ["#fff176", "#fbc02d"],
    grass: ["#81c784", "#388e3c"],
    ice: ["#b3e5fc", "#0288d1"],
    fighting: ["#ff8a65", "#6d4c41"],
    poison: ["#ba68c8", "#512da8"],
    ground: ["#d7ccc8", "#8d6e63"],
    flying: ["#90caf9", "#1976d2"],
    psychic: ["#f06292", "#ad1457"],
    bug: ["#aed581", "#689f38"],
    rock: ["#bcaaa4", "#5d4037"],
    ghost: ["#9575cd", "#311b92"],
    dragon: ["#7986cb", "#1a237e"],
    dark: ["#8d8d8d", "#212121"],
    steel: ["#b0bec5", "#37474f"],
    fairy: ["#f8bbd0", "#c2185b"]
  };
  const grad = gradientDefs[type] || gradientDefs.normal;

  // Card shadow color
  const shadowColor = grad[1] + "88";

  // SVG card template (HTML-like)
  const svg = `
    <svg width='400' height='140' viewBox='0 0 400 140' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <radialGradient id='cardGrad' cx='60%' cy='40%' r='1'>
          <stop offset='60%' stop-color='${grad[0]}' />
          <stop offset='100%' stop-color='${grad[1]}' />
        </radialGradient>
        <filter id='cardShadow' x='-20%' y='-20%' width='140%' height='140%'>
          <feDropShadow dx='0' dy='8' stdDeviation='8' flood-color='${shadowColor}' />
        </filter>
        <clipPath id='avatarClip'>
          <circle cx='64' cy='70' r='40' />
        </clipPath>
      </defs>
      <rect x='12' y='12' width='376' height='116' rx='20' fill='url(#cardGrad)' filter='url(#cardShadow)' />
      <g>
        <image href='${userData.avatar_url}' x='24' y='30' width='80' height='80' clip-path='url(#avatarClip)' />
        <circle cx='64' cy='70' r='40' fill='none' stroke='#fff' stroke-width='3' />
      </g>
      <text x='120' y='50' font-size='22' font-family='Segoe UI, Arial, sans-serif' font-weight='bold' fill='#fff'>${userData.name || userData.login}</text>
      <text x='120' y='75' font-size='15' font-family='Segoe UI, Arial, sans-serif' fill='#fff'>Followers: ${userData.followers}</text>
      <text x='120' y='95' font-size='15' font-family='Segoe UI, Arial, sans-serif' fill='#fff'>Public Repos: ${userData.public_repos}</text>
      <text x='120' y='115' font-size='14' font-family='Segoe UI, Arial, sans-serif' fill='#fff' opacity='0.8'>Type: ${type.charAt(0).toUpperCase() + type.slice(1)}</text>
    </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.status(200).send(svg);
}
