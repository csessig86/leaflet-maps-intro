#Building maps with Leaflet.js
This is the code behind my NICAR 2016 session on making maps with [Leaflet.js](https://github.com/Leaflet/Leaflet). This session is best for people with a beginner's understanding of Javascript.

####1. Why Leaflet.js?
- Free, open source and actively maintained
- Well documented with great examples
- Has a huge community behind it
- Used by a lot of people
- Minimal amount of code
- Mobile friendly
- Can handle thousands of data points without loading too slowly
- [Plugins](http://leafletjs.com/plugins.html)! Example of the [markercluster plugin](http://csessig86.github.io/tabletop_to_leaflet/#cluster)

####2. The set up
This repo has two directories:

- 01-base contains the base files you will need to get started. None of the mapping code has been written in this directory.
- 02-map is the final project we are going to build.

####2. Getting started
Download this repo onto your computer and rename it if you want. Then open up the 01-base directory you created in a text editor. We'll be adding our mapping code to the files in this directory.

Customize
===========
* You can customize the app as you see fit. Here's a few options you may want to change.

* To change the color of the header and footer of the app (which is currently set to green), go to line 61 in the css/styles.css file and change the background color to something other than '#1A9850'. You can also set the color of the text with the 'color' attribute. Then open up the js/script.js file and go to lines 60 and 65. It should look like so:
	```javascript
	// Change background color of selected section in nav bar
	// Change the other DIVs in the nav bar so they have the default background color
	if (hash !== '#' + scheduleName + '-map') {
		// This changes the color of the button that was clicked
		$(hash + '-nav-link').css('background-color', '#136c39');
		// This sets the other buttons to the default color
		$(hash + '-nav-link').parent().parent().siblings().children().children().css('background-color', '#1A9850');
	} else {
		// This changes the color of the button that was clicked
		$('#' + scheduleName + '-nav-link').css('background-color', '#136c39');
		// This sets the other buttons to the default color
		$('#' + scheduleName + '-nav-link').parent().parent().siblings().children().children().css('background-color', '#1A9850');
	}
	```
- This is the part of the script that changes the background color when a user clicks on one of the buttons. You can change it from it's current value of '#136c39'. Then go to lines 62 and 67. This sets the color back to its default. So whatever you set the color to in the css/styles.css file, set it here as well.

####4. CSS

####5. Add data

####6. Add GeoJSON data