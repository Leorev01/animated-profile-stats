// --- Type and color mapping ---
// TEMP: Add your GitHub API token here for testing
const typeMap = {
  normal: {
    color: 'radial-gradient(circle at 60% 40%, #e0e0e0 60%, #757575 100%)',
    svg: 'assets/types/normal.svg'
  },
  fire: {
    color: 'radial-gradient(circle at 60% 40%, #ff7043 60%, #b71c1c 100%)',
    svg: 'assets/types/fire.svg'
  },
  water: {
    color: 'radial-gradient(circle at 60% 40%, #4fc3f7 60%, #01579b 100%)',
    svg: 'assets/types/water.svg'
  },
  electric: {
    color: 'radial-gradient(circle at 60% 40%, #fff176 60%, #fbc02d 100%)',
    svg: 'assets/types/electric.svg'
  },
  grass: {
    color: 'radial-gradient(circle at 60% 40%, #81c784 60%, #388e3c 100%)',
    svg: 'assets/types/grass.svg'
  },
  ice: {
    color: 'radial-gradient(circle at 60% 40%, #b3e5fc 60%, #0288d1 100%)',
    svg: 'assets/types/ice.svg'
  },
  fighting: {
    color: 'radial-gradient(circle at 60% 40%, #ff8a65 60%, #6d4c41 100%)',
    svg: 'assets/types/fighting.svg'
  },
  poison: {
    color: 'radial-gradient(circle at 60% 40%, #ba68c8 60%, #512da8 100%)',
    svg: 'assets/types/poison.svg'
  },
  ground: {
    color: 'radial-gradient(circle at 60% 40%, #d7ccc8 60%, #8d6e63 100%)',
    svg: 'assets/types/ground.svg'
  },
  flying: {
    color: 'radial-gradient(circle at 60% 40%, #90caf9 60%, #1976d2 100%)',
    svg: 'assets/types/flying.svg'
  },
  psychic: {
    color: 'radial-gradient(circle at 60% 40%, #f06292 60%, #ad1457 100%)',
    svg: 'assets/types/psychic.svg'
  },
  bug: {
    color: 'radial-gradient(circle at 60% 40%, #aed581 60%, #689f38 100%)',
    svg: 'assets/types/bug.svg'
  },
  rock: {
    color: 'radial-gradient(circle at 60% 40%, #bcaaa4 60%, #5d4037 100%)',
    svg: 'assets/types/rock.svg'
  },
  ghost: {
    color: 'radial-gradient(circle at 60% 40%, #9575cd 60%, #311b92 100%)',
    svg: 'assets/types/ghost.svg'
  },
  dragon: {
    color: 'radial-gradient(circle at 60% 40%, #7986cb 60%, #1a237e 100%)',
    svg: 'assets/types/dragon.svg'
  },
  dark: {
    color: 'radial-gradient(circle at 60% 40%, #8d8d8d 60%, #212121 100%)',
    svg: 'assets/types/dark.svg'
  },
  steel: {
    color: 'radial-gradient(circle at 60% 40%, #b0bec5 60%, #37474f 100%)',
    svg: 'assets/types/steel.svg'
  },
  fairy: {
    color: 'radial-gradient(circle at 60% 40%, #f8bbd0 60%, #c2185b 100%)',
    svg: 'assets/types/fairy.svg'
  }
};

