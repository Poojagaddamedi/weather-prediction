var inputvalue = document.querySelector('#cityinput');
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput');
var descrip = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
var apik = "aca091a1cac8b44dc3d40806ecb2feb2";

function conversion(val) {
    return (val - 273.15).toFixed(2); // Conversion to Celsius with better precision
}

btn.addEventListener('click', function () {
    let cityName = inputvalue.value.trim();
    
    if (!cityName) {
        alert("Please enter a city name!");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apik}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }

            // Handle UTF-8 charset manually if needed
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.arrayBuffer().then(buffer => {
                    const decoder = new TextDecoder('utf-8');
                    const text = decoder.decode(buffer);
                    return JSON.parse(text);
                });
            } else {
                throw new Error("Unexpected content type");
            }
        })
        .then(data => {
            var nameval = data['name'];
            var descripText = data['weather'][0]['description'];
            var temperature = data['main']['temp'];
            var wndspeed = data['wind']['speed'];

            city.innerHTML = `Weather of <span>${nameval}</span>`;
            temp.innerHTML = `Temperature: <span>${conversion(temperature)} °C</span>`;
            descrip.innerHTML = `Sky conditions: <span>${descripText}</span>`;
            wind.innerHTML = `Wind speed: <span>${wndspeed} km/h</span>`;
        })
        .catch(err => {
            console.error(err);
            alert("Error fetching data: " + err.message);
        });
});
