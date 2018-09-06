const myBtn = document.getElementById("myBtn");
const myTable = document.getElementById("myTable");
let array = []; // Adding three elements per point: latitude, longitude and distance
let points = 0;
let started = false;

// Generally don't want global variables, but cannot see obvious alternative with start locations
var lat1;
var lon1;
var lat2;
var lon2;

// The haversine formula is commonly used to calculate the great-circle distance between two points on a sphere
const R = 6371e3; // metres
const metresToYards = 1.09361;
var φ1; // lat 1 in radians
var φ2; // lat2 in radians
/*var Δφ; // lat2 - lat1 in radians, = (lat2-lat1).toRadians();
var Δλ; // lon2 - lon1 in radians, = (lon2-lon1).toRadians();

var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

var d = R * c;*/

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  let crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);

  
  //document.getElementById("startLoc").innerHTML = "Coords = " + array;
  /*console.log(`The array is ${array.length} elements long.`);
  for (let i = 0; i < array.length; i++) {
    //console.log(array[i]);
    
  }*/
  if (points === 0) {
    array.push(crd.latitude, crd.longitude, crd.accuracy, 0);
    document.getElementById("startLat").innerHTML = Math.round(crd.latitude * 10000) / 10000 + "\xB0";
    document.getElementById("startLon").innerHTML = Math.round(crd.longitude * 10000) / 10000 + "\xB0";
    document.getElementById("startAcc").innerHTML = Math.round(crd.accuracy * 10000) / 10000;
  } else {
    array.push(crd.latitude, crd.longitude, crd.accuracy);
    getDist(array);
  }
  points++;
  console.log("The current array is: " + array);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function getDist(array) {
  // Now doing the haversine formula calculations
  //console.log(`The array is ${array}.`)
  let lat_new = array[array.length - 3];
  console.log("lat_new is " + lat_new);
  let lat_old = array[array.length - 7];
  let lon_new = array[array.length - 2];
  let lon_old = array[array.length - 6];
  let x = lat_new - lat_old;
  console.log("lat2 - lat1 is " + x);
  let φ1 = toRadians(lat_old);
  let φ2 = toRadians(lat_new);
  let Δφ = toRadians(lat_new - lat_old);
  let Δλ = toRadians(lon_new - lon_old);

  let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  let d = R * c;

  console.log("Δφ is " + Δφ);
  console.log("Δλ is " + Δλ);
  console.log("a is " + a);
  console.log("c is " + c);
  console.log("d is " + d);

  console.log("The distance from the last point is " + d + " metres.");
  array.push(d);
  myTable.lastChild.innerHTML = `<td>Point ${points}</td>
                                  <td>${Math.round(array[array.length - 4] * 10000)/10000}\xB0</td>
                                  <td>${Math.round(array[array.length - 3] * 10000)/10000}\xB0</td>
                                  <td>${Math.round(array[array.length - 2] * 10000)/10000}</td>
                                  <td>${Math.round(array[array.length - 1]).toLocaleString()}</td>
                                  <td>${Math.round(array[array.length - 1] * metresToYards).toLocaleString()}</td>`;
  console.log(`The current array is ${array.length} long.`);
  //return (lat2, φ2, lon2, started, d);
}

function toRadians(num) {
  return num * Math.PI/180;
}

//putting success and error in below as functions without the trailing () makes them callbacks apparently
//navigator.geolocation.getCurrentPosition(success, error, options);
//array.push(success());

myBtn.addEventListener("click", function() {
  console.log(`You have now pressed the button ${points + 1} times.`)
  navigator.geolocation.getCurrentPosition(success, error, options);
  if (started === false) {
    started = true;
    myBtn.innerHTML = "Mark";
  } else {
    //started = false;
    //myBtn.innerHTML = "Start";
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    myTable.appendChild(tr);
    /*myTable.lastChild.appendChild(td);
    myTable.lastChild.appendChild(td);
    myTable.lastChild.appendChild(td);
    myTable.lastChild.appendChild(td);*/
  }
});