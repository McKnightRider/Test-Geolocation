var myBtn = document.getElementById("myBtn");

// Generally don't want global variables, but cannot see obvious alternative with start locations
var lat1;
var lon1;
var lat2;
var lon2;

// The haversine formula is commonly used to calculate the great-circle distance between two points on a sphere
var R = 6371e3; // metres
var φ1; // lat 1 in radians
var φ2; // lat2 in radians
/*var Δφ; // lat2 - lat1 in radians, = (lat2-lat1).toRadians();
var Δλ; // lon2 - lon1 in radians, = (lon2-lon1).toRadians();

var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

var d = R * c;*/

var started = false;


/*function getLocation() {
    if (navigator.geolocation) {
        console.log("This browser supports geolocation.");
        navigator.geolocation.getCurrentPosition(function (pos) {
            //You have your locaton here
            lat1 = pos.coords.latitude;
            lon1 = pos.coords.longitude;
            console.log("Latitude: " + lat1 +
                "\nLongitude: " + lon1);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}*/

myBtn.addEventListener("click", function(){
    if (started === false) {
        document.getElementById("startLoc").innerHTML = "See console logs";
        //let array1 = [0, 0, 0, 0];
        //console.log("The initialised array is: " + array1);
        //console.log("Printing out the function directly gives: " + getLocationStart());
        let array1  = [0, 0, 0, 0];
        setTimeout(array1 = getLocationStart(), 3000);
        //console.log("The array returned from the getStartLocation function is: " + array1);
        /*getPosition()
          .then((position) => {
            console.log(position);
          })
          .catch((err) => {
            console.log(err.message);
          });*/
        //const array2 = getPosition();
        /*console.log("The array returned from the getPosition function is: " + array2);
        setTimeout(3000);
        lat1 = setTimeout(array1[0], 3000);
        φ1 = array1[1];
        lon1 = array1[2];
        started = array1[3];*/
        //setTimeout(console.log("lat1, φ1, lon1, started are " + lat1 + ", " + φ1 + ", " + lon1 + ", " + started), 5000);
        
        // Trying async and await
        /*const pos = async navigator.geolocation.getCurrentPosition(resolve, reject);
        console.log("pos is: " + pos);*/
        //inout().catch(e => console.log(e)); // User denied geolocation prompt. code = 1
        console.log(inout());
        let position = inout();
        //console.log(position.coords.latitude);
        //console.log(inout().coords.latitude);
        console.log(typeof(inout()));
        console.log(Object.getOwnPropertyNames(inout()));
    } else {
        lat2, φ2, lon2, started, d = getLocationFinish(lat1, φ1, lon1);
        document.getElementById("dist").innerHTML = d + " metres";
    }
});

/*function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
            if (started === false) {
                lat1 = pos.coords.latitude;
                lon1 = pos.coords.longitude;
                console.log("The starting position is:\nLatitude: " + lat1 + "\nLongitude: " + lon1);
                started = true;
            } else {
                lat2 = pos.coords.latitude;
                lon2 = pos.coords.longitude;
                console.log("The finishing position is:\nLatitude: " + lat2 + "\nLongitude: " + lon2);
                
                // The haversine formula is commonly used to calculate the great-circle distance between two points on a sphere
                var R = 6371e3; // metres
                var φ1 = lat1.toRadians();
                var φ2 = lat2.toRadians();
                var Δφ = (lat2-lat1).toRadians();
                var Δλ = (lon2-lon1).toRadians();

                var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                        Math.cos(φ1) * Math.cos(φ2) *
                        Math.sin(Δλ/2) * Math.sin(Δλ/2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

                var d = R * c;

                started = false;
                console.log("The distance from the starting position is {} metres.".format(d));
                document.getElementById("dist").innerHTML = d + " metres";
            }
        })
    }
}*/

function toRadians(num) {
    return num * Math.PI/180;
}

