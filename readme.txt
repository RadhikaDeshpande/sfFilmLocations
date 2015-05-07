Listing of film locations of movies shot in san francisco.

If you are thinking on how this can be implemented in very simple way. No worrying about full stack development nor on the back-end development.
Here is simple front end application which lets you have the glance of the locations of movies in san francisco.
This app makes extensive use of javascript and google apis for them. A bit of jQuery is used inorder to get a autocompletion search bar.
And few form elements in html.

DEVELOPMENT:

PHASE 1:
The data, movies and the location information are taken from SFDATA.
The information is extracted as JSON data and is stored as sfmovies.js file.
This file is tested for its accuracy in JSON data. 
Ex: If Strings contain another string, the conatined string's quotes is eliminated inorder to get a valid JSON data.
before validating: "golden gate bridge, "1st Street" 
after validating" "golden gate bridge, 1st Street"

PHASE 2:
A simple html named index.html is created with few basic stylings, few scripts source and also a form element which provides to search movie names.

PHASE 3:
This is the main javascript logic along with google maps api, which displays the markers for the locations of movies shot in sf.
A basic google map is set with center being san francisco(use lat and long of sf).
Looping on the JSON data is done inorder to obtain the locations of the movie.
This is a customized marker, adds to the san francisco only if the location is
strictly present inside san francisco. Mean while an interval is created for every marker on the google map in order to avoid limits of google maps api usage.
Find the lower and upper LatLong values for san francisco region. And check the Lat and Long generated for the location are within san francisco bounds. If yes, create a marker for that location on the map for the searched movie. This makes
sure that no other locations are ploted outside the san francisco though they share a common location name.
To make sure previous markers are not added along to the next search, I clear them before making the next search.
There you go. All set download the folder containing files and run it on local host. I have set up a simple server using node.js.










