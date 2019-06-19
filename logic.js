// Creating map object
var map = L.map("map", {
  center: [41.40177, -99.6397],
  zoom: 4
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Load data from the geojson
d3.json(link, function(json) {
  //Add a layer
  geoLayer = L.geoJson(json, {
    //Set styles properties for markers according to magnitude value
    style: function fillColor(feature) {
      var mag = feature.properties.mag;
      if (mag >= 5.0) {
        return {
          fillColor: "#FF0000",
          color: "#FF0000",
          opacity: 1,
          fillOpacity: 1
        }; 
      }
      else if (mag >= 4.0) {
        return {
          fillColor: "#FF4D00",
          color: "#FF4D00",
          opacity: 1,
          fillOpacity: 1
        };
      } else if (mag >= 3.0) {
        return {
          fillColor: "#FF7700",
          color: "#FF7700",
          opacity: 1,
          fillOpacity: 1
        };
      } else if (mag >= 2.0) {
        return {
          fillColor: "#FFAA00",
          color: "#FFAA00",
          opacity: 1,
          fillOpacity: 1
        };
      } else if (mag >= 1.0) {
        return {
          fillColor: "#FFDC00",
          color: "#FFDC00",
          opacity: 1,
          fillOpacity: 1
        };
      } else {
        return {
          fillColor: "#B5FC00",
          color: "#B5FC00",
          opacity: 1,
          fillOpacity: 1
        }
      }
    },
    //Define popupText for each feature
    onEachFeature: function(feature, layer) {
      var popupText = "Magnitude: " + feature.properties.mag +
        "<br> Place: " + feature.properties.place;
      layer.bindPopup(popupText, {
        closeButton: true,
        offset: L.point(0, -20)
      });
      layer.on('click', function() {
        layer.openPopup();
      });
    },
    //Define markers
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, {
        radius: feature.properties.mag * 5,
      });
    },
  }).addTo(map);


// Add the legend 
var legend = L.control({ position: 'bottomright'});


legend.onAdd = function() {
  var div = L.DomUtil.create('div', 'info legend'),
      magnitude = [0,1,2,3,4,5],
      labels = [];

  for (var i = 0; i < magnitude.length; i++) {
      div.innerHTML +=
          '<i style="background:' + setColor(magnitude[i]) + '">'+"&nbsp&nbsp&nbsp&nbsp"+'</i> ' +
          magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
  }

  return div;
};

legend.addTo(map);

// Define colors for legend
function setColor(mag) {

  if (mag >= 5.0) {
    return "#FF0000"  
  }
  else if (mag >= 4.0) {
    return "#FF4D00"
  } 
  else if (mag >= 3.0) {
    return "#FF7700"
  } 
  else if (mag >= 2.0) {
    return "#FFAA00"
  } 
  else if (mag >= 1.0) {
   return  "#FFDC00"
  } 
  else {
   return "#B5FC00"
  }
};


});


