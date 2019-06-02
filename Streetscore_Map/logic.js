
// Create a map object
var myMap = L.map("map", {
  center: [42.3601, -71.0589],
  zoom: 13
});

streetscore_promise = d3.csv("streetscore_boston.csv");

streetscore_promise.then(function(streetViewData, err) {
  if (err) throw err;

  // parse data
  streetViewData.forEach(function(d) {
    d.latitude = +d.latitude;
    d.longitude = +d.longitude;
    d.q_score = +d.q_score;
  });
  data = streetViewData;

  for (var i = 0; i < data.length; i++) {
    L.circle([data[i].latitude, data[i].longitude], {
      fillOpacity: 0.75,
      color: "white",
      fillColor: "purple",
      radius: .05
    }).addTo(myMap)
    // .bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);
  }

});

function getColor(d) { return d >= 40 ? 'dark green' : 
d >= 35  ? 'light green' :
d >= 25 ? 'yellow' : 
d > 15  ? 'orange' :
d >  5  ? 'pink' :
d > -5  ? 'red' :
'black'; } 

// Next we define a styling function for our GeoJSON layer so that its fillColor depends on feature.properties.density property, also adjusting the appearance a bit and adding a nice touch with dashed stroke. function style(feature) {     return {         fillColor: getColor(feature.properties.density),         weight: 2,         opacity: 1,         color: 'white',         dashArray: '3',         fillOpacity: 0.7     }; }
// Promise.all([streetscore_promise]).then(function(){
function style(feature) { 
   return {         
    fillColor: getColor(feature.properties.density),        
    weight: 2,         
    opacity: 1,         
    color: 'white',         
    dashArray: '3',         
    fillOpacity: 0.7     }; }



// console.log(data)
  // Add Render Logic Here
// });

// var location= data.latitude + data.longitude


// Add a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 25,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);







// // Store our API endpoint inside queryUrl
// var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
//   "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// // Perform a GET request to the query URL
// d3.json(queryUrl, function(data) {
//   // Once we get a response, send the data.features object to the createFeatures function
//   createFeatures(data.features);
// });








// function createFeatures(streetData) {

//   // Define a function we want to run once for each feature in the features array
//   // Give each feature a popup describing the place and time of the perceptions
//   function onEachFeature(feature, layer) {
//     layer.bindPopup("<h3>" + feature.properties.place +
//       "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
//   }

//   // Create a GeoJSON layer containing the features array on the street view data object
//   // Run the onEachFeature function once for each piece of data in the array
//   var perceptions = L.geoJSON(streetData, {
//     onEachFeature: onEachFeature
//   });

//   // Sending our perceptions layer to the createMap function
//   createMap(perceptions);
// }

// function createMap(perceptions) {

//   // Define streetmap and darkmap layers
//   var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.streets",
//     accessToken: API_KEY
//   });

//   var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.dark",
//     accessToken: API_KEY
//   });

//   // Define a baseMaps object to hold our base layers
//   var baseMaps = {
//     "Street Map": streetmap,
//     "Dark Map": darkmap
//   };

//   // Create overlay object to hold our overlay layer
//   var overlayMaps = {
//     Perceptioons: perceptions
//   };

//   // Create our map, giving it the streetmap and perceptions layers to display on load
//   var myMap = L.map("map", {
//     center: [
//       37.09, -95.71
//     ],
//     zoom: 5,
//     layers: [streetmap, perceptions]
//   });

//   // Create a layer control
//   // Pass in our baseMaps and overlayMaps
//   // Add the layer control to the map
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);
// }
;