function getLocationStart() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            lat1 = pos.coords.latitude;
            φ1 = toRadians(lat1);
            lon1 = pos.coords.longitude;
            //console.log("The starting position is:\nLatitude: " + lat1 + "\nLongitude: " + lon1);
            //console.log("φ1 is " + φ1);
            started = true;
            document.getElementById("myBtn").innerHTML = "Stop";
            // Javascript does not support tuples, so return as an array
            const arr1 = [lat1, φ1, lon1, started];
            //console.log(arr1);
            return arr1;
        })
    } else {
        console.log("navigator.geolocation did not work, check that you have internet access.");
    }
}

const getPosition = function() {
    return new Promise(function() {
        navigator.geoLocation.getCurrentPosition();
    })
};

// Following code from website showing how to use geolocation in a promise
/*var getPosition = function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

getPosition()
  .then((position) => {
    console.log(position);
  })
  .catch((err) => {
    console.error(err.message);
  });*/

function getLocationFinish(lat1, φ1, lon1) {
    if (navigator.geolocation) {
        console.log("The starting position was " + lat1 + " latitude and " + lon1 + " longitude.");
        navigator.geolocation.getCurrentPosition(function(pos) {
            lat2 = pos.coords.latitude;
            φ2 = toRadians(lat2);
            lon2 = pos.coords.longitude;
            console.log("The finishing position is:\nLatitude: " + lat2 + "\nLongitude: " + lon2);
            console.log("φ2 is " + φ2);
            started = false;
            document.getElementById("myBtn").innerHTML = "Start";
            console.log("lat2 is " + lat2);
            console.log("lon2 is " + lon2);
            console.log("lat2 in radians is " + toRadians(lat2));
        })
    
    // Now doing the haversine formula calculations
    var x = lat2 - lat1;
    console.log("lat2 - lat1 is " + x);
    var Δφ = toRadians(lat2-lat1);
    var Δλ = toRadians(lon2-lon1);

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;

    console.log("Δφ is " + Δφ);
    console.log("Δλ is " + Δλ);
    console.log("a is " + a);
    console.log("c is " + c);
    console.log("d is " + d);

    console.log("The distance from the start is " + d + " metres.");
    return (lat2, φ2, lon2, started, d);
    }
}

// Another promise for geolocation found online
/*getCurrentPosition: function () {
    if (navigator.geolocation) {
      return new Promise(
        (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
      )
    } else {
      return new Promise(
        resolve => resolve({})
      )
    }
  }
getCurrentPosition()
  .then(
    position => console.log(positon);
    if (position.coords) {
      position => console.log(positon);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  ).catch(
    // error => console.log(error);
    // Or
    error => {
      var msg = null;
      switch(error.code) {
        case error.PERMISSION_DENIED:
            msg = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            msg = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            msg = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            msg = "An unknown error occurred.";
            break;
      }
      alert(msg);
    }
  )*/

// Now this from StackOverflow
// This seems to be the best option as it turns getCurrentPosition into a promise
// I cannot see what is returned though or how to get separate latitude/longitude out of it
function getCurrentLoc(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, ({code, message}) =>
      reject(Object.assign(new Error(message), {name: "PositionError", code})),
      options);
    });
  //console.log("Latitude: " + position.coords.latitude);
};
async function inout() {
  try {
    console.log(await this.getCurrentLoc({
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }));
    //console.log("Latitude: " + position.coords.latitude);
  } catch (e) {
    if (e.name == 'PositionError') {
      console.log(e.message + ". code = " + e.code);
    }
  }
}
//inout().catch(e => console.log(e)); // User denied geolocation prompt. code = 1

// Codecademy format for async, await functions:
/*const generateJson = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if(response.ok){
      const jsonResponse = await response.json();
      renderResponse(jsonResponse);
      changeButton();
    }
  } catch(error) {
    console.log(error);
  }
};*/

const getCurLoc = async () => {
  try {
    const response = await navigator.geolocation.getCurrentPosition(position);
    if (position) {
      console.log("All seems ok!");
      return position; 
    }
  } catch (error) {
      console.log(error);
  }
}

//Get current position does not return a promise, so I cannot use await directly on it
//Set up as a promise first, which is what one of the earlier examples does