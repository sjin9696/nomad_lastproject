const GEO_OPTIONS = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5000
};
const API_KEY = "d4e90ab38a61072a70e786d43064f167";
const WEATHER_POSITION_KEY = 'weatherPosition';

const LOADING_MESSAGES = [
    "🛰️ 인공위성 찾는 중...",
    "🤔 정보를 물어보는 중...",
    "☁️ 하늘로 가보는 중...",
    "🌡️ 온도계 체크 중...",
    "🧭 방향 찾는 중...",
    "🌍 지구 돌려보는 중...",
    "🔍 구름 관찰 중...",
    "📡 신호 수신 중...",
    "⏳ 기다려주세요...",
    "✨ 마법을 부리는 중..."
];

let currentLoadingIndex = 0;

function getNextLoadingMessage() {
    const message = LOADING_MESSAGES[currentLoadingIndex];
    currentLoadingIndex = (currentLoadingIndex + 1) % LOADING_MESSAGES.length;
    return message;
}

function showLoading() {
    const weatherContainer = document.querySelector("#weather");
    weatherContainer.innerHTML = `
        <span class="loading">${getNextLoadingMessage()}</span>
    `;
    applyLoadingStyles(weatherContainer);
    
    const loadingInterval = setInterval(() => {
        weatherContainer.querySelector('.loading').textContent = getNextLoadingMessage();
    }, 200);

    setTimeout(() => {
        clearInterval(loadingInterval);
    }, LOADING_MESSAGES.length * 200);
}

function applyLoadingStyles(container) {
    Object.assign(container.style, {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px",
        marginTop: "20px"
    });
    
    container.querySelector(".loading").style.color = "#fff";
    container.querySelector(".loading").style.fontSize = "1.2em";
}

function initWeather() {
    showLoading();
    const savedPosition = localStorage.getItem(WEATHER_POSITION_KEY);
    
    if (savedPosition) {
        setTimeout(() => onGeoSuccess(JSON.parse(savedPosition)), LOADING_MESSAGES.length * 200);
    } else {
        checkGeolocationPermission();
    }
}

function checkGeolocationPermission() {
    navigator.permissions.query({ name: 'geolocation' })
        .then(permissionStatus => {
            if (permissionStatus.state === 'granted') {
                getWeatherInfo();
            } else {
                navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, GEO_OPTIONS);
            }
            
            permissionStatus.onchange = () => {
                if (permissionStatus.state === 'granted') {
                    getWeatherInfo();
                }
            };
        });
}

function getWeatherInfo() {
    navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, GEO_OPTIONS);
}

function onGeoSuccess(position) {
    savePosition(position);
    setTimeout(() => fetchWeatherData(position.coords.latitude, position.coords.longitude), LOADING_MESSAGES.length * 200);
}

function savePosition(position) {
    localStorage.setItem(WEATHER_POSITION_KEY, JSON.stringify(position));
}

function fetchWeatherData(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => updateWeatherUI(data))
        .catch(handleWeatherError);
}

function updateWeatherUI(data) {
    const weatherContainer = document.querySelector("#weather");
    
    const weatherStatus = {
        'Clear': '맑음',
        'Clouds': '구름',
        'Rain': '비',
        'Snow': '눈',
        'Thunderstorm': '천둥번개',
        'Drizzle': '이슬비',
        'Mist': '안개',
        'Smoke': '연기',
        'Haze': '안개',
        'Dust': '먼지',
        'Fog': '안개',
        'Sand': '모래',
        'Ash': '재',
        'Squall': '돌풍',
        'Tornado': '토네이도'
    };
    
    const status = weatherStatus[data.weather[0].main] || data.weather[0].main;
    
    const fullLocation = `${data.name}, ${data.sys.country}`;
    weatherContainer.innerHTML = `<span>🌍 ${fullLocation} /🌤️ ${status}/🌡️ ${Math.round(data.main.temp)}°C</span> `;
    applyWeatherStyles(weatherContainer);
}

function applyWeatherStyles(container) {
    Object.assign(container.style, {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        marginTop: "20px",
        padding: "15px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
    });
    
    container.querySelectorAll("span").forEach(span => {
        span.style.fontSize = "1.2em";
        span.style.color = "#fff";
        span.style.display = "flex";
        span.style.gap = "10px";
    });
}

function onGeoError() {
    const weatherContainer = document.querySelector("#weather");
    weatherContainer.innerHTML = `<span>위치 정보를 찾을 수 없습니다.</span>`;
    applyWeatherStyles(weatherContainer);
}

function handleWeatherError(error) {
    const weatherContainer = document.querySelector("#weather");
    weatherContainer.innerHTML = `<span>날씨 정보를 가져오는데 실패했습니다.</span>`;
    applyWeatherStyles(weatherContainer);
    console.error("날씨 정보를 가져오는데 실패했습니다:", error);
}

initWeather();
