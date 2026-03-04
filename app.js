/* =============================================
   app.js — SkyPulse Weather Forecast
   All JavaScript logic lives in this file.
   Loaded at the bottom of index.html via <script src="app.js">
============================================= */

/* =============================================
   1. MOCK WEATHER DATABASE
      Simulates what a real weather API would return.
      Key = lowercase city name with no spaces.
      In a real project, replace this with:
        fetch(`https://api.openweathermap.org/...`)
============================================= */
const weatherDatabase = {
  mumbai:     { condition: "sunny",        temp: 32, feels: 35, humidity: 72, wind: 18, rain: 10, visibility: 8,  uv: 8,  sunrise: "6:12 AM", sunset: "6:48 PM" },
  delhi:      { condition: "hazy",         temp: 38, feels: 41, humidity: 55, wind: 12, rain: 5,  visibility: 4,  uv: 9,  sunrise: "5:58 AM", sunset: "7:02 PM" },
  london:     { condition: "cloudy",       temp: 14, feels: 11, humidity: 83, wind: 22, rain: 60, visibility: 10, uv: 2,  sunrise: "6:45 AM", sunset: "8:15 PM" },
  tokyo:      { condition: "rainy",        temp: 18, feels: 16, humidity: 88, wind: 25, rain: 85, visibility: 5,  uv: 3,  sunrise: "5:30 AM", sunset: "6:55 PM" },
  newyork:    { condition: "sunny",        temp: 22, feels: 24, humidity: 60, wind: 15, rain: 8,  visibility: 15, uv: 6,  sunrise: "6:20 AM", sunset: "7:35 PM" },
  dubai:      { condition: "sunny",        temp: 42, feels: 46, humidity: 40, wind: 10, rain: 0,  visibility: 12, uv: 11, sunrise: "5:45 AM", sunset: "6:38 PM" },
  sydney:     { condition: "partly cloudy",temp: 25, feels: 26, humidity: 68, wind: 20, rain: 20, visibility: 14, uv: 7,  sunrise: "6:50 AM", sunset: "5:30 PM" },
  paris:      { condition: "cloudy",       temp: 16, feels: 14, humidity: 78, wind: 18, rain: 40, visibility: 8,  uv: 3,  sunrise: "6:35 AM", sunset: "8:05 PM" },
  singapore:  { condition: "stormy",       temp: 29, feels: 34, humidity: 90, wind: 35, rain: 95, visibility: 4,  uv: 4,  sunrise: "6:55 AM", sunset: "7:05 PM" },
  moscow:     { condition: "snowy",        temp: -5, feels: -10,humidity: 85, wind: 20, rain: 70, visibility: 3,  uv: 1,  sunrise: "7:30 AM", sunset: "5:15 PM" },
  toronto:    { condition: "snowy",        temp: -3, feels: -9, humidity: 80, wind: 28, rain: 65, visibility: 6,  uv: 1,  sunrise: "7:10 AM", sunset: "5:48 PM" },
  cairo:      { condition: "sunny",        temp: 35, feels: 37, humidity: 30, wind: 14, rain: 0,  visibility: 10, uv: 10, sunrise: "6:00 AM", sunset: "6:20 PM" },
  bangalore:  { condition: "partly cloudy",temp: 27, feels: 29, humidity: 70, wind: 14, rain: 25, visibility: 10, uv: 6,  sunrise: "6:05 AM", sunset: "6:25 PM" },
};

