var coffeeData = [
  { title: 'Summer Moon Coffee',
    lat: '30.3886432',
    lng: '-97.8392678',
    address: '3115 S 1st St #1B, Austin, TX 78704'
  },
  { title: 'Epoch Coffee',
    lat: '30.3185636',
    lng: '-97.7267032',
    address: '221 W N Loop Blvd, Austin, TX 78751'
  },
  { title: 'Epoch Coffee at Anderson Lane',
    lat: '30.359334',
    lng: '-97.7367637',
    address: '2700 W Anderson Ln #409, Austin, TX 78757'
  },
  { title: 'Mozarts Coffee Roasters',
    lat: '30.2954206',
    lng: '-97.7864584',
    address: '3825 Lake Austin Blvd, Austin, TX 78703'
  },
  { title: 'Jo\'s Coffee',
    lat: '30.2512945',
    lng: '-97.7966038',
    address: '1300 S Congress Ave, Austin, TX 78704',
  },
  { title: 'Thunderbird Coffee',
    lat: '30.3307876',
    lng: '-97.7340764',
    address: '1401 W Koenig Ln, Austin, TX 78756'
  },
  { title: 'Coffee Bean & Tea Leaf',
    lat: '30.3307689',
    lng: '-97.8019279',
    address: 'Hancock Center, 1000 E 41st St #100, Austin, TX 78751'
  },
  { title: 'Bennu Coffee',
    lat: '30.2797982',
    lng: '-97.7217717',
    address: '2001 E Martin Luther King Jr Blvd, Austin, TX 78702'
  },
  { title: 'Genuine Joe\'s Coffeehouse',
    lat: '30.3540797',
    lng: '-97.7294721',
    address: '2001 W Anderson Ln, Austin, TX 78757'
  },
  { title: 'Quack\'s 43rd St Bakery',
    lat: '30.304645',
    lng: '-97.7287721',
    address: '411 E 43rd St, Austin, TX 78751'
  },
  { title: 'Blue Cat Cafe',
    lat: '30.258808',
    lng: '-97.7327257',
    address: '95 Navasota St, Austin, TX 78702'
  },
  { title: 'Dominican Joe Coffee Shop',
    lat: '30.256043',
    lng: '-97.7484887',
    address: '515 S Congress Ave, Austin, TX 78704'
  },
];

function initMap() {

  //sets the full page map to Austin
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
     zoom: 12,
     center: new google.maps.LatLng(30.2672,-97.7431),
     mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infowindow = new google.maps.InfoWindow({});

  var marker, i;

  var CoffeeShops = function(data){
    var self = this;

    self.marker = new google.maps.marker({
      title: data.title,
      map: map,
      position: {
        lat: (data.lat),
        lng: (data.lng)
      }
    });
  }
}
