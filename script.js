document.getElementById('getWeather').addEventListener('click', getWeather);

async function getWeather() {
    const location = document.getElementById('location').value.trim();
    if (!location) {
        document.getElementById('weatherResult').innerText = 'Please enter a location.';
        return;
    }

    const apiKey = 'cd567a5d101fb06cd08e8f89033e2afc'; // Get your API key from OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Location not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherResult').innerText = `Error: ${error.message}`;
    }
}
function changeBackground(condition) {
    const body = document.body;
    
    // Define background image URLs for different weather conditions
    const backgrounds = {
        clear: 'url("images/sunny.jpg")',
        clouds: 'url("images/cloudy.jpg")',
        rain: 'url("images/rainy.jpg")',
        snow: 'url("images/snowy.jpg")',
        thunderstorm: 'url("images/thunderstorm.jpg")',
        mist: 'url("images/misty.jpg")',
        Sunny: 'url("images/sunny.jpg")',
        Windy: 'url("images/misty.jpg")',
        Stormy: 'url("images/thunderstorm.jpg")',
        Chilly: 'url("images/sunny.jpg")',
        Snowy: 'url("images/snowy.jpg")',
        Gloomy: 'url("images/thunderstorm.jpg")',
        Foggy: 'url("images/misty.jpg")',
        Icy: 'url("images/snowy.jpg")',
        Cold: 'url("images/snowy.jpg")',
        Hot: 'url("images/sunny.jpg")',
        Humid: 'url("images/cloudy.jpg")',
        Warm: 'url("images/sunny.jpg")',
        Hazy: 'url("images/snowy.jpg")',
        Misty: 'url("images/misty.jpg")',
        default: 'url("images/default.jpg")'  // Fallback background
    };
    
    // Apply the background based on weather condition
    body.style.background = backgrounds[condition] || backgrounds.default;
    body.style.backgroundSize = 'cover';  // Ensure the background covers the screen
    body.style.backgroundPosition = 'center center';
    body.style.backgroundAttachment = 'fixed';  // Keep background fixed during scrolling
}

function displayWeather(data) {
    const { name, main: { temp }, weather } = data;
    const weatherDescription = weather[0].description;

    // Add HTML content to show the weather details
    document.getElementById('weatherResult').innerHTML = `
        <h2>Weather in ${name}</h2>
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Description:</strong> ${weatherDescription}</p>
    `;
}
