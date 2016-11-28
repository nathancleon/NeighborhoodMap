(function () {
  'use strict';

  var Location,
      ViewModel,
      locations,
      map,
      marker;

  // FourSquare api parameters
  var fourSquareClientID = 'AOHIZ43YMWLADVIAPU0NOAGSL22GE5S5X0STVKDOJE1L234Y';
  var fourSquareClientSecret = 'WR2Z1GBIO4RY0VS3CW1K2ACCW2N0FQPIUSIDSRLI4RECWDFX';

  // location data listing coffee shops
  locations = [
    {
      name: 'Epoch Coffee',
      latlng: {
        lat: 30.3185636,
        lng: -97.7267032
      },
      address: '221 W N Loop Blvd, Austin, TX 78751',
      id: '45543fccf964a520ff3c1fe3'
    },
    {
      name: 'Mozarts Coffee Roasters',
      latlng: {
        lat: 30.2952429,
        lng: -97.7843707
      },
      address: '3825 Lake Austin Blvd, Austin, TX 78703',
      id: '43936bd5f964a520752b1fe3'
    },
    {
      name: 'Jo\'s Coffee',
      latlng: {
        lat: 30.2513583,
        lng: -97.7562771
      },
      address: '1300 S Congress Ave, Austin, TX 78704',
      id: '40b68100f964a52078001fe3'
    },
    {
      name: 'Thunderbird Coffee',
      latlng: {
        lat: 30.3307876,
        lng: -97.7340764
      },
      address: '1401 W Koenig Ln, Austin, TX 78756',
      id: '49f725ebf964a5206a6c1fe3'
    },
    {
      name: 'The Coffee Bean & Tea Leaf',
      latlng: {
        lat: 30.2998368,
        lng: -97.7240902
      },
      address: 'Hancock Center, 1000 E 41st St #100, Austin, TX 78751',
      id: '4b22a1c0f964a5209f4a24e3'
    },
    {
      name: 'Bennu Coffee',
      latlng: {
        lat: 30.2797982,
        lng: -97.7217717
      },
      address: '2001 E Martin Luther King Jr Blvd, Austin, TX 78702',
      id: '49efff98f964a52021691fe3'
    },
    {
      name: 'Genuine Joe\'s Coffeehouse',
      latlng: {
        lat: 30.3540797,
        lng: -97.7294721
      },
      address: '2001 W Anderson Ln, Austin, TX 78757',
      id: '4434fed2f964a52005321fe3'
    },
    {
      name: 'Quack\'s 43rd St Bakery',
      latlng: {
        lat: 30.304645,
        lng: -97.7287721
      },
      address: '411 E 43rd St, Austin, TX 78751',
      id: '41293380f964a520640c1fe3'
    },
    {
      name: 'Blue Cat Cafe',
      latlng: {
        lat: 30.258808,
        lng: -97.7327257
      },
      address: '95 Navasota St, Austin, TX 78702',
      id: '5608592b498e400640c0adb9'
    },
    {
      name: 'Dominican Joe Coffee Shop',
      latlng: {
        lat: 30.256043,
        lng: -97.7484887
      },
      address: '515 S Congress Ave, Austin, TX 78704',
      id: '49bd5de5f964a52073541fe3'
    },
  ];

  // functional inheritance alternative approach.
  // please ignore.
  /*
  var location = function (data) {
    var that = {};

    that.name = data.name;
    that.latlng = data.latlng;
    that.distance = ko.observable(data.distance);

    return that;
  };
  */

  /**
   *  Stores locational data. Used for converting
   *  location data to google maps consumable data.
   *
   *  @param data [OBJECT] [REQUIRED]
   */
  Location = function (data) {

    this.name = data.name;
    this.latlng = data.latlng;
    this.id = data.id;
  };

  /**
   *  Main entry point for Knockout app.
   */
  ViewModel = function () {
    var self = this;

    // data binding
    self.names = ko.observableArray([]);
    self.markers = ko.observableArray([]);
    self.locationList = ko.observableArray([]);
    // data bind the search filter
    self.query = ko.observable('');

    self.populateMap = function () {
      var i,
          largeInfoWindow;

      // convert location data to be consumable by the google maps api.
      // used for the map markers.
      locations.forEach(function (location) {
        self.locationList.push(new Location(location));
      });

      // setup map marker tooltip/info window
      largeInfoWindow = new google.maps.InfoWindow();

      google.maps.event.addListener(map, 'click', function () {
        largeInfoWindow.close();
      });

      // make map markers
      for (i = 0; i < self.locationList().length; i++) {
        // @TODO: Link to documentation for Marker
        marker = new google.maps.Marker({
          map: map,
          position: self.locationList()[i].latlng,
          animation: google.maps.Animation.DROP,
          title: locations[i].name,
          content: '',
          draggable: false,
          visible: true,
          id: i
        });

        self.markers().push(marker);
        // add listeners the google way
        marker.addListener('click', function() {
          // triggers bounce animation
          self.toggleBounce(this);
          // center the map on the marker's location
          map.setCenter(this.position);
          // set the content for the info window and open it
          self.populateInfoWindow(this, largeInfoWindow);
        });

        // associate marker with location
        self.locationList()[i].marker = marker;
      };
    };

    self.addFoursquareInfoToMap = function () {
      self.locationList().forEach(function (location) {
        $.ajax({
          type: 'GET',
          dataType: 'jsonp',
          cache: false,
          url: 'https://api.foursquare.com/v2/venues/' + location.id + '/photos',
          data: 'client_id=' + fourSquareClientID + '&client_secret=' + fourSquareClientSecret + '&v=20161025&ll=' + location.latlng.lat + ',' + location.latlng.lng + '&query=' + location.name,
          success: function(data) {
            console.log(data);

            location.marker.content = '<img src=' + data.response.photos.items[0].prefix + '300x300' + data.response.photos.items[0].suffix + '>';
          }
        });
      });
    };

    /**
     *  Populates the content for the info window.
     *
     *  @param marker      [OBJECT] [REQUIRED]
     *  @param infoWindow  [OBJECT] [REQUIRED]
     */
    self.populateInfoWindow = function (marker, infoWindow) {
      if (infoWindow.marker !== marker) {
        infoWindow.marker = marker;
        infoWindow.setContent('<div class="iw-container"><div class="iw-content"><h4 class="iw-title">' + marker.title + '</h4>' + marker.content + '</div></div>');
        infoWindow.open(map, marker);
      }
    };

    self.filterPlaces = function () {
      /**
       *  Take the total list of locations and filter it down according to the search query.
       *
       *  @param location [OBJECT] [REQUIRED]
       *
       *  @returns A filtered array of the list of locations.
       */
      return ko.utils.arrayFilter(self.locationList(), function (location) {
        var query = self.query();

        if (query.length === 0 || location.name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
          location.marker.setVisible(true);
          // query matches, include in the final array
          return true;
        } else {
          location.marker.setVisible(false);
          // query does not match, ignore
          return false;
        }
      });
    };

    /**
     *  Focuses the map on the given marker.
     *
     *  @param location [OBJECT] [REQUIRED]
     */
    self.setMarker = function (location) {
      google.maps.event.trigger(location.marker, 'click');
    };

    /**
     *  Turns the bounce animation for a marker on or off.
     *
     *  @param marker [OBJECT] [REQUIRED] Google maps api map marker.
     */
    self.toggleBounce = function (marker)  {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
          // animate the bounce for one second, then stop
          // @TODO: Investigate possibility of ending animation
          // based on animation events, rather than time.
          marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout (function () {
            marker.setAnimation(null);
          }, 1000);
        }
    };

    self.populateMap();
    self.addFoursquareInfoToMap();
    self.filteredPlaces = ko.computed(self.filterPlaces);
};

/**
 *  Kick off function for getting the app started.
 *  It's a callback function for after the google maps api
 *  is loaded.
 */
window.initMap = function () {
  // init the map
  map = new google.maps.Map(
    document.querySelector('.js-map'), {
    zoom: 13,
    center: { lat: 30.308869 , lng: -97.756446 }
  });

  ko.applyBindings(new ViewModel());
};

// google maps provided function for loading their script
function loadScript (src, callback) {
  var script = document.createElement("script");

  script.type = "text/javascript";

  if (callback) {
    script.onload = callback;
  }

  document.getElementsByTagName('head')[0].appendChild(script);
  script.src = src;
}

/**
 *  Activates the side nav when button is clicked
 *
 *  @TODO close side navigation when clicking outside of the element
 */
$(".toggle-btn").click(function() {
  $(".nav").toggle();
});

// load the google maps api, then initialize the app by calling initMap
loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBiYI5uANWSAg6Uzfv1BZuZCcGiSGMh-7Q&callback=initMap',
            function(){console.log('google-loader has been loaded, but not the maps-API ');});
})();
