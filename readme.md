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
	* 02-final is the final project we are going to build.

####2. Getting started
* Download this repo onto your computer and rename it if you want. Then open up the 01-base directory you created in a text editor. We'll be adding our mapping code to the files in this directory.

* You'll notice at the bottom of the index.html file these lines:
	```html
	<!-- Our data sources -->
	<script src="json/ia-breweries.json"></script>
	<script src="json/ia-counties.json"></script>
	```

* These link to the data sources we're going to be using: [JSON data](http://www.copterlabs.com/json-what-it-is-how-it-works-how-to-use-it/) of breweries in Iowa and [GeoJSON data](http://geojson.org/) of the counties in Iowa.

####3. Base map
* Add this to js/script.js:
	```javascript
	var layer = new L.StamenTileLayer('toner-background');

	var map = new L.Map('map').setView([42,-93],7);
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
	for (var num = 0; num < breweries.length; num++) {
		var brewery = breweries[num];
		var brewery_lat = brewery["latitude"];
		var brewery_long = brewery["longitude"];

		var brewery_marker = L.marker([brewery_lat, brewery_long]).addTo(map);
	}
	```

####6. Add GeoJSON data
* The second dataset we will be working is a list of counties in Iowa, which is available in GeoJSON format [here](http://catalog.opendata.city/dataset/iowa-counties-polygon/resource/52b6d8b4-b203-4ab3-94db-e5e93c335a14). I've downloaded this already and included it within the data directory.

* Like with our breweries, I've made the JSON object a variable so it can be easiliy called within script.js:
	```javascript
	var ia_counties = 
	```

* Adding our counties to the map only takes one line of code:
	```javascript
	L.geoJson(iowa_counties).addTo(map);
	```

* Note: You'll what to place this ABOVE the for loop that places marker on the map, so the counties appear under the markers.

* Refresh your map and you'll see the counties now on the map.

####7. Styling the counties
* The counties kind of look ugly right now. We can fix that by extending the geojson object we added:

	```javascript
	L.geoJson(iowa_counties, {
		style: {
			opacity: 1,
			weight: 2,
			color: "#FFF",
			fillColor: "#ff7800",
			fillOpacity: 0.8
		}
	}).addTo(map);
	```

For more information on the different styling options available for GeoJSON layers, visit [this page](http://mourner.github.io/Leaflet/reference.html#path-options).

####7. Color counties based on population data
* Our map is cool and all but the counties don't tell us much. Wouldn't it be neat if we could shade the counties based on how many people lived within them? Fortunately we can do that relatively easily in Leaflet.

* The final piece of data we will be working with is population data from the [U.S. Census](http://www.census.gov/. We will create a basic [choropleth map](http://leafletjs.com/examples/choropleth.html) where the counties will be shaded based on their population. The more people, the darker the county.

* I've already downloaded the data from the [Census Reporter site](http://censusreporter.org/data/table/?table=B01003&geo_ids=04000US19,050|04000US19,050|04000US19&primary_geo_id=04000US19) and merged it into the county GeoJSON file that's on the map. I used [QGIS](http://www.qgis.org/en/site/) to do this. If you're not familiar with QGIS, I recommend checking it out. It's a like watered-down version of [ArcGIS](https://www.arcgis.com/features/). But unlike ArcGIS, it's free.

* There's a really handy function Leaflet provides called onEachFeature function that will help us create our choropleth map:
	```javascript
	L.geoJson(iowa_counties, {
		style: {
			opacity: 1,
			weight: 2,
			color: "#FFF",
			fillColor: "#ff7800",
			fillOpacity: 0.8
		},
		onEachFeature: function (feature, layer) {
			var population = feature['properties']['population'];
			var population_num = parseInt(population);
		}
	}).addTo(map);
	```

* This function is ran every time a shape is put on the map. Since Iowa has 99 counties, this function will run 99 times when creating this map.

* Each county it loops through is an object, with a couple of data points, including the shape of the county and the population (which I added with QGIS). We're after the county's population, and the population variable within the onEachFeature function grabs it. It's stored as a string in the object, so we need to convert it to an integer using the handy [parseInt function](http://www.w3schools.com/jsref/jsref_parseint.asp). We store it as population_num.

*