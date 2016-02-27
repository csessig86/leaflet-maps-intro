// Call Stamen tiles
var layer = new L.StamenTileLayer('toner-background');

// Initialize our map
// The first setview parameter is the lat, long
// Of the initial zoom
// The second parameter is the zoom level
var map = new L.Map('map').setView([42,-93],6);
map.addLayer(layer);

// Loop through each brewery in our breweries variable
// Each brewery is an object
// Inside breweries, which is an array
for (var num = 0; num < breweries.length; num++) {
	// Grab information on the brewery we are currently looping through
	var brewery = breweries[num];
	var brewery_lat = brewery["latitude"];
	var brewery_long = brewery["longitude"];

	// Use Leaflet to add a marker for each brewery
	// And give it the lat, long information
	// In the current brewery's object
	var brewery_marker = L.marker([brewery_lat, brewery_long]).addTo(map);
}