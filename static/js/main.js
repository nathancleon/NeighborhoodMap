var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map-canvas"), {
    zoom: 12,
    center: new google.maps.LatLng(30.2672, -97.7431),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infoWindow = new google.maps.InfoWindow();

  var marker, i;

  for (i = 0; i < coffeeData.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(coffeeData[i][1], coffeeData[i][2]),
      map: map
    });

    google.maps.event.addListener(marker, "click", function (marker, i) {
      return function () {
        infoWindow.setContent(coffeeData[i][0]);
        infoWindow.open(map, marker);
      };
    }(marker, i));
  }
}