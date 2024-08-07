const APIKEY = '19f10bec5a9e418e967185115240708';

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

const cityName = document.getElementById('city-name');
const countryName = document.getElementById('countryName');
const localTime = document.getElementById('loc-time');
const temp = document.getElementById('temp');
const sup = document.getElementById('sup');

async function getData(APIKEY, cityName) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${encodeURIComponent(cityName)}&aqi=no`;
    const promise = await fetch(url);
    if (!promise.ok) {
        throw new Error(`HTTP error! status: ${promise.status}`);
    }
    return await promise.json();
}

searchBtn.addEventListener('click', async () => {
    const input = cityInput.value.trim();
    if (input) {
        document.getElementById('outputCard').style.visibility = 'visible';
        try {
            const result = await getData(APIKEY, input);
            cityName.innerText = `${result.location.name}, ${result.location.region}`;
            countryName.innerText = `${result.location.country}`;
            temp.innerText = `${result.current.temp_c}`;
            sup.innerText = '°C';
            localTime.innerText = `${result.location.localtime}`;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            cityName.innerText = 'Error fetching data. Please try again later.';
        }
    } else {
        alert('Please enter a valid city name.');
    }
});
