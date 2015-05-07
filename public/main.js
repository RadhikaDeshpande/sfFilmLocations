(function(){

  var map,
  drawingMarker = false;
  markers = [],
  movieObject = {},
  movieArray = [];

  //lower and upper LatLong bounds for san francisco
  latLowerLimit = 37.63983;
  latUpperLimit = 37.929824;
  longLowerLimit = -123.173825;
  longUpperLimit = -122.28178;

  google.maps.event.addDomListener(window, 'load', initialize);

  function initialize() {
    var mapCanvas = document.getElementById('map-canvas');

    //sets the google maps with san francisco being the centre of focus
    var mapOptions = {
      center: new google.maps.LatLng(37.7833, -122.431297),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP

    }
    map = new google.maps.Map(mapCanvas, mapOptions);
    var bounds = new google.maps.LatLngBounds();
  }


  for (var i = 0; i < sfMovies.data.length; i++) {

    //This loops through the json data and pushes the locations for a given movie.
    if (movieObject[sfMovies.data[i][8]] !== undefined) {
      movieObject[sfMovies.data[i][8]].push(sfMovies.data[i][10]);
    }

    //This loops through the json data and pushes the locations and the movie. 
    //If the movie is appearing for the first time.
    if (movieObject[sfMovies.data[i][8]] == undefined) {
      movieArray.push(sfMovies.data[i][8]);
      movieObject[sfMovies.data[i][8]] = [];
      movieObject[sfMovies.data[i][8]].push(sfMovies.data[i][10]);
    }
  }
      

//This is a customized marker, adds to the san francisco only if the location is
//strictly present inside san francisco.
  function addMarker(map, locations) {
    drawingMarker = true;
    var geocoder = new google.maps.Geocoder();
    var markerCount = 0;
    var address = locations[markerCount];

    //An interval is created for every marker on the google map 
    //in order to avoid limits of google maps api usage.
    var interval = setInterval(function() {
      drawMap();
    }, 2500);

    //drawMap generates the neccessary Lat and Long for the location passed
    //in order to mark them.
    var drawMap = function() {
      geocoder.geocode({
        "address": address
      }, 
      function(results, status) {
        
        if (status == google.maps.GeocoderStatus.OK) {

          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();
          var latLong = [];

         // Mainly checks the Lat and Long generated for the location are within 
         //san francisco bounds and creates a marker for the map.
          if ( latLowerLimit <= latitude && latitude <= latUpperLimit ) {
            if ( longLowerLimit < longitude && longitude < longUpperLimit ) {
              latLong = new google.maps.LatLng(latitude, longitude);
             
              for (var i = 0; i < latLong.length; i++) {
                bounds.extend(latLong);
                map.fitBounds(bounds);
              }

              var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location

              });
              markers.push(marker);
            }
          }
        }

        if (markerCount === locations.length - 1) {
          drawingMarker = false;
          if(markers.length == 0){
            console.log("The Geo code api couldn't find the address or the location is out ofs San Fran bounds");
          }
          clearInterval(interval);
        } else {
          markerCount += 1;
          address = locations[markerCount];
        }

      });
    };
  };

  //Auto completion for movie names
  $(function() {
    $("#movieName").autocomplete({
      source: movieArray
    });
  });

  $('form').on('submit', function(e) {
    e.preventDefault();
    var movieName = $('#movieName').val();
    reqKey = movieObject[movieName];
    
    if(!drawingMarker){
      if(markers.length > 0){
        deleteMarkers();
      }
      addMarker(map, reqKey);  
    }
  });

//Clears the old markers on the map for the next search of movies.
  function deleteMarkers() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  };

})();