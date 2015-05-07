Listing of film locations of movies shot in San Francisco.

If you are thinking on how this can be implemented in a very simple way, 
without worrying about any frameworks, full stack development nor on the back-end development.
Here is a simple front end application which lets you have the glance of all the locations of movies in San Francisco.
This app makes extensive use of javascript and google apis. A bit of jQuery knowledge is needed in order to get an
auto completion search bar. 

DEVELOPMENT:

PHASE 1:

The movies and the location information are taken from SFDATA.
The information is extracted as JSON data and is stored in sfmovies.js file.
The JSON format for the stored data is validated and corrected. 
Ex: If a string contains another string, the contained string's quotes are eliminated in order to get a valid JSON 
    format.
    before validating: "golden gate bridge, "1st Street" "
    after validating" :"golden gate bridge, 1st Street"

PHASE 2:

A simple html named index.html is created using few basic stylings, scripts sources (like google map api, jquery)
and also a form element which provides the functionality of searching movie names.

PHASE 3:

This is a main phase which invloves javascript logic which is part of main.js. 
In this phase displaying of the markers for the locations of movies shot in sf is achieved. 
1. A basic google map is set with center being San Francisco(use lat and long of SF).
2. Looping on the JSON data is done inorder to obtain the locations of the movies shot in SF.
3. A customized marker is created which adds itself to the San Francisco map only if the location is
   strictly present inside San Francisco.
4. Every marker is created and plotted after an interval of 2500ms on the google map in order to avoid the limits on google maps 
   api usage.
5. Lower and Upper LatLong values for San francisco region are found.
6. Movie location's lat long values are generated and compared with San Fransico region's LatLong bounds. 
7. If yes, create a marker for that location on the map for the searched movie. This also ensures that no other 
   locations are ploted outside the San Francisco though they share a common location name.
8. Current markers are cleared upon next search to ensure they do not add along on the map. 
9. If the geo code API cannot find the address or if the location of the movie is out of SF region bounds no markers 
   are displayed on the map.  A console message is logged. 
10. A screen shot of a working case is added to the root folder of the project. 

Code Structure:
1. index.html, main.js and any library dependencies can be found inside the public folder.
2. server.js is visible in the root folder.


There you go. All set download the folder containing files and run it on local host. 
I have set up a simple server using node.js.









