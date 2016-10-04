//todo:
//coffee-data.js doesn't work, figure out why.
//read KnockoutJS documentation
//find out what might need to be separated into VM
//start preparing html
//need the following:
//search bar
//re-center map icon
//sidebar with list of all locations
//figure out how list will be filtered in search
//start planning style of page
var coffeeData = [['<strong>Mozart\'s Coffee Roasters</strong>', 30.295420, -97.784269], ['<strong>Summer Moon Coffee</strong>', 30.2332635, -97.7670598], ['<strong>Coffee Bean & Tea Leaf</strong>', 30.2998368, -97.7240849], ['<strong>Epoch Coffee</strong>', 30.3185636, -97.7267032], ['<strong>Epoch Coffee at Anderson Lane</strong>', 30.359334, -97.7367637], ['<strong>Jo\'s Coffee</strong>', 30.2510427, -97.7668808], ['<strong>Thunderbird Coffee</strong>', 30.3307876, -97.7340764], ['<strong>Bennu Coffee</strong>', 30.2797982, -97.7217717], ['<strong>Genuine Joe\'s Coffeehouse</strong>', 30.3540797, -97.7294721], ['<strong>Quack\'s 43rd St Bakery</strong>', 30.304645, -97.7287721], ['<strong>Blue Cat Cafe</strong>', 30.258808, -97.7327257], ['<strong>Dominican Joe Coffee Shop</strong>', 30.256043, -97.7484887]];

//initializes map and contains map functions
function initMap() {

  //sets the full page map to Austin
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 12,
    center: new google.maps.LatLng(30.2672, -97.7431),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infowindow = new google.maps.InfoWindow({});

  var marker, i;

  //loops over coffeeData array of locations
  for (i = 0; i < coffeeData.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(coffeeData[i][1], coffeeData[i][2]),
      map: map
    });

    //sets up info windows for markers
    google.maps.event.addListener(marker, 'click', function (marker, i) {
      return function () {
        infowindow.setContent(coffeeData[i][0]);
        infowindow.open(map, marker);
      };
    }(marker, i));
  }
}