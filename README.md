# 🌤️ SkyPulse — Weather Forecast Page

A visually polished, animated weather forecast webpage built with **pure HTML5, CSS3, and Vanilla JavaScript** — no frameworks, no dependencies, no build steps.

---

## 📸 Features

| Feature | Details |
|---|---|
| **Current Weather Card** | Temperature, feels-like, condition, humidity, wind, UV, visibility, sunrise |
| **5-Day Forecast** | Animated cards with high/low temps and conditions |
| **CSS Animations** | Sun rays spinning, rain drops falling, snow drifting, lightning flickering, clouds bobbing |
| **City Search** | 13 pre-loaded cities with shake feedback on unknown input |
| **Detail Modal** | Click any forecast card for a full breakdown pop-up |
| **Dark Mode** | Toggle between light (sky blue) and dark (deep night) themes |
| **Animated Background** | Drifting clouds + floating particles |
| **Fully Responsive** | Works on mobile, tablet, and desktop |

---

## 🚀 How to Run

**No installation needed.** This is a single-file static webpage.

1. Download or clone the repository
2. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge)
3. That's it — no server, no npm install, no build step

```bash
# If you have Python installed, you can serve it locally:
python3 -m http.server 8000
# Then open http://localhost:8000
```

---

## 🏙️ Supported Cities (Mock Data)

| City | Condition |
|---|---|
| Mumbai | Sunny |
| Delhi | Hazy |
| London | Cloudy |
| Tokyo | Rainy |
| New York | Sunny |
| Dubai | Sunny |
| Sydney | Partly Cloudy |
| Paris | Cloudy |
| Singapore | Stormy |
| Moscow | Snowy |
| Toronto | Snowy |
| Cairo | Sunny |
| Bangalore | Partly Cloudy |

> Type the city name in the search bar and press **Enter** or click **Get Weather**.

---

## 🛠️ Technologies Used

- **HTML5** — Semantic structure
- **CSS3** — Custom Properties (variables), Flexbox, Grid, `@keyframes` animations, `backdrop-filter`, `clamp()`
- **JavaScript (ES6+)** — DOM manipulation, dynamic rendering, event handling

No external frameworks. No npm. No build process.

---

## 🎨 Animation Reference

| Animation | CSS Class / Element | Effect |
|---|---|---|
| `sunSpin` | `.sun-rays` | Sun rays rotate 360° continuously |
| `sunPulse` | `.sun-icon` | Glowing pulse around sun |
| `rainFall` | `.rain-drop` | Drops fall with staggered delays |
| `snowDrift` | `.snow-flake` | Snowflakes drift and rotate |
| `cloudBob` | `.cloud-icon` | Cloud gently bobs up and down |
| `lightning` | `.lightning-bolt` | Lightning flickers in storms |
| `windBlow` | `.wind-line` | Wind lines sweep horizontally |
| `floatUp` | `.particle` | Background dots rise and fade |
| `slideUp` | All cards | Cards animate in on load |
| `modalIn` | `.modal-box` | Modal scales in from center |
| `shake` | `.search-bar` | Shakes on invalid city search |

---

## 📁 Project Structure

```
weather-forecast/
├── index.html      ← Entire project (HTML + CSS + JS in one file)
└── README.md       ← This file
```

---

## 🌐 Deployment

Deploy to any static hosting platform:

| Platform | Steps |
|---|---|
| **GitHub Pages** | Push to repo → Settings → Pages → Deploy from main branch |
| **Netlify** | Drag and drop the folder at netlify.com/drop |
| **Vercel** | `vercel deploy` or import GitHub repo |

---

## 💡 Code Architecture (for presentation)

The JavaScript is organized into clear sections:

1. **`weatherDatabase`** — Mock API data for 13 cities
2. **`generateForecast()`** — Creates 5-day forecast from today's date
3. **`buildWeatherIcon()`** — Returns animated HTML for each condition
4. **`renderWeather()`** — Master function that updates all UI elements
5. **`searchCity()`** — Normalises input and looks up the database
6. **`openModal()` / `closeModal()`** — Handles detail pop-up
7. **`toggleDark()`** — Switches CSS class on `<body>`
8. **`createParticles()`** — Generates random background particles

---

*Built as an internship task demonstrating responsive design, CSS animations, and clean JavaScript architecture.*
