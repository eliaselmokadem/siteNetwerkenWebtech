let map = L.map('map').setView([51.230155, 4.41601], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let marker = L.marker([51.230155, 4.41601]).addTo(map);
marker.bindPopup("Campus Ellermanstraat");