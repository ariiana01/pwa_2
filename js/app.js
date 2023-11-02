
  const container = document.querySelector(".container");
const coffees = [
 
  container.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", showCoffees);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("./serviceWorker.js", { scope: "./" })
      .then((res) => console.log("Service worker registered"))
      .catch((err) => console.log("Service worker not registered", err));
  });
}

function getUserMedia(constraints) {
  if (navigator.mediaDevices) {
    return navigator.mediaDevices.getUserMedia(constraints);
  }

  var legacyApi =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

  if (legacyApi) {
    return new Promise(function (resolve, reject) {
      legacyApi.bind(navigator)(constraints, resolve, reject);
    });
  }
}

function getStream(type) {
  if (
    !navigator.mediaDevices &&
    !navigator.getUserMedia &&
    !navigator.webkitGetUserMedia &&
    !navigator.mozGetUserMedia &&
    !navigator.msGetUserMedia
  ) {
    alert("User Media API not supported.");
    return;
  }

  var constraints = {};
  constraints[type] = true;

  getUserMedia(constraints)
    .then(function (stream) {
      var mediaControl = document.querySelector(type);

      if ("srcObject" in mediaControl) {
        mediaControl.srcObject = stream;
      } else if (navigator.mozGetUserMedia) {
        mediaControl.mozSrcObject = stream;
      } else {
        mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
      }

      mediaControl.play();
    })
    .catch(function (err) {
      alert("Error: " + err);
    });
}

var theStream;

function getStream() {
  if (
    !navigator.getUserMedia &&
    !navigator.webkitGetUserMedia &&
    !navigator.mozGetUserMedia &&
    !navigator.msGetUserMedia
  ) {
    alert("User Media API not supported.");
    return;
  }

  var constraints = {
    video: true,
  };

  getUserMedia(constraints, function (stream) {
    var mediaControl = document.querySelector("video");
    if ("srcObject" in mediaControl) {
      mediaControl.srcObject = stream;
    } else if (navigator.mozGetUserMedia) {
      mediaControl.mozSrcObject = stream;
    } else {
      mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
    }
    theStream = stream;
  }, function (err) {
    alert("Error: " + err);
  });
}

function takePhoto() {
  if (!("ImageCapture" in window)) {
    alert("ImageCapture is not available");
    return;
  }

  if (!theStream) {
    alert("Grab the video stream first!");
    return;
  }

  var theImageCapturer = new ImageCapture(theStream.getVideoTracks()[0]);

  theImageCapturer.takePhoto()
    .then(function (blob) {
      var theImageTag = document.getElementById("imageTag");
      theImageTag.src = URL.createObjectURL(blob);
    })
    .catch(function (err) {
      alert("Error: " + err);
    });
}
// app.js
function getStream(type) {
  // Implementierung der getStream-Funktion
}

function takePhoto() {
  // Implementierung der takePhoto-Funktion
}

// Rest des JavaScript-Codes

