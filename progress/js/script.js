var layer = new L.StamenTileLayer('toner-background');

var map = new L.Map('map').setView([42,-93],7);
map.addLayer(layer);

for (var num = 0; num < breweries.length; num++) {
	var brewery = breweries[num];
	var brewery_lat = brewery["latitude"];
	var brewery_long = brewery["longitude"];

	L.marker([brewery_lat, brewery_long]).addTo(map);
}