// --- Set type icon and card color based on URL param ---
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const userType = params.get('type') || 'normal';
  const typeData = typeMap[userType] || typeMap['normal'];
  // Set icon background and SVG
  const typeIcon = document.querySelector('.type-icon');
  if (typeIcon && typeData) {
    typeIcon.style.background = typeData.color;
    // Set dynamic shadow for each type
    let shadow = '0 0 8px 2px #b0bec5, 0 2px 8px #b0bec544';
    switch (userType) {
      case 'water': shadow = '0 0 8px 2px #4fc3f7, 0 2px 8px #01579b44'; break;
      case 'fire': shadow = '0 0 8px 2px #ff7043, 0 2px 8px #b71c1c44'; break;
      case 'electric': shadow = '0 0 8px 2px #fff176, 0 2px 8px #fbc02d44'; break;
      case 'grass': shadow = '0 0 8px 2px #81c784, 0 2px 8px #388e3c44'; break;
      case 'ice': shadow = '0 0 8px 2px #b3e5fc, 0 2px 8px #0288d144'; break;
      case 'fighting': shadow = '0 0 8px 2px #ff8a65, 0 2px 8px #6d4c4144'; break;
      case 'poison': shadow = '0 0 8px 2px #ba68c8, 0 2px 8px #512da844'; break;
      case 'ground': shadow = '0 0 8px 2px #d7ccc8, 0 2px 8px #8d6e6344'; break;
      case 'flying': shadow = '0 0 8px 2px #90caf9, 0 2px 8px #1976d244'; break;
      case 'psychic': shadow = '0 0 8px 2px #f06292, 0 2px 8px #ad145744'; break;
      case 'bug': shadow = '0 0 8px 2px #aed581, 0 2px 8px #689f3844'; break;
      case 'rock': shadow = '0 0 8px 2px #bcaaa4, 0 2px 8px #5d403744'; break;
      case 'ghost': shadow = '0 0 8px 2px #9575cd, 0 2px 8px #311b9244'; break;
      case 'dragon': shadow = '0 0 8px 2px #7986cb, 0 2px 8px #1a237e44'; break;
      case 'dark': shadow = '0 0 8px 2px #8d8d8d, 0 2px 8px #21212144'; break;
      case 'steel': shadow = '0 0 8px 2px #b0bec5, 0 2px 8px #37474f44'; break;
      case 'fairy': shadow = '0 0 8px 2px #f8bbd0, 0 2px 8px #c2185b44'; break;
      default: shadow = '0 0 8px 2px #b0bec5, 0 2px 8px #b0bec544';
    }
    typeIcon.style.setProperty('--type-shadow', shadow);
    const iconImg = typeIcon.querySelector('img');
    if (!iconImg) {
      iconImg = document.createElement('img');
      typeIcon.appendChild(iconImg);
    }
    iconImg.src = typeData.svg;
    iconImg.alt = `${userType.charAt(0).toUpperCase() + userType.slice(1)} Type`;
  }
  // Set card background and text color
  const card = document.querySelector('.dev-card');
  if (card && typeData) {
    card.style.background = typeData.color;
    // Set dynamic shadow for each type
    let cardShadow;
    switch (userType) {
      case 'water': cardShadow = '0 8px 32px 0 #4fc3f7cc, 0 2px 8px 0 #01579bcc'; break;
      case 'fire': cardShadow = '0 8px 32px 0 #ff7043cc, 0 2px 8px 0 #b71c1ccc'; break;
      case 'electric': cardShadow = '0 8px 32px 0 #fff176cc, 0 2px 8px 0 #fbc02dcc'; break;
      case 'grass': cardShadow = '0 8px 32px 0 #81c784cc, 0 2px 8px 0 #388e3ccc'; break;
      case 'ice': cardShadow = '0 8px 32px 0 #b3e5fccc, 0 2px 8px 0 #0288d1cc'; break;
      case 'fighting': cardShadow = '0 8px 32px 0 #ff8a65cc, 0 2px 8px 0 #6d4c41cc'; break;
      case 'poison': cardShadow = '0 8px 32px 0 #ba68c8cc, 0 2px 8px 0 #512da8cc'; break;
      case 'ground': cardShadow = '0 8px 32px 0 #d7ccc8cc, 0 2px 8px 0 #8d6e63cc'; break;
      case 'flying': cardShadow = '0 8px 32px 0 #90caf9cc, 0 2px 8px 0 #1976d2cc'; break;
      case 'psychic': cardShadow = '0 8px 32px 0 #f06292cc, 0 2px 8px 0 #ad1457cc'; break;
      case 'bug': cardShadow = '0 8px 32px 0 #aed581cc, 0 2px 8px 0 #689f38cc'; break;
      case 'rock': cardShadow = '0 8px 32px 0 #bcaaa4cc, 0 2px 8px 0 #5d4037cc'; break;
      case 'ghost': cardShadow = '0 8px 32px 0 #9575cdcc, 0 2px 8px 0 #311b92cc'; break;
      case 'dragon': cardShadow = '0 8px 32px 0 #7986cbcc, 0 2px 8px 0 #1a237ecc'; break;
      case 'dark': cardShadow = '0 8px 32px 0 #8d8d8dcc, 0 2px 8px 0 #212121cc'; break;
      case 'steel': cardShadow = '0 8px 32px 0 #b0bec5cc, 0 2px 8px 0 #37474fcc'; break;
      case 'fairy': cardShadow = '0 8px 32px 0 #f8bbd0cc, 0 2px 8px 0 #c2185bcc'; break;
      default: cardShadow = '0 8px 32px 0 #b0bec5cc, 0 2px 8px 0 #757575cc';
    }
    card.style.setProperty('--card-shadow', cardShadow);
    // Set text color for contrast (dark for light backgrounds, light for dark backgrounds)
    let textColor = '#222';
    // Use white for dark types
    if ([
      'fire','water','electric','grass','ice','fighting','poison','ground','flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy'
    ].includes(userType)) {
      textColor = '#fff';
    }
    card.style.color = textColor;
    // Also update all child text elements for best effect
    card.querySelectorAll('h3, p, b, span, ul, li').forEach(el => {
      el.style.color = textColor;
    });
  }
});
async function fetchAllRepos(username) {
  let page = 1, repos = [];
  while (true) {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}`);
    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    repos.push(...batch);
    page++;
  }
  return repos;
}


async function fetchUserInfo(username) {
  const res = await fetch(`https://api.github.com/users/${username}`);
  return res.json();
}


