#Building maps with Leaflet.js
This is the code behind my NICAR 2016 session on making maps with [Leaflet.js](https://github.com/Leaflet/Leaflet). This session is best for people with a beginner's understanding of Javascript.

####1. Why Leaflet.js?
* Free, open source and actively maintained
* Well documented with great examples
* Has a huge community behind it
* Used by a lot of people
* Minimal amount of code
* Mobile friendly
* Can handle thousands of data points without loading too slowly
* [Plugins](http://leafletjs.com/plugins.html)! Example of the [markercluster plugin](http://csessig86.github.io/tabletop_to_leaflet/#cluster)

####2. The set up
* This repo has two directories:
	* 01-base contains the base files you will need to get started. None of the mapping code has been written in this directory.
	* 02-map is the final project we are going to build.

####2. Getting started
* Download this repo onto your computer and rename it if you want. Then open up the 01-base directory you created in a text editor. We'll be adding our mapping code to the files in this directory.

####3. Base map
* Add this to js/script.js:
	```javascript
	// Call Stamen tiles
	var layer = new L.StamenTileLayer('toner-background');

	// Initialize our map
	// The first setview parameter is the lat, long
	// Of the initial zoom
	// The second parameter is the zoom level
	var map = new L.Map('map').setView([42,-93],6);
	map.addLayer(layer);
	```

####4. CSS
* Add this to css/style.css:
	```css
	#map {
		width: 100%;
		height: 500px;
	}

	```

####5. Add data to map
* Our sample dataset is [a list of breweries in Iowa](https://docs.google.com/spreadsheets/d/1M6mREJiDMQ1NTbdbOXiw0sWN_6DE7E33JJY503GS7tc/pub?output=html). I've already included lat, long information for each brewery and converted the CSV into a JSON file. You must have lat, long information for each location for Leaflet to put them on the map.

* Pro-tip: If you need a site to convert CSVs into JSON files, check out [Mr. Data Converter](http://shancarter.github.io/mr-data-converter/)

* The breweries JSON data is one array. Each brewery is an object within that array. You need to make sure the array is a variable, so go into the file and add this before it:
	```javascript
	var breweries = 

	```

* This makes it easy for us to loop through that variable of our JSON array:
	```javascript
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
	```

####6. Add GeoJSON data