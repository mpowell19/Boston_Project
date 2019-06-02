var ctx = document.getElementById("myAreaChart");
// Creating map object
var map = L.map("map", {
  center: [42.3601, -71.0589],
  zoom: 11.15
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

var link = "https://opendata.arcgis.com/datasets/3525b0ee6e6b427f9aab5d0a1d0a1a28_0.geojson";


// Function that will determine the color of a neighborhood based on the borough it belongs to
function chooseColor(Name) {
  switch (Name) {
  case "Allston":
    return "yellow";
  case "Back Bay":
    return "red";
  case "Bay Village":
    return "orange";
  case "Beacon Hill":
    return "green";
  case "Brighton":
    return "purple";
  case "Charlestown":
    return "yellow";
  case "Chinatown":
    return "red";
  case "Dorchester":
    return "orange";
  case "Downtown":
    return "green";
  case "East Boston":
    return "purple";
  case "Fenway":
    return "yellow";
  case "Harbor Islands":
    return "red";
  case "Hyde Park":
    return "orange";
  case "Jamaica Plain":
    return "green";
  case "Leather District":
    return "purple";
  case "Longwood":
    return "yellow";
  case "Mattapan":
    return "red";
  case "Mission Hill":
    return "orange";
  case "North End":
    return "green";
  case "Roslindale":
    return "purple";
    case "Roxbury":
    return "green";
  case "South Boston":
    return "purple";
  case "South Boston Waterfront":
    return "yellow";
  case "South End":
    return "red";
  case "West End":
    return "orange";
  case "West Roxbury":
    return "yellow";  
  default:
    return "black";
  }
}


// Grabbing our GeoJSON data
d3.json(link, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data.features, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: chooseColor(feature.properties.Name),
        fillOpacity: 0.5,
        weight: 1.5
        
      };
    },
    
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          map.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.Name + "</h1> <hr> <h2>" + "Square Miles: " + feature.properties.SqMiles + "</h2>");

    }
  }).addTo(map);
});

