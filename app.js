const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


// app.get("/", (req, res) => {
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=Ludhiana&appid=9f19f079d6c8a0370266b234ce4b36bb&units=metric";
//     https.get(url, (result) => {
//         result.on("data", (data) => {
//             const WeatherData = JSON.parse(data);
//             console.log(WeatherData);
//             const temp = WeatherData.main.temp;
//             const WeatherDescription = WeatherData.weather[0].description;
//             const city = WeatherData.name;
//             const icon = WeatherData.weather[0].icon;
//             const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
//             res.write("<p>The Currently the weather is currently " + WeatherDescription + "</p>");
//             res.write("<h1>The temperature in the " + city + " is " + temp + " degrees celcius</h1>");
//             res.write("<img src=" + imageUrl + ">");
//             res.send();
//         })
//     })


// })


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
//api request
app.post('/', (req, res) => {
    console.log("request received");
    const query = req.body.cityName;
    const apiKey = '9f19f079d6c8a0370266b234ce4b36bb';
    const unit = 'metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=' + unit;
    https.get(url, (result) => {
        result.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            const imageUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degree celcius.</h1>");

            res.write("<img src=" + imageUrl + ">");
            res.send();
        })
    })


})

app.listen(3000, () => {
    console.log("server is running on 3000");
})