async function fetchRecentActivity(username) {
  const res = await fetch(`https://api.github.com/users/${username}/events`);
  return res.json();
}

export async function renderDevCard(username, containerId) {
  const [user, repos, events] = await Promise.all([
    fetchUserInfo(username),
    fetchAllRepos(username),
    fetchRecentActivity(username)
  ]);
  

  // Skills
  const langCount = {};
  repos.forEach(r => {
    if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
  });
  const topLangs = Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang]) => lang);

  // Special abilities (total stars and public repos)
  let stars = 0;
  let repoCount = 0;
  if (Array.isArray(repos)) {
    stars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
    repoCount = repos.length;
  }

  // Experience calculation (no followers or recent activity)
  let accountAgeYears = 0;
  if (user && user.created_at) {
    accountAgeYears = Math.floor((Date.now() - new Date(user.created_at)) / (1000 * 60 * 60 * 24 * 365));
  }
  const expScore = (stars * 2) + (repoCount * 3) + (accountAgeYears * 10);
  let expLevel = 'Junior Dev';
  if (expScore > 300) expLevel = 'Mid Dev';
  if (expScore > 800) expLevel = 'Senior Dev';
  if (expScore > 2000) expLevel = 'Lead Dev';

  // Most recent activity
  const latest = events && events.length > 0 ? events[0] : null;
  let activity = 'No recent public activity';
  if (latest) {
    activity = `${latest.type.replace('Event', '')} in ${latest.repo?.name || 'unknown repo'} (${new Date(latest.created_at).toLocaleDateString()})`;
  }

  // Fill in the HTML
  document.getElementById('dev-avatar').src = user.avatar_url;
  // Set experience label above the name
  let expElem = document.getElementById('dev-exp');
  if (!expElem) {
    expElem = document.createElement('span');
    expElem.id = 'dev-exp';
    expElem.style.display = 'block';
    expElem.style.fontSize = '0.85em';
    expElem.style.color = '#607d8b';
    expElem.style.fontWeight = '500';
    expElem.style.letterSpacing = '1px';
    expElem.style.marginBottom = '2px';
    expElem.style.textTransform = 'uppercase';
    expElem.style.opacity = '0.85';
    const nameElem = document.getElementById('dev-name');
    nameElem.parentNode.insertBefore(expElem, nameElem);
  }
  document.getElementById('dev-name').textContent = user.name || user.login;
  document.getElementById('dev-exp').textContent = expLevel;
  document.getElementById('dev-skills').textContent = topLangs.join(', ');
  // Special Abilities: stars and public repos
  const abilitiesElem = document.getElementById('dev-abilities');
  abilitiesElem.innerHTML = '';
  // Stars ability
  const liStars = document.createElement('li');
  const labelStars = document.createElement('span');
  labelStars.className = 'ability-label';
  labelStars.textContent = 'Stars ⭐';
  const valueStars = document.createElement('span');
  valueStars.className = 'ability-value';
  valueStars.textContent = stars;
  liStars.appendChild(labelStars);
  liStars.appendChild(valueStars);
  // Repos ability
  const liRepos = document.createElement('li');
  const labelRepos = document.createElement('span');
  labelRepos.className = 'ability-label';
  labelRepos.textContent = 'Public Repos 📦';
  const valueRepos = document.createElement('span');
  valueRepos.className = 'ability-value';
  valueRepos.textContent = repoCount;
  liRepos.appendChild(labelRepos);
  liRepos.appendChild(valueRepos);
  abilitiesElem.appendChild(liStars);
  abilitiesElem.appendChild(liRepos);
  document.getElementById('dev-activity').textContent = activity;
  document.getElementById('dev-hp').textContent = `Followers: ${user.followers}`;
}
