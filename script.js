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
