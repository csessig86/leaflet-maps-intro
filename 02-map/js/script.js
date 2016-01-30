// Call Stamen tiles
var layer = new L.StamenTileLayer('terrain');

// Initialize our map
// The first setview parameter is the lat, long
// Of the initial zoom
// The second parameter is the zoom level
var map = new L.Map('map').setView([42,-93],6);
map.addLayer(layer);