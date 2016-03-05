var layer = new L.StamenTileLayer('toner-background');

var map = new L.Map('map').setView([42,-93],7);
map.addLayer(layer);

function setColor(population) {
    var population_num = parseInt(population)

    if (population_num > 150000) {
        return '#005824';
    } else if (population_num > 125000) {
        return '#238b45';
    } else if (population_num > 100000) {
        return '#41ae76';
    } else if (population_num > 75000) {
        return '#66c2a4';
    } else if (population_num > 50000) {
        return '#99d8c9';
    } else if (population_num > 25000) {
        return '#ccece6';
    } else {
        return '#edf8fb';
    }
}

function setStyle(feature) {
    return {
        opacity: 1,
        weight: 2,
        color: "#FFF",
        fillColor: setColor(feature.properties.population),
        fillOpacity: 0.8
    }
}

L.geoJson(iowa_counties, {
    style: setStyle
}).addTo(map);

for (var num = 0; num < breweries.length; num++) {
    var brewery = breweries[num];
    var brewery_lat = brewery["latitude"];
    var brewery_long = brewery["longitude"];

    var brewery_marker = L.marker([brewery_lat, brewery_long]).addTo(map);
}