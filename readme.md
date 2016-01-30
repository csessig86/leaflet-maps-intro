Tabletop to mobile site
===========
* [Live demo](http://csessig86.github.io/event-template/)

* Uses [Tabletop.js](http://builtbybalance.com/Tabletop/) and a Google Spreadsheet to feed data to a mobile site, which is templated with [Handlebars.js](http://handlebarsjs.com/). The Google Spreadsheet basically works as a CMS to power the site.

* Besides Tabletop.js, the template utilizes the [Bootstrap](http://twitter.github.io/bootstrap/) framework, [Leaflet](http://leafletjs.com/) for the "map" template and [jQueryMobile](http://api.jquerymobile.com/) for the "schedule" template and [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/) and Leaflet's [Awesome Markers plugin](https://github.com/lvoogdt/Leaflet.awesome-markers) for the icons.

* The original idea behind the app was to power websites that serve as a guide for weekend festivals. Therefore, the initial template has a page with an article introducing the festival, a page for a schedule of events, a page with a map of festival stages and a page with more information on the festival. The app can be tweaked, however, to find your needs.

Setting up Tabletop
===========
* Follow the [Tabletop.js instructions](http://builtbybalance.com/Tabletop/#tabletop-instructions) for setting up the spreadsheet and publishing it.

* The spreadsheet used in the example is found [here](https://docs.google.com/spreadsheet/ccc?key=0As3JvOeYDO50dE94QzNTUGJTcS1xQlJEYXZ3VHZXY0E).

* Open up the js/loadpageinfo.js file and add your spreadsheet ID as a value to the spreadsheetKey key in the initializeTabletopObject. This is on line 37 of the file.
	initializeTabletopObject('0As3JvOeYDO50dE94QzNTUGJTcS1xQlJEYXZ3VHZXY0E');

* Also make sure you change the "title" attribute in the "context" variable in the js/loadpage.info.js file. It's at the very top of the page.


Setting up the Google Doc
===========
* The first page of worksheet of you spreadsheet will be titled 'core'. This is where you lay out what pages you want in your app. Sectionname is the name you want to appear in the nav box at the bottom of the page. Sectionicon is the name of the [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/) icon you want to display in the nav box.

* Note: You can have as many or as few pages in the app as you want.

* Currently we have three template types, which each have their own column in the 'core' worksheet: [Article](http://csessig86.github.io/event-template/#Article), [Schedule](http://csessig86.github.io/event-template/#Schedule) and [map](http://csessig86.github.io/event-template/#Map). Put the value "TRUE" in one of those three columns to determine how your page will be templated.

* Each value under 'sectionname' must have its own worksheet in the Google spreadsheet. This is where you add the content for each page.


Templates
===========
* Article templates have the following columns for each section on the page: 'header', 'subhead', 'image', 'image-placement-right' (either "TRUE" OR "FALSE"), 'more' and 'caption'. You can leave columns blank that you don't want to use. You can also add as many rows as you want, depending on how many sections on the page you have. Check out the [info page](http://csessig86.github.io/event-template/#Info) and our 'info' worksheet on the [Google spreadsheet](https://docs.google.com/spreadsheet/ccc?key=0As3JvOeYDO50dE94QzNTUGJTcS1xQlJEYXZ3VHZXY0E) for a good example of this in practice.

* Schedule templates have two columns: 'box-number' and 'date'. Each row in the column 'box-number' should have it's own worksheet as well. So the you'll notice in the [Google spreadsheet](https://docs.google.com/spreadsheet/ccc?key=0As3JvOeYDO50dE94QzNTUGJTcS1xQlJEYXZ3VHZXY0E) that we have a worksheet called 'Schedule' that has rows 'first-schedule,' 'second-schedule,' etc. We also have worksheets called 'first-schedule,' 'second-schedule,' etc. The schedule worksheets have the following columns: 'time', 'event', 'location', 'category' and 'info'. Each row is equal to an event.

* Map templates have the following options: 'icon', 'iconcolor', 'lat', 'long', 'popup' and 'searchschedule' (either "TRUE" or "FALSE"). Each row is related to a marker on the map. The 'icon' column is the name of [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/) icon you want to show up as the marker. The 'iconcolor; column is one of the colors made available with Leaflet's [Awesome Markers plugin](https://github.com/lvoogdt/Leaflet.awesome-markers). The 'lat' and 'long' columns are related to the latitude and longitude coordinates of the markers. The 'popup' column is the text that will show when a user clicks a marker.

* The 'searchschedule' column can be useful if you are using the app as a guide to a festival and the map has stages on it with different events going on throughout the day. If those events are on the page with the schedule on it and the stage name is noted in the 'location' column, you can set the 'searchschedule' column to "TRUE". When this is done, a link will appear in the popup box that says 'Search through events at this location'. When a reader clicks this link, they will be taken to the page with the schedule and all the events that are going on that stage.

* For instance, in our [demo](http://csessig86.github.io/event-template/#Map) we have a stage called Park Avenue Stage with events going on throughout the day and a marker on the map for that stage (it's orange). Click the marker and then click the link in the popup to search the 'searchschedule' option in action.

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

* If you want to change the header colors, check out lines 20 through 38 in the css/styles.css. They are all labeled.

* Similarly, all the styles for the schedule page start on line 187 in css/styles.css file.

* Want to make your own templates? First, familiarize yourself with [Handlebars.js](http://handlebarsjs.com/) if you aren't already. Then create a template name and add it as a column in the 'core' worksheet after 'map.' Then create a new row, create a 'sectionname' and set the value of "TRUE" to the new template name. Now create a worksheet with the same name as the 'sectionname' and add columns for the new template that you want to show up on your page.

- Then open up the index.html and go to line 150, which is after the '{{#if map}}...{{/if}}' statement but before the final '</div>'. This is where you will add a new if statement for your template name. For instance, if your new template is called 'list', then you would add a '{{#if list}}...{{/if}' statement here. Now you can create a Handlebars.js template.

- To give you an idea of what it should look like, here's my 'article' template. Notice how the 'header,' 'subhead,' 'image,' etc. attributes from my spreadsheet are used in the template.
	```javascript
	{{#if article}}
		{{#each article}}
			{{#if header}}
				<h3 class="boxes-sections-headers">{{{ header }}}</h3>
            {{/if}}

            {{#if subhead}}
            	<h5>{{{ subhead }}}</h5>
            {{/if}}

            {{#if image}}
            	{{#if image-placement-right}}
            	<div class='Info-box-image-box Info-box-image-box-right'>
              {{else}}
                <div class='Info-box-image-box Info-box-image-box-left'>
              {{/if}}

                  <img src='{{{ image }}}' />
                  {{#if image-caption}}
                    <div class='caption'>{{{ image-caption }}}</div>
                  {{/if}}
                </div>
            {{/if}}

            {{#if more}}
                <p>{{{ more }}}</p>
            {{/if}}


            {{#if caption}}
              <h6>{{{ caption }}}</h6>
            {{/if}}

        {{/each}}
   	{{/if}}
   	```

Few other things
===========
* A few other things you'll want to change: Add the right metadata attributes at the top of our index.html page. Also, you can

* Then change the 'data-href' attribute for the [Facebook button](https://developers.facebook.com/docs/reference/plugins/like/) to the URL of the page. This is on line 202 in the index.html file. And change the 'data-via' attribute for the [Twitter button](https://twitter.com/about/resources/buttons) to reflect your organization. This is on line 204 in the index.html file.

* Get rid of our Courier logo or add your own. That's located on line 191 in index.html.

* Finally, add your own iOS icon if you want. The one for this app is located is images/ios-icon.png