/* =============================================
   2. FORECAST DATA GENERATOR
      Creates a 5-day forecast array starting from tomorrow.
      Conditions are picked from a pool based on today's weather.
      Temperatures are randomized within a realistic range.
============================================= */
function generateForecast(condition) {

  // Each condition has a plausible sequence of upcoming days
  const conditionPools = {
    sunny:           ["sunny", "partly cloudy", "sunny", "cloudy", "sunny"],
    rainy:           ["rainy", "stormy", "rainy", "cloudy", "partly cloudy"],
    cloudy:          ["cloudy", "rainy", "partly cloudy", "cloudy", "sunny"],
    snowy:           ["snowy", "cloudy", "snowy", "snowy", "partly cloudy"],
    stormy:          ["stormy", "rainy", "cloudy", "rainy", "partly cloudy"],
    hazy:            ["hazy", "sunny", "hazy", "partly cloudy", "sunny"],
    "partly cloudy": ["partly cloudy", "sunny", "cloudy", "partly cloudy", "rainy"],
  };

  const pool   = conditionPools[condition] || conditionPools["sunny"];
  const days   = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const today  = new Date();
  const result = [];

  // Build one object per day (i=1 means tomorrow)
  for (let i = 1; i <= 5; i++) {
    const d    = new Date(today);
    d.setDate(today.getDate() + i);
    const cond = pool[i - 1];

    result.push({
      day:      days[d.getDay()],
      dateNum:  `${d.getDate()} ${months[d.getMonth()]}`,
      fullDate: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
      condition: cond,
      high:     Math.round(15 + Math.random() * 25),
      low:      Math.round(5  + Math.random() * 15),
      humidity: Math.round(40 + Math.random() * 50),
      wind:     Math.round(8  + Math.random() * 30),
      rain:     Math.round(conditionRainChance(cond) + Math.random() * 20),
    });
  }

  return result;
}

/* Helper: returns a base rain probability (%) for each condition */
function conditionRainChance(c) {
  const map = {
    sunny: 2, "partly cloudy": 15, cloudy: 35,
    rainy: 70, stormy: 85, snowy: 60, hazy: 5,
  };
  return map[c] || 20;
}

/* =============================================
   3. WEATHER ICON BUILDER
      Returns an HTML string of animated CSS elements
      for each weather condition.
      This HTML is injected into #weatherIconContainer.
============================================= */
function buildWeatherIcon(condition) {

  switch (condition) {

    case "sunny":
      // 8 rotating rays around a pulsing sun core
      const rays = Array.from({ length: 8 }, (_, i) =>
        `<div class="sun-ray" style="transform: rotate(${i * 45}deg)"></div>`
      ).join('');
      return `<div class="sun-rays">${rays}</div><div class="sun-icon"></div>`;

    case "partly cloudy":
      // Smaller sun peeking behind a cloud
      const raysSmall = Array.from({ length: 8 }, (_, i) =>
        `<div class="sun-ray" style="transform: rotate(${i * 45}deg); width:4px; height:14px"></div>`
      ).join('');
      return `
        <div class="sun-rays" style="opacity:0.7;width:80px;height:80px;top:5px;left:5px">${raysSmall}</div>
        <div class="sun-icon" style="width:55px;height:55px;top:12px;left:12px;position:absolute"></div>
        <div class="cloud-icon" style="transform:translate(-35%,-35%)"><div class="cloud-body" style="width:75px"></div></div>`;

    case "cloudy":
      // Two overlapping clouds for depth
      return `
        <div class="cloud-icon"><div class="cloud-body"></div></div>
        <div class="cloud-icon" style="transform:translate(-60%,-60%) scale(0.7);opacity:0.6">
          <div class="cloud-body"></div></div>`;

    case "rainy":
      // Cloud sitting above 5 falling rain drops
      return `
        <div class="cloud-icon" style="top:35%"><div class="cloud-body"></div></div>
        <div class="rain-drops">
          <div class="rain-drop"></div><div class="rain-drop"></div>
          <div class="rain-drop"></div><div class="rain-drop"></div>
          <div class="rain-drop"></div>
        </div>`;

    case "stormy":
      // Dark cloud + 3 heavy rain drops + flickering lightning bolt
      return `
        <div class="cloud-icon" style="top:30%">
          <div class="cloud-body" style="background:rgba(180,180,200,0.9)"></div></div>
        <div class="rain-drops">
          <div class="rain-drop"></div><div class="rain-drop"></div>
          <div class="rain-drop"></div>
        </div>
        <div class="lightning-bolt">⚡</div>`;

    case "snowy":
      // Cloud + 3 drifting and rotating snowflakes
      return `
        <div class="cloud-icon" style="top:30%">
          <div class="cloud-body" style="background:rgba(200,220,240,0.9)"></div></div>
        <div class="snow-flakes">
          <div class="snow-flake">❄</div>
          <div class="snow-flake">❄</div>
          <div class="snow-flake">❄</div>
        </div>`;

    case "hazy":
      // Dim sun behind sweeping horizontal wind/haze lines
      return `
        <div class="sun-icon" style="opacity:0.5;width:65px;height:65px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)"></div>
        <div class="wind-lines">
          <div class="wind-line" style="width:55px"></div>
          <div class="wind-line" style="width:40px"></div>
          <div class="wind-line" style="width:50px"></div>
          <div class="wind-line" style="width:35px"></div>
        </div>`;

    default:
      return `<div class="sun-icon"></div>`;
  }
}

