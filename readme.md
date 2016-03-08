#Building your first Leaflet.js map
This is the code behind my NICAR 2016 session on making maps with [Leaflet.js](https://github.com/Leaflet/Leaflet).

###[LIVE DEMO](http://csessig86.github.io/leaflet-maps-intro/)

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
	* 01-base contains the base files you will need to get started. All the files you need have been created here, but none of the mapping code has been written yet.
	* 02-final is the final project we are going to build.

####2. Getting started
* Download this repo onto your computer. Then open up the 01-base directory you created in a text editor. We'll be adding our mapping code to the files in this directory.

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
* This gets us a map without any data points.

####5. Add data to map
* Our sample dataset is [a list of breweries in Iowa](https://docs.google.com/spreadsheets/d/1M6mREJiDMQ1NTbdbOXiw0sWN_6DE7E33JJY503GS7tc/pub?output=html). I've already included lat, long information for each brewery and converted the CSV into a JSON file. You must have lat, long information for each location for Leaflet to put them on the map.

* Pro-tip: If you need a site to convert CSVs into JSON files, check out [Mr. Data Converter](http://shancarter.github.io/mr-data-converter/). And if you're looking for a site that can geocode addresses in a Google spreadsheet, check out [this site](http://gmaps-samples.googlecode.com/svn/trunk/spreadsheetsgeocoder/geocodespreadsheet.htm).

* The breweries JSON data is one array. Each brewery is an object within that array. Objects have keys and values and each represent a data point. For instance, in the breweries data, one of the keys is address. The value is address for the specific brewery.

* You need to make sure the array is a variable, so go into the file and add this before it:
	```javascript
	var breweries = 
	```

* This makes it easy for us to loop through that variable of our JSON array:
	```javascript
	for (var num = 0; num < breweries.length; num++) {
		var brewery = breweries[num];
		var brewery_lat = brewery["latitude"];
		var brewery_long = brewery["longitude"];

		L.marker([brewery_lat, brewery_long]).addTo(map);
	}
	```
* This loops through each brewery, grabs the brewery's latitude and longitude information and puts it on the map. The [L.marker function](http://leafletjs.com/reference.html#marker) is a Leaflet function that is used to create a new marker for each brewery we are looping through. It's placed on the map based on the brewery's latitude and longitude information.

####6. Add GeoJSON data
* The second dataset we will be working is a list of counties in Iowa, which is available in GeoJSON format [here](http://catalog.opendata.city/dataset/iowa-counties-polygon/resource/52b6d8b4-b203-4ab3-94db-e5e93c335a14). I've downloaded this already and included it within the data directory.

* NOTE: The counties also have population data in them, which we use later.

* Like with our breweries, we need to make the GeoJSON object a variable so it can be easiliy called within script.js:
	```javascript
	var iowa_counties = 
	```

* Adding our counties to the map only takes one line of code:
	```javascript
	L.geoJson(iowa_counties).addTo(map);
	```

* You'll what to place this ABOVE the for loop that places the marker on the map. The makes sure the counties appear under the markers.

* Refresh your map and you'll see the counties now on the map.

####7. Styling the counties
* The counties kind of look ugly right now. We can fix that by extending the geojson object we added:

	```javascript
	function setStyle(feature) {
		return {
			opacity: 1,
			weight: 2,
			color: "#FFF",
			fillColor: "#005824",
			fillOpacity: 0.8
		}
	}
	
	L.geoJson(iowa_counties, {
		style: setStyle
	}).addTo(map);
	```

* Every time a county is looped through, the [Leaflet GeJSON function](http://leafletjs.com/reference.html#geojson) calls the [style method](http://leafletjs.com/reference.html#geojson-style), which, in turn, calls the setSyle function. The function then returns styles for the particular county. Right now, we are returning the same fillColor for each county, so all the counties will be colored the same.

* For more information on the different styling options available for GeoJSON layers, visit [this page](http://mourner.github.io/Leaflet/reference.html#path-options).

####7. Color counties based on population data
* Our map is cool and all but the counties don't tell us much. Wouldn't it be neat if we could shade the counties based on how many people lived within them? Fortunately we can do that relatively easily in Leaflet.

* The final piece of data we will be working with is population data from the [U.S. Census](http://www.census.gov/). We will create a basic [choropleth map](http://leafletjs.com/examples/choropleth.html) where the counties will be shaded based on their population. The more people, the darker the county.

* I've already downloaded the data from the [Census Reporter site](http://censusreporter.org/data/table/?table=B01003&geo_ids=04000US19,050|04000US19,050|04000US19&primary_geo_id=04000US19) and merged it into the county GeoJSON file that's on the map. I used [QGIS](http://www.qgis.org/en/site/) to do this. If you're not familiar with QGIS, I recommend checking it out. It's a like watered-down version of [ArcGIS](https://www.arcgis.com/features/). But unlike ArcGIS, it's free.

* Instead setting the same color for each county, we're going to grab the population for each county we're looping through and set the color based on its value:
	```javascript
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
	```

* Each county setStyle loops through is an object, with a couple of data points, including the shape of the county and the population (which I added with QGIS). We're after the county's population, and we can grab it by calling feature.properties.population.

* This value is sent to the setColor function, which sets the color of the county based on its value. The population is stored as a string in the object, so we need to convert it to an integer using the handy [parseInt function](http://www.w3schools.com/jsref/jsref_parseint.asp).

* The setColor function looks at the population and it assigns it a color. The higher the population, the darker the green. The colors were grabbed from [ColorBrewer](http://colorbrewer2.org/).


* #####Now refresh the map one more time. You have created a beautiful choropleth map with markers on top of it. Congrats!