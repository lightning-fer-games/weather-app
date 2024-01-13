const iconWeather = document.querySelector('.icon-weather');
const temperatureWeather = document.querySelector('.temperature-weather');
const locationWeather = document.querySelector('.location-weather');
const suggestionEl = document.getElementById('suggestion');
const rootElement = document.documentElement;

window.navigator.geolocation.getCurrentPosition(onSuccess, onError);

function onError(error) {
    console.error(error)
    locationWeather.innerText = "devi attivare la geolocalizzazione";
    document.querySelector('.error').style.display = "block";
}
function onSuccess(position) {
    console.log(position)

// dati principali
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const language = 'it';
    const units = 'metric'
    const endpoint = 'https://api.openweathermap.org/data/2.5/weather';
    const apiKey = '4f8b28a4480b9470bf3199fa7b10eef7';

    const apiUrl = `${endpoint}?lat=${latitude}&lon=${longitude}&units=${units}&lang=${language}&appid=${apiKey}`;

    console.log(apiUrl);
    
    fetch(apiUrl)
        .then(function(response){
            const data = response.json();
            return data;
        })
        .then(function(data){
            console.log(data);

            const namePosition = data.name;
            const temperature = Math.floor(data.main.temp);
            const iconId = data.weather[0].icon;
            const descriptionData = data.weather[0].description

            
            const suggestion = getSuggestion(iconId)

            locationWeather.innerText = namePosition;
            temperatureWeather.innerText = `${temperature}°`;
            iconWeather.alt = descriptionData;
            iconWeather.src = `./images/${iconId}.png`;
            suggestionEl.innerText = descriptionData;

            rootElement.classList.remove('js-loading')


            console.log(suggestion);
        });
}


function getSuggestion(id) {
    const suggestions = {
        '01d': 'Ricordati la crema solarel',
        '01n': 'Buonanotte!',
        '02d': 'Oggi 11 sole va e viene...',
        '02n': 'Attenti ai lupi mannari...',
        '03d': 'Luce perfetta per fare fotol',
        '03n': 'Dormi sereno :)',
        '04d': 'Che cielo grigio :(',
        '04n': 'Non si vede nemmeno la luna!',
        '09d': 'Prendi l\'ombrello',
        '09n': 'Copriti bene!',
        '10d': 'Prendi I\'ombrello',
        '10n': 'Copriti bene!',
        '11d': 'Attento al fulminil',
        '11n': 'I lampi accendono la notte!',
        '13d': 'Esci a fare un pupazzo di neve!',
        '13n': 'Notte perfetta per stare sotto si piumone',
        '50d': 'Accendi i fendinebbia!',
        '50n' : 'Guida con prudenza!',
    }

    return suggestions[id]
}