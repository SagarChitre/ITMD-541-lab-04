async function getCoordinates(location) {

    const geocodeUrl = `https://geocode.maps.co/search?q=${location}`;

    try {
        let response = await fetch(geocodeUrl);
        let data = await response.json();
        let c = data[0];
        return { lat: c['lat'], lng: c['lon'] };
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
}

async function getSunriseSunset(lat, lng, date) {
    const sunriseSunsetUrl = 'https://api.sunrisesunset.io/json?lat=' + lat + '&lng=' + lng + '&date=' + date;

    try {
        const response = await fetch(sunriseSunsetUrl);
        const data = await response.json();

        const { sunrise, sunset, dawn, dusk, day_length, solar_noon, timezone } = data.results;
        return { sunrise, sunset, dawn, dusk, day_length, solar_noon, timezone };
    } catch (error) {
        console.error('Error fetching sunrise/sunset:', error);
        return null;
    }
}




async function getGeoLocation() {
    const userLocation = document.getElementById('cityName').value;

    const coordinates = await getCoordinates(userLocation);
    if (coordinates) {
        const { lat, lng } = coordinates;
        const sunriseSunsetToday = await getSunriseSunset(lat, lng, 'today');
        const sunriseSunsetTomorrow = await getSunriseSunset(lat, lng, 'tomorrow');


       if (sunriseSunsetToday) {
            displaySunriseSunsetToday(userLocation, sunriseSunsetToday);
            displaySunriseSunsetTomorrow(userLocation, sunriseSunsetTomorrow);
        } else {
            displayError();
        }
    } else {
        displayError();
    }
}

function displaySunriseSunsetToday(location, sunriseSunset) {
    document.getElementById('sunrise-today').textContent = sunriseSunset.sunrise;
    document.getElementById('sunset-today').textContent = sunriseSunset.sunset;
    document.getElementById('dawn-today').textContent = sunriseSunset.dawn;
    document.getElementById('dusk-today').textContent = sunriseSunset.dusk;
    document.getElementById('day-length-today').textContent = sunriseSunset.day_length;
    document.getElementById('solar-noon-today').textContent = sunriseSunset.solar_noon;
    document.getElementById('time-zone-today').textContent = sunriseSunset.timezone;

}

function displaySunriseSunsetTomorrow(location, sunriseSunset) {
    document.getElementById('sunrise-tomorrow').textContent = sunriseSunset.sunrise;
    document.getElementById('sunset-tomorrow').textContent = sunriseSunset.sunset;
    document.getElementById('dawn-tomorrow').textContent = sunriseSunset.dawn;
    document.getElementById('dusk-tomorrow').textContent = sunriseSunset.dusk;
    document.getElementById('day-length-tomorrow').textContent = sunriseSunset.day_length;
    document.getElementById('solar-noon-tomorrow').textContent = sunriseSunset.solar_noon;
    document.getElementById('time-zone-tomorrow').textContent = sunriseSunset.timezone;

}

