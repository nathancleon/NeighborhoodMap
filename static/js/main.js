var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: { lat: 30.2672, lng: -97.7431 },
    zoom: 12
  });
}