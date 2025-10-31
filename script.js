document.addEventListener("DOMContentLoaded", function () {
  const fp = flatpickr("#daterange", {
    mode: "range",
    dateFormat: "Y-m-d",
    minDate: "today",
    locale: "hu",
    conjunction: " to "
  });

  initMap();

  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) {
    searchBtn.addEventListener("click", function () {
      handleSearch(fp);
    });
  }
});

const locationsDiv = document.getElementById("locations");
const bookingPanel = document.getElementById("bookingPanel");

const cities = [
  { name: "Budapest", lat: 47.4979, lon: 19.0402 },
  { name: "Barcelona", lat: 41.3851, lon: 2.1734 },
  { name: "Róma", lat: 41.9028, lon: 12.4964 },
  { name: "Párizs", lat: 48.8566, lon: 2.3522 },
  { name: "Athén", lat: 37.9838, lon: 23.7275 },
  { name: "Varsó", lat: 52.2297, lon: 21.0122 },
  { name: "Bukarest", lat: 44.4268, lon: 26.1025 },
  { name: "Berlin", lat: 52.5200, lon: 13.4050 },
  { name: "Prága", lat: 50.0755, lon: 14.4378 },
  { name: "Koppenhága", lat: 55.6761, lon: 12.5683 }
];

let map;
let markersLayer;

function initMap() {
  map = new ol.Map({
    target: 'map',
    layers: [new ol.layer.Tile({ source: new ol.source.OSM() })],
    view: new ol.View({
      center: ol.proj.fromLonLat([19.0402, 47.4979]),
      zoom: 4
    })
  });

  markersLayer = new ol.layer.Vector({ source: new ol.source.Vector() });
  map.addLayer(markersLayer);
}

function addMarker(lat, lon) {
  const marker = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
  });
  marker.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
      src: 'https://openlayers.org/en/latest/examples/data/icon.png',
      scale: 0.6
    })
  }));
  markersLayer.getSource().addFeature(marker);
}

function addSelectedMarker(lat, lon) {
  const marker = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
  });
  marker.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
      src: 'https://openlayers.org/en/latest/examples/data/icon.png',
      scale: 0.6,
      color: '#ff0000'
    })
  }));
  markersLayer.getSource().addFeature(marker);
}

function formatDateYMD(d) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

async function handleSearch(fp) {
  const selected = (fp && fp.selectedDates) || [];
  if (selected.length === 0) {
    alert("Kérlek add meg az utazás dátumát!");
    return;
  }

  const startDateObj = selected[0];
  const endDateObj = selected[1] || selected[0];

  if (!(startDateObj instanceof Date) || isNaN(startDateObj) || !(endDateObj instanceof Date) || isNaN(endDateObj)) {
    alert("Hibás dátumformátum!");
    return;
  }

  const startDateStr = formatDateYMD(startDateObj);
  const endDateStr = formatDateYMD(endDateObj);
  const weatherType = document.getElementById("weatherType")?.value || "";

  const results = [];
  locationsDiv.innerHTML = "<p>Keresés folyamatban...</p>";
  bookingPanel.innerHTML = "";
  markersLayer.getSource().clear();

  for (const city of cities) {
    try {
      const weather = await getWeather(city.lat, city.lon, startDateStr, endDateStr);
      const temps = weather.daily?.temperature_2m_max;
      const codes = weather.daily?.weathercode;

      if (!temps || !codes || temps.length === 0) continue;

      let matchCount = 0;
      for (let i = 0; i < codes.length; i++) {
        const code = codes[i];
        let weatherOk = true;

        if (weatherType === "sunny") weatherOk = (code === 0 || code === 1 || code === 2);
        else if (weatherType === "cloudy") weatherOk = (code >= 3 && code <= 45);

        if (weatherOk) matchCount++;
      }

      const matchRatio = matchCount / codes.length;
      if (matchRatio >= 0.5) {
        results.push({
          city: city.name,
          lat: city.lat,
          lon: city.lon,
          temp: Math.round(temps.reduce((a, b) => a + b) / temps.length),
          startDate: startDateStr,
          endDate: endDateStr,
          matchDays: matchCount
        });
      }
    } catch (error) {
      console.error(`Hiba ${city.name} esetén:`, error);
    }
  }

  displayResults(results);
}

async function getWeather(lat, lon, start, end) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,weathercode&timezone=Europe/Budapest&start_date=${start}&end_date=${end}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}

function displayResults(results) {
  locationsDiv.innerHTML = "";
  if (results.length === 0) {
    locationsDiv.innerHTML = "<p>Sajnos nincs találat az adott feltételekre.</p>";
    return;
  }

  results.forEach(result => {
    const card = document.createElement("div");
    card.className = "location-card";
    card.innerHTML = `
      <h3>${result.city}</h3>
      <p>Utazás időszaka: ${result.startDate} – ${result.endDate}</p>
      <p>Átlagos hőmérséklet: ${result.temp} °C</p>
      <p>Megfelelő napok száma: ${result.matchDays}</p>
    `;
    card.addEventListener("click", () => {
      markersLayer.getSource().clear();
      addSelectedMarker(result.lat, result.lon);
      map.getView().setCenter(ol.proj.fromLonLat([result.lon, result.lat]));
      map.getView().setZoom(7);
      showBookingPanel(result.city, result.startDate, result.endDate);
    });
    locationsDiv.appendChild(card);
    addMarker(result.lat, result.lon);
  });

  const first = results[0];
  map.getView().setCenter(ol.proj.fromLonLat([first.lon, first.lat]));
  map.getView().setZoom(5);
}

function showBookingPanel(city, start, end) {
  bookingPanel.innerHTML = `
    <div class="booking-card">
      <h3>Foglalás: ${city}</h3>
      <p>Időszak: ${start} – ${end}</p>
      <button onclick="alert('Foglalás elküldve ${city} városba!')">Foglalás indítása</button>
    </div>
  `;
}
