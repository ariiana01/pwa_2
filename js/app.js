
  const container = document.querySelector(".container");
const coffees = [
  {
    name: "Perspiciatis",
    image: "images/coffee1.jpg",
  },
  {
    name: "Voluptatem",
    image: "images/coffee2.jpg",
  },
  {
    name: "Explicabo",
    image: "images/coffee3.jpg",
  },
  {
    name: "Rchitecto",
    image: "images/coffee4.jpg",
  },
  {
    name: " Beatae",
    image: "images/coffee5.jpg",
  },
  {
    name: " Vitae",
    image: "images/coffee6.jpg",
  },
  {
    name: "Inventore",
    image: "images/coffee7.jpg",
  },
  {
    name: "Veritatis",
    image: "images/coffee8.jpg",
  },
  {
    name: "Accusantium",
    image: "images/coffee9.jpg",
  },
];

const showCoffees = () => {
  let output = "";
  coffees.forEach(({ name, image }) => {
    output += `
      <div class="card">
        <img class="card--avatar" src="${image}" />
        <h1 class="card--title">${name}</h1>
        <a class="card--link" href="#">Taste</a>
      </div>
    `;
  });
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


// app.js
const videoElement = document.getElementById('videoElement'); // Video-Element in HTML
const audioElement = document.getElementById('audioElement'); // Audio-Element in HTML

function getStream(type) {
  if (!navigator.mediaDevices && !navigator.getUserMedia && !navigator.webkitGetUserMedia && !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
    alert('User Media API not supported.');
    return;
  }

  var constraints = {};
  constraints[type] = true;

  getUserMedia(constraints)
    .then(function (stream) {
      if (type === 'video') {
        if ('srcObject' in videoElement) {
          videoElement.srcObject = stream;
        } else if (navigator.mozGetUserMedia) {
          videoElement.mozSrcObject = stream;
        } else {
          videoElement.src = (window.URL || window.webkitURL).createObjectURL(stream);
        }

        videoElement.play();
      } else if (type === 'audio') {
        if ('srcObject' in audioElement) {
          audioElement.srcObject = stream;
        } else if (navigator.mozGetUserMedia) {
          audioElement.mozSrcObject = stream;
        } else {
          audioElement.src = (window.URL || window.webkitURL).createObjectURL(stream);
        }

        audioElement.play();
      }
    })
    .catch(function (err) {
      alert('Error: ' + err);
    });
}

// Rest deines Codes
