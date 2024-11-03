document.getElementById('getWeather').addEventListener('click', getWeather);

async function getWeather() {
    const location = document.getElementById('location').value;
    const apiKey = 'YOUR_API_KEY'; // Get your API key from OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Location not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherResult').innerText = error.message;
    }
}

function displayWeather(data) {
    const { name, main: { temp }, weather } = data;
    const weatherDescription = weather[0].description;
    document.getElementById('weatherResult').innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${temp}°C</p>
        <p>Description: ${weatherDescription}</p>
    `;
}
