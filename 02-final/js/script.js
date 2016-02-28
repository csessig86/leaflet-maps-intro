// Call Stamen tiles
var layer = new L.StamenTileLayer('toner-background');

// Initialize our map
// The first setview parameter is the lat, long
// Of the initial zoom
// The second parameter is the zoom level
var map = new L.Map('map').setView([42,-93],7);
map.addLayer(layer);

// Call the GeoJSON file ia-counties
// Which is in a variable called iowa_counties
// And add to the map
L.geoJson(iowa_counties, {
	style: {
		opacity: 1,
		weight: 2,
		color: "#FFF",
		fillColor: "#ff7800",
		fillOpacity: 0.8
	},
	// Ran each time a shape is added to the map
	// This will be ran 99 times because we have 99 counties
	// To put on the map
	onEachFeature: function (feature, layer) {
		// Grab the population for each county
		var population = feature['properties']['population'];
		// It's stored as a string in the object,
		// So we need to convert it to an integer
		var population_num = parseInt(population);

		console.log(population_num);
	}
}).addTo(map);

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