/* Returns an emoji shorthand for use in forecast cards */
function conditionEmoji(c) {
  const map = {
    sunny: "☀️", "partly cloudy": "⛅", cloudy: "☁️",
    rainy: "🌧️", stormy: "⛈️", snowy: "🌨️", hazy: "🌫️",
  };
  return map[c] || "☀️";
}

/* =============================================
   4. MAIN RENDER FUNCTION
      Called whenever a city is loaded or searched.
      Updates every piece of dynamic text + icons.
============================================= */
function renderWeather(cityKey, displayName) {

  // Look up city data — fallback to Mumbai if not found
  const data = weatherDatabase[cityKey] || weatherDatabase["mumbai"];

  // ---- Update current weather card ----
  document.getElementById("cityName").textContent = displayName;

  // Format today's date: "Wednesday, March 4, 2025"
  const now = new Date();
  document.getElementById("cityDate").textContent =
    now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  document.getElementById("tempMain").textContent        = `${data.temp}°C`;
  document.getElementById("tempFeels").textContent       = `Feels like ${data.feels}°C`;
  document.getElementById("conditionLabel").textContent  = capitalize(data.condition);

  // Replace icon container HTML with animated icon for this condition
  document.getElementById("weatherIconContainer").innerHTML = buildWeatherIcon(data.condition);

  // ---- Update stats row ----
  document.getElementById("statHumidity").textContent   = `${data.humidity}%`;
  document.getElementById("statWind").textContent       = `${data.wind} km/h`;
  document.getElementById("statRain").textContent       = `${data.rain}%`;
  document.getElementById("statVisibility").textContent = `${data.visibility} km`;
  document.getElementById("statUV").textContent         = `${data.uv}`;
  document.getElementById("statSunrise").textContent    = data.sunrise;

  // ---- Build forecast cards ----
  const forecast = generateForecast(data.condition);
  const grid     = document.getElementById("forecastGrid");
  grid.innerHTML = ''; // Clear old cards first

  forecast.forEach((day, idx) => {
    const card = document.createElement("div");
    card.className = "forecast-card";

    // Stagger each card: 0.9s, 1.0s, 1.1s, 1.2s, 1.3s
    card.style.animationDelay = `${0.1 * idx + 0.9}s`;
    card.style.opacity        = '0'; // starts invisible, slideUp reveals it

    card.innerHTML = `
      <div class="forecast-day">${day.day}</div>
      <div class="forecast-date-num">${day.dateNum}</div>
      <span class="forecast-icon">${conditionEmoji(day.condition)}</span>
      <div class="forecast-condition">${capitalize(day.condition)}</div>
      <div class="forecast-temps">
        <span class="temp-high">${day.high}°</span>
        <span class="temp-separator">/</span>
        <span class="temp-low">${day.low}°</span>
      </div>
    `;

    // Clicking a forecast card opens the detail modal
    card.onclick = () => openModal(day, data);
    grid.appendChild(card);
  });
}

