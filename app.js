//select search input element
const ipInput = document.querySelector('.ip-address');
//select search button
const searchBtn = document.querySelector('.search');

//select info card elements
const ipElement = document.querySelector('.ip');
const locationElement = document.querySelector('.location');
const timezoneElement = document.querySelector('.timezone');
const ispElement = document.querySelector('.isp');

let lat = 51.505;
let lng = -0.09;
let ipAddress = '173.249.50.67';

//initialise map
var mymap = L.map('mapid').setView([lat, lng], 15);

//create customise icon
var myIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize: [40, 50]
})

//add tile layer

L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=FWqvyGzcT7DKcrRmTzKY', {
    // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);


window.onload = function () {
    let url = 'https://geo.ipify.org/api/v1?apiKey=at_DFDIgO3ytAIAvyMMM0KGPk8J9bDOC';
    trackIp(url);
}



//track ip inside the search box when click search button
searchBtn.onclick = function() {
    let inputText = ipInput.value;
    let url;
    if (inputText[0] >= '0' && inputText[0] <= '9') {
        url = 'https://geo.ipify.org/api/v1?apiKey=at_DFDIgO3ytAIAvyMMM0KGPk8J9bDOC&ipAddress=' + inputText;
    } else {
        url = 'https://geo.ipify.org/api/v1?apiKey=at_DFDIgO3ytAIAvyMMM0KGPk8J9bDOC&domain=' + inputText;
    }
    trackIp(url);
}

//this function request data from ip uppon the ip address
function trackIp(url) {
    fetch(url).then(data=> {return data.json()})
    .then(res => {
        lat = res.location.lat;
        lng = res.location.lng;
        setMapView(lat, lng);
        updateInfoCard(res);
    });
}

//this function update the map uppon lat and lng data
function setMapView(lat, lng) {
    mymap.setView([lat, lng]);
    L.marker([lat, lng], {icon: myIcon}).addTo(mymap);
}

function updateInfoCard(res) {
    ipElement.textContent = res.ip;
    locationElement.textContent = res.location.city + ", " + res.location.postalCode;
    timezoneElement.textContent = "UTC " + res.location.timezone;
    ispElement.textContent = res.isp;
}