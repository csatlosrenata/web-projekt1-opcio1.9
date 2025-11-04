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
  { name: "Abu Dhabi", lat: 24.4539, lon: 54.3773 },
  { name: "Accra", lat: 5.6037, lon: -0.187 },
  { name: "Addis Abeba", lat: 9.03, lon: 38.74 },
  { name: "Algiers", lat: 36.7538, lon: 3.0588 },
  { name: "Amman", lat: 31.9497, lon: 35.9329 },
  { name: "Amsterdam", lat: 52.3676, lon: 4.9041 },
  { name: "Andorra la Vella", lat: 42.5063, lon: 1.5218 },
  { name: "Ankara", lat: 39.9334, lon: 32.8597 },
  { name: "Antananarivo", lat: -18.8792, lon: 47.5079 },
  { name: "Apia", lat: -13.8333, lon: -171.7667 },
  { name: "Ashgabat", lat: 37.9601, lon: 58.3261 },
  { name: "Asmara", lat: 15.3229, lon: 38.9251 },
  { name: "Asunción", lat: -25.2637, lon: -57.5759 },
  { name: "Athén", lat: 37.9838, lon: 23.7275 },
  { name: "Bagdad", lat: 33.3152, lon: 44.3661 },
  { name: "Baku", lat: 40.4093, lon: 49.8671 },
  { name: "Bamako", lat: 12.6392, lon: -8.0029 },
  { name: "Bandar Seri Begawan", lat: 4.9031, lon: 114.9398 },
  { name: "Bangkok", lat: 13.7563, lon: 100.5018 },
  { name: "Bangui", lat: 4.3947, lon: 18.5582 },
  { name: "Banjul", lat: 13.4549, lon: -16.579 },
  { name: "Barcelona", lat: 41.3851, lon: 2.1734 },
  { name: "Barranquilla", lat: 10.9639, lon: -74.7964 },
  { name: "Basra", lat: 30.5, lon: 47.8167 },
  { name: "Beijing", lat: 39.9042, lon: 116.4074 },
  { name: "Beirut", lat: 33.8938, lon: 35.5018 },
  { name: "Belgrád", lat: 44.7872, lon: 20.4573 },
  { name: "Belize City", lat: 17.5046, lon: -88.1962 },
  { name: "Berlin", lat: 52.52, lon: 13.405 },
  { name: "Bern", lat: 46.9481, lon: 7.4474 },
  { name: "Bishkek", lat: 42.8746, lon: 74.5698 },
  { name: "Bissau", lat: 11.8636, lon: -15.5977 },
  { name: "Bogotá", lat: 4.711, lon: -74.0721 },
  { name: "Brasília", lat: -15.7939, lon: -47.8828 },
  { name: "Bratislava", lat: 48.1486, lon: 17.1077 },
  { name: "Brazzaville", lat: -4.2634, lon: 15.2429 },
  { name: "Brüsszel", lat: 50.8503, lon: 4.3517 },
  { name: "Bucharest", lat: 44.4268, lon: 26.1025 },
  { name: "Budapest", lat: 47.4979, lon: 19.0402 },
  { name: "Buenos Aires", lat: -34.6037, lon: -58.3816 },
  { name: "Bujumbura", lat: -3.3822, lon: 29.3644 },
  { name: "Cairo", lat: 30.0444, lon: 31.2357 },
  { name: "Canberra", lat: -35.2809, lon: 149.13 },
  { name: "Cape Town", lat: -33.9249, lon: 18.4241 },
  { name: "Caracas", lat: 10.4806, lon: -66.9036 },
  { name: "Casablanca", lat: 33.5731, lon: -7.5898 },
  { name: "Chiang Mai", lat: 18.7883, lon: 98.9853 },
  { name: "Chicago", lat: 41.8781, lon: -87.6298 },
  { name: "Chisinau", lat: 47.0105, lon: 28.8638 },
  { name: "Colombo", lat: 6.9271, lon: 79.8612 },
  { name: "Copenhagen", lat: 55.6761, lon: 12.5683 },
  { name: "Dakar", lat: 14.7167, lon: -17.4677 },
  { name: "Dallas", lat: 32.7767, lon: -96.797 },
  { name: "Damascus", lat: 33.5138, lon: 36.2765 },
  { name: "Dar es Salaam", lat: -6.7924, lon: 39.2083 },
  { name: "Delhi", lat: 28.6139, lon: 77.209 },
  { name: "Denver", lat: 39.7392, lon: -104.9903 },
  { name: "Detroit", lat: 42.3314, lon: -83.0458 },
  { name: "Dhaka", lat: 23.8103, lon: 90.4125 },
  { name: "Doha", lat: 25.276987, lon: 51.520008 },
  { name: "Dubai", lat: 25.276987, lon: 55.296249 },
  { name: "Dublin", lat: 53.3498, lon: -6.2603 },
  { name: "Durban", lat: -29.8587, lon: 31.0218 },
  { name: "Edinburgh", lat: 55.9533, lon: -3.1883 },
  { name: "Frankfurt", lat: 50.1109, lon: 8.6821 },
  { name: "Geneva", lat: 46.2044, lon: 6.1432 },
  { name: "Georgetown", lat: 6.8013, lon: -58.1551 },
  { name: "Giza", lat: 30.0131, lon: 31.2089 },
  { name: "Guadalajara", lat: 20.6597, lon: -103.3496 },
  { name: "Guangzhou", lat: 23.1291, lon: 113.2644 },
  { name: "Guatemala City", lat: 14.6349, lon: -90.5069 },
  { name: "Hamburg", lat: 53.5511, lon: 9.9937 },
  { name: "Hanoi", lat: 21.0285, lon: 105.8542 },
  { name: "Harare", lat: -17.8292, lon: 31.0522 },
  { name: "Havana", lat: 23.1136, lon: -82.3666 },
  { name: "Helsinki", lat: 60.1699, lon: 24.9384 },
  { name: "Ho Chi Minh City", lat: 10.7769, lon: 106.7009 },
  { name: "Hong Kong", lat: 22.3193, lon: 114.1694 },
  { name: "Houston", lat: 29.7604, lon: -95.3698 },
  { name: "Hyderabad", lat: 17.385, lon: 78.4867 },
  { name: "Honiara", lat: -9.4456, lon: 159.9729 },
  { name: "Hobart", lat: -42.8821, lon: 147.3272 },
  { name: "Helsingborg", lat: 56.0465, lon: 12.6945 },
  { name: "Hargeisa", lat: 9.5624, lon: 44.077 },
  { name: "Hermosillo", lat: 29.0729, lon: -110.9559 },
  { name: "Hiroshima", lat: 34.3853, lon: 132.4553 },
  { name: "Hongcheon", lat: 37.6913, lon: 127.8857 },
  { name: "Honolulu", lat: 21.3069, lon: -157.8583 },
  { name: "Houston", lat: 29.7604, lon: -95.3698 },
  { name: "Hualien", lat: 23.9911, lon: 121.6114 },
  { name: "Huelva", lat: 37.2614, lon: -6.9447 },
  { name: "Huancayo", lat: -12.0686, lon: -75.2102 },
  { name: "Huntsville", lat: 34.7304, lon: -86.5861 },
  { name: "Hurghada", lat: 27.2579, lon: 33.8116 },
  { name: "Hvar", lat: 43.1729, lon: 16.441 },
  { name: "Hyderabad (Pakistan)", lat: 25.396, lon: 68.3578 },
  { name: "Haifa", lat: 32.794, lon: 34.9896 },
  { name: "Halifax", lat: 44.6488, lon: -63.5752 },
  { name: "Hambantota", lat: 6.1246, lon: 81.1185 },
  { name: "Hermosillo", lat: 29.0729, lon: -110.9559 },
  { name: "Iași", lat: 47.1585, lon: 27.6014 },
  { name: "Ibadan", lat: 7.3775, lon: 3.947 },
  { name: "Istanbul", lat: 41.0082, lon: 28.9784 },
  { name: "Islamabad", lat: 33.6844, lon: 73.0479 },
  { name: "Izmir", lat: 38.4192, lon: 27.1287 },
  { name: "Indianapolis", lat: 39.7684, lon: -86.1581 },
  { name: "Incheon", lat: 37.4563, lon: 126.7052 },
  { name: "Irkutsk", lat: 52.2869, lon: 104.305 },
  { name: "Islamabad", lat: 33.6844, lon: 73.0479 },
  { name: "Iquitos", lat: -3.7491, lon: -73.2538 },
  { name: "Izhevsk", lat: 56.8526, lon: 53.2114 },
  { name: "Jacksonville", lat: 30.3322, lon: -81.6557 },
  { name: "Jakarta", lat: -6.2088, lon: 106.8456 },
  { name: "Jeddah", lat: 21.4858, lon: 39.1925 },
  { name: "Jerusalem", lat: 31.7683, lon: 35.2137 },
  { name: "Johannesburg", lat: -26.2041, lon: 28.0473 },
  { name: "Kabul", lat: 34.5553, lon: 69.2075 },
  { name: "Kampala", lat: 0.3476, lon: 32.5825 },
  { name: "Kano", lat: 12.0022, lon: 8.5919 },
  { name: "Kansas City", lat: 39.0997, lon: -94.5786 },
  { name: "Karachi", lat: 24.8607, lon: 67.0011 },
  { name: "Kathmandu", lat: 27.7172, lon: 85.324 },
  { name: "Kaunas", lat: 54.8985, lon: 23.9036 },
  { name: "Kazan", lat: 55.8304, lon: 49.0661 },
  { name: "Khartoum", lat: 15.5007, lon: 32.5599 },
  { name: "Kigali", lat: -1.9441, lon: 30.0619 },
  { name: "Kingston", lat: 17.9712, lon: -76.7936 },
  { name: "Kinshasa", lat: -4.4419, lon: 15.2663 },
  { name: "Kobe", lat: 34.6901, lon: 135.1955 },
  { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
  { name: "Kuala Lumpur", lat: 3.139, lon: 101.6869 },
  { name: "Kuwait City", lat: 29.3759, lon: 47.9774 },
  { name: "Kyiv", lat: 50.4501, lon: 30.5234 },
  { name: "Kyoto", lat: 35.0116, lon: 135.7681 },
  { name: "La Paz", lat: -16.5, lon: -68.1193 },
  { name: "Lagos", lat: 6.5244, lon: 3.3792 },
  { name: "Lahore", lat: 31.582, lon: 74.329 },
  { name: "Libreville", lat: 0.4162, lon: 9.4673 },
  { name: "Lilongwe", lat: -13.9626, lon: 33.7741 },
  { name: "Lima", lat: -12.0464, lon: -77.0428 },
  { name: "Lisbon", lat: 38.7169, lon: -9.1399 },
  { name: "Ljubljana", lat: 46.0569, lon: 14.5058 },
  { name: "Lomé", lat: 6.1725, lon: 1.2314 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
  { name: "Luanda", lat: -8.839, lon: 13.2894 },
  { name: "Lusaka", lat: -15.3875, lon: 28.3228 },
  { name: "Luxembourg", lat: 49.6117, lon: 6.1319 },
  { name: "Lviv", lat: 49.8397, lon: 24.0297 },
  { name: "Madrid", lat: 40.4168, lon: -3.7038 },
  { name: "Managua", lat: 12.1364, lon: -86.2514 },
  { name: "Manama", lat: 26.2235, lon: 50.5876 },
  { name: "Manila", lat: 14.5995, lon: 120.9842 },
  { name: "Maputo", lat: -25.9655, lon: 32.5832 },
  { name: "Marseille", lat: 43.2965, lon: 5.3698 },
  { name: "Mashhad", lat: 36.2605, lon: 59.6168 },
  { name: "Maseru", lat: -29.3151, lon: 27.4869 },
  { name: "Minsk", lat: 53.9, lon: 27.5667 },
  { name: "Mogadishu", lat: 2.0469, lon: 45.3182 },
  { name: "Monaco", lat: 43.7384, lon: 7.4246 },
  { name: "Monrovia", lat: 6.3156, lon: -10.8074 },
  { name: "Montevideo", lat: -34.9011, lon: -56.1645 },
  { name: "Montreal", lat: 45.5017, lon: -73.5673 },
  { name: "Moscow", lat: 55.7558, lon: 37.6176 },
  { name: "Mumbai", lat: 19.076, lon: 72.8777 },
  { name: "Munich", lat: 48.1351, lon: 11.582 },
  { name: "Muscat", lat: 23.588, lon: 58.3829 },
  { name: "Nairobi", lat: -1.2921, lon: 36.8219 },
  { name: "Nassau", lat: 25.0478, lon: -77.3554 },
  { name: "Naypyidaw", lat: 19.7633, lon: 96.0785 },
  { name: "N'Djamena", lat: 12.1348, lon: 15.0557 },
  { name: "New Delhi", lat: 28.6139, lon: 77.209 },
  { name: "New York", lat: 40.7128, lon: -74.006 },
  { name: "Niamey", lat: 13.5127, lon: 2.1126 },
  { name: "Nice", lat: 43.7102, lon: 7.262 },
  { name: "Nicosia", lat: 35.1856, lon: 33.3823 },
  { name: "Nouakchott", lat: 18.0735, lon: -15.9582 },
  { name: "Nouméa", lat: -22.2758, lon: 166.458 },
  { name: "Nukualofa", lat: -21.1394, lon: -175.204 },
  { name: "Nur-Sultan", lat: 51.1694, lon: 71.4491 },
  { name: "Osaka", lat: 34.6937, lon: 135.5023 },
  { name: "Oslo", lat: 59.9139, lon: 10.7522 },
  { name: "Ottawa", lat: 45.4215, lon: -75.6993 },
  { name: "Ouagadougou", lat: 12.3714, lon: -1.5197 },
  { name: "Palermo", lat: 38.1157, lon: 13.3615 },
  { name: "Panama City", lat: 8.9824, lon: -79.5199 },
  { name: "Paramaribo", lat: 5.852, lon: -55.2038 },
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Perth", lat: -31.9505, lon: 115.8605 },
  { name: "Philadelphia", lat: 39.9526, lon: -75.1652 },
  { name: "Phnom Penh", lat: 11.5564, lon: 104.9282 },
  { name: "Phoenix", lat: 33.4484, lon: -112.074 },
  { name: "Podgorica", lat: 42.441, lon: 19.2627 },
  { name: "Port Louis", lat: -20.1609, lon: 57.5012 },
  { name: "Port Moresby", lat: -9.4438, lon: 147.18 },
  { name: "Port of Spain", lat: 10.6549, lon: -61.5019 },
  { name: "Port-au-Prince", lat: 18.5944, lon: -72.3074 },
  { name: "Porto", lat: 41.1579, lon: -8.6291 },
  { name: "Porto Alegre", lat: -30.0346, lon: -51.2177 },
  { name: "Quito", lat: -0.1807, lon: -78.4678 },
  { name: "Rabat", lat: 34.0209, lon: -6.8416 },
  { name: "Raleigh", lat: 35.7796, lon: -78.6382 },
  { name: "Recife", lat: -8.0476, lon: -34.877 },
  { name: "Reykjavik", lat: 64.1355, lon: -21.8954 },
  { name: "Riga", lat: 56.9496, lon: 24.1052 },
  { name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729 },
  { name: "Riyadh", lat: 24.7136, lon: 46.6753 },
  { name: "Road Town", lat: 18.4207, lon: -64.6399 },
  { name: "Rome", lat: 41.9028, lon: 12.4964 },
  { name: "San José", lat: 9.9281, lon: -84.0907 },
  { name: "San Juan", lat: 18.4655, lon: -66.1057 },
  { name: "San Salvador", lat: 13.6929, lon: -89.2182 },
  { name: "Sanaa", lat: 15.3694, lon: 44.191 },
  { name: "Santiago", lat: -33.4489, lon: -70.6693 },
  { name: "Santo Domingo", lat: 18.4861, lon: -69.9312 },
  { name: "São Paulo", lat: -23.5505, lon: -46.6333 },
  { name: "Sarajevo", lat: 43.8563, lon: 18.4131 },
  { name: "Saratov", lat: 51.5333, lon: 46.0345 },
  { name: "Seattle", lat: 47.6062, lon: -122.3321 },
  { name: "Seoul", lat: 37.5665, lon: 126.978 },
  { name: "Shanghai", lat: 31.2304, lon: 121.4737 },
  { name: "Sharjah", lat: 25.3573, lon: 55.3914 },
  { name: "Singapore", lat: 1.3521, lon: 103.8198 },
  { name: "Skopje", lat: 41.9981, lon: 21.4254 },
  { name: "Sofia", lat: 42.6977, lon: 23.3219 },
  { name: "St. Petersburg", lat: 59.9343, lon: 30.3351 },
  { name: "Stockholm", lat: 59.3293, lon: 18.0686 },
  { name: "Sucre", lat: -19.033, lon: -65.262 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093 },
  { name: "São Luís", lat: -2.5307, lon: -44.3068 },
  { name: "Szczecin", lat: 53.4285, lon: 14.5528 },
  { name: "Salvador", lat: -12.9777, lon: -38.5016 },
  { name: "San Diego", lat: 32.7157, lon: -117.1611 },
  { name: "Santa Cruz", lat: -17.7892, lon: -63.1951 },
  { name: "Santa Fe", lat: 35.687, lon: -105.9378 },
  { name: "Sapporo", lat: 43.0618, lon: 141.3545 },
  { name: "Santos", lat: -23.9608, lon: -46.3336 },
  { name: "San Francisco", lat: 37.7749, lon: -122.4194 },
  { name: "Santa Monica", lat: 34.0195, lon: -118.4912 },
  { name: "Sakarya", lat: 40.7766, lon: 30.3948 },
  { name: "Salt Lake City", lat: 40.7608, lon: -111.891 },
  { name: "Sanya", lat: 18.2528, lon: 109.511 },
  { name: "San Sebastián", lat: 43.3183, lon: -1.9812 },
  { name: "Santa Rosa", lat: 38.4405, lon: -122.7144 },
  { name: "Saginaw", lat: 43.4195, lon: -83.9508 },
  { name: "Shenzhen", lat: 22.5429, lon: 114.0596 },
  { name: "Shenyang", lat: 41.8057, lon: 123.4315 },
  { name: "Shiraz", lat: 29.5918, lon: 52.5836 },
  { name: "Shijiazhuang", lat: 38.0428, lon: 114.5149 },
  { name: "Tabriz", lat: 38.0962, lon: 46.2738 },
  { name: "Tallinn", lat: 59.437, lon: 24.7536 },
  { name: "Tashkent", lat: 41.2995, lon: 69.2401 },
  { name: "Tbilisi", lat: 41.7151, lon: 44.8271 },
  { name: "Tehran", lat: 35.6892, lon: 51.389 },
  { name: "Tel Aviv", lat: 32.0853, lon: 34.7818 },
  { name: "Thimphu", lat: 27.4728, lon: 89.639 },
  { name: "Tirana", lat: 41.3275, lon: 19.8189 },
  { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
  { name: "Toronto", lat: 43.65107, lon: -79.347015 },
  { name: "Tripoli", lat: 32.8872, lon: 13.1913 },
  { name: "Tunis", lat: 36.8065, lon: 10.1815 },
  { name: "Turin", lat: 45.0703, lon: 7.6869 },
  { name: "Ulaanbaatar", lat: 47.8864, lon: 106.9057 },
  { name: "Utrecht", lat: 52.0907, lon: 5.1214 },
  { name: "Valletta", lat: 35.8997, lon: 14.5146 },
  { name: "Vancouver", lat: 49.2827, lon: -123.1207 },
  { name: "Venice", lat: 45.4408, lon: 12.3155 },
  { name: "Veracruz", lat: 19.1738, lon: -96.1342 },
  { name: "Vienna", lat: 48.2082, lon: 16.3738 },
  { name: "Vientiane", lat: 17.9757, lon: 102.6331 },
  { name: "Vilnius", lat: 54.6872, lon: 25.2797 },
  { name: "Warsaw", lat: 52.2297, lon: 21.0122 },
  { name: "Washington D.C.", lat: 38.9072, lon: -77.0369 },
  { name: "Wellington", lat: -41.2865, lon: 174.7762 },
  { name: "Windhoek", lat: -22.5609, lon: 17.0658 },
  { name: "Wuhan", lat: 30.5928, lon: 114.3055 },
  { name: "Xiamen", lat: 24.4798, lon: 118.0894 },
  { name: "Xi’an", lat: 34.3416, lon: 108.9398 },
  { name: "Yaoundé", lat: 3.848, lon: 11.5021 },
  { name: "Yerevan", lat: 40.1792, lon: 44.4991 },
  { name: "Zagreb", lat: 45.815, lon: 15.9785 },
  { name: "Zanzibar City", lat: -6.1659, lon: 39.2026 },
  { name: "Zaragoza", lat: 41.6488, lon: -0.8891 },
  { name: "Zhangzhou", lat: 24.513, lon: 117.6611 },
  { name: "Zhengzhou", lat: 34.7466, lon: 113.6254 },
  { name: "Zhuhai", lat: 22.276, lon: 113.5677 },
  { name: "Zibo", lat: 36.8131, lon: 118.0548 },
  { name: "Zürich", lat: 47.3769, lon: 8.5417 },
  { name: "Addis Ababa", lat: 9.03, lon: 38.74 },
  { name: "Ahmedabad", lat: 23.0225, lon: 72.5714 },
  { name: "Alexandria", lat: 31.2001, lon: 29.9187 },
  { name: "Anshan", lat: 41.1076, lon: 122.9942 },
  { name: "Barcelona", lat: 41.3851, lon: 2.1734 },
  { name: "Beijing", lat: 39.9042, lon: 116.4074 },
  { name: "Chongqing", lat: 29.4316, lon: 106.9123 },
  { name: "Guangzhou", lat: 23.1291, lon: 113.2644 },
  { name: "Ho Chi Minh City", lat: 10.7769, lon: 106.7009 },
  { name: "Hyderabad", lat: 17.385, lon: 78.4867 },
  { name: "Jakarta", lat: -6.2088, lon: 106.8456 },
  { name: "Karachi", lat: 24.8607, lon: 67.0011 }
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

function getWeatherIcon(code) {
  if ([0, 1, 2].includes(code)) return "☀️";      
  if (code >= 3 && code <= 45) return "☁️";       
  if (code >= 50 && code <= 65) return "🌧️";     
  if (code >= 71 && code <= 77) return "❄️";     
  return "❓";
}

async function handleSearch(fp) {
  const selected = (fp && fp.selectedDates) || [];
  if (selected.length === 0) {
    alert("Kérlek add meg az utazás dátumát!");
    return;
  }

  const startDateStr = formatDateYMD(selected[0]);
  const endDateStr = formatDateYMD(selected[1] || selected[0]);

  const weatherType = document.getElementById("weatherType")?.value || "";
  const minTemp = parseFloat(document.getElementById("minTemp")?.value) || -Infinity;
  const maxTemp = parseFloat(document.getElementById("maxTemp")?.value) || Infinity;

  const results = [];
  locationsDiv.innerHTML = "<p>🌦️ Városok keresése folyamatban...</p>";
  //bookingPanel.innerHTML = "";
  markersLayer.getSource().clear();

  for (const city of cities) {
    try {
      const weather = await getWeather(city.lat, city.lon, startDateStr, endDateStr);
      const temps = weather.daily?.temperature_2m_max;
      const codes = weather.daily?.weathercode;
      if (!temps || !codes) continue;

      let matchCount = 0;
      for (let i = 0; i < codes.length; i++) {
        const code = codes[i];
        const temp = temps[i];

        let weatherOk = false;
        switch(weatherType) {
          case "sunny": weatherOk = [0,1,2].includes(code); break;
          case "cloudy": weatherOk = (code >= 3 && code <= 45); break;
          case "rain": weatherOk = (code >= 50 && code <= 65); break;
          case "snow": weatherOk = (code >= 71 && code <= 77); break;
          default: weatherOk = true;
        }

        const tempOk = (temp >= minTemp && temp <= maxTemp);

        if (weatherOk && tempOk) matchCount++;
      }

      if (matchCount / codes.length >= 0.5) {
        results.push({
          city: city.name,
          lat: city.lat,
          lon: city.lon,
          temp: Math.round(temps.reduce((a,b)=>a+b)/temps.length),
          icon: getWeatherIcon(codes[0]),
          startDate: startDateStr,
          endDate: endDateStr,
          matchDays: matchCount
        });
      }

    } catch (err) {
      console.error(`Hiba ${city.name} esetén:`, err);
    }
  }

  displayResults(results);
}

function formatDateYMD(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
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
    locationsDiv.innerHTML = "<p>😅 Sajnos nincs ideális hely... talán maradjon itthon?</p>";
    return;
  }

  results.forEach(result => {
    const card = document.createElement("div");
    card.className = "location-card";
    card.innerHTML = `
      <h3>${result.icon} ${result.city}</h3>
      <p>🗓️ ${result.startDate} – ${result.endDate}</p>
      <p>🌡️ Átlaghőmérséklet: ${result.temp} °C</p>
      <p>✅ Megfelelő napok: ${result.matchDays}</p>
    `;

    card.addEventListener("click", () => {
      markersLayer.getSource().clear();
      const marker = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([result.lon, result.lat]))
      });
      marker.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
          src: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
          scale: 0.07
        })
      }));
      markersLayer.getSource().addFeature(marker);
      map.getView().animate({
        center: ol.proj.fromLonLat([result.lon, result.lat]),
        zoom: 7,
        duration: 1000
      });

      showBookingPanel(result.city, result.startDate, result.endDate);

      // 👇 Görgetés a térképhez
      document.getElementById("map").scrollIntoView({ behavior: "smooth" });
    });

    locationsDiv.appendChild(card);

  });

  const first = results[0];
  map.getView().setCenter(ol.proj.fromLonLat([first.lon, first.lat]));
  map.getView().setZoom(5);
}

function showBookingPanel(city, start, end) {
  
  document.getElementById("bookingCity").textContent = city;
  document.getElementById("bookingDates").textContent = `${start} – ${end}`;

  const openFormBtn = document.getElementById("openFormBtn");
  const bookingFormContainer = document.getElementById("bookingFormContainer");
  const bookingForm = document.getElementById("bookingForm");

  
  if (openFormBtn && bookingFormContainer) {
    openFormBtn.onclick = () => {
      bookingFormContainer.style.display = "block";
      openFormBtn.style.display = "none";
    };
  }

  if (bookingForm) {
    bookingForm.onsubmit = (e) => {
      e.preventDefault();
      const name = bookingForm.name.value;
      const email = bookingForm.email.value;
      const phone = bookingForm.phone.value;

      alert(`✅ Foglalás elküldve ${city}-ba!\nNév: ${name}\nEmail: ${email}\nTelefonszám: ${phone}`);

      bookingForm.reset();
      bookingFormContainer.style.display = "none";
      openFormBtn.style.display = "block";
    };
  }
}