/* =============================================
   5. SEARCH FUNCTIONALITY
      Normalises user input → looks up database
      Shows shake animation if city not found
============================================= */
function searchCity() {
  const input = document.getElementById("cityInput");
  const query = input.value.trim();

  if (!query) {
    shakeSearch(); // Empty input → shake
    return;
  }

  // Normalize: "New York" → "newyork", "LONDON" → "london"
  const key = query.toLowerCase().replace(/\s+/g, '');

  if (weatherDatabase[key]) {
    renderWeather(key, capitalize(query));
    input.value = ''; // Clear search box after success
  } else {
    shakeSearch(); // City not in database → shake feedback
  }
}

/* Allows pressing Enter key instead of clicking the button */
function handleSearchKey(e) {
  if (e.key === 'Enter') searchCity();
}

/* Briefly adds .shake class — CSS animation plays, then removes it */
function shakeSearch() {
  const bar = document.getElementById("searchBar");
  bar.classList.add("shake");
  setTimeout(() => bar.classList.remove("shake"), 500);
}

/* =============================================
   6. MODAL — Detailed Day View
      Opens when a forecast card is clicked.
      Populates modal with that day's data.
============================================= */
function openModal(day, currentData) {
  document.getElementById("modalDayFull").textContent   = day.fullDate;
  document.getElementById("modalEmoji").textContent     = conditionEmoji(day.condition);
  document.getElementById("modalHigh").textContent      = `${day.high}°`;
  document.getElementById("modalLow").textContent       = `${day.low}°C`;
  document.getElementById("modalCondition").textContent = capitalize(day.condition);
  document.getElementById("modalHumidity").textContent  = `${day.humidity}%`;
  document.getElementById("modalWind").textContent      = `${day.wind} km/h`;
  document.getElementById("modalSunrise").textContent   = currentData.sunrise;
  document.getElementById("modalSunset").textContent    = currentData.sunset;
  document.getElementById("modalRain").textContent      = `${day.rain}%`;
  document.getElementById("modalFeels").textContent     = `${day.high - 2}°C`;

  // Add .open class → CSS changes display:none to display:flex
  document.getElementById("modalOverlay").classList.add("open");
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
}

// Close modal when clicking the dark overlay (outside the box)
document.getElementById("modalOverlay").addEventListener("click", function(e) {
  if (e.target === this) closeModal();
});

// Close modal when clicking the × button
document.getElementById("modalClose").addEventListener("click", closeModal);

/* =============================================
   7. DARK MODE TOGGLE
      Adds/removes .dark class on <body>.
      CSS variables automatically change via body.dark selector.
============================================= */
function toggleDark() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  document.getElementById("toggleLabel").textContent = isDark ? "🌙 Dark" : "☀️ Light";
}

/* =============================================
   8. PARTICLE SYSTEM
      Creates 25 floating white dots in the background.
      Each particle has a random size, position, speed, and delay.
============================================= */
function createParticles() {
  const container = document.getElementById("particles");
  const count     = 25;

  for (let i = 0; i < count; i++) {
    const p    = document.createElement("div");
    p.className = "particle";

    const size = 3 + Math.random() * 7;     // 3px – 10px
    p.style.width            = `${size}px`;
    p.style.height           = `${size}px`;
    p.style.left             = `${Math.random() * 100}%`;       // random column
    p.style.animationDuration  = `${8 + Math.random() * 12}s`; // 8s – 20s to rise
    p.style.animationDelay     = `${Math.random() * 15}s`;     // staggered start
    p.style.opacity          = '0';   // starts invisible; floatUp animation handles opacity

    container.appendChild(p);
  }
}

/* =============================================
   9. HELPER UTILITIES
============================================= */

/* Capitalizes first letter: "partly cloudy" → "Partly cloudy" */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/* =============================================
   10. INITIALIZATION
       Runs immediately when the script loads.
       1. Create background particles
       2. Render default city (Mumbai)
============================================= */
createParticles();
renderWeather("mumbai", "Mumbai");
