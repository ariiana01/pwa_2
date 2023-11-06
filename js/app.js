const container = document.querySelector(".container");
const coffees = [
  {
    name: "Perspiciatis",
    image: "images/coffee1.jpg"
  },

];
const showCoffees = () => {
  let output = "";
  coffees.forEach(
    ({ name, image }) =>
    (output += `
              <div class="card">
                <img class="card--avatar" src=${image} />
                <h1 class="card--title">${name}</h1>
                <a class="card--link" href="#">Taste</a>
              </div>
              `)
  );
  container.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", showCoffees);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("./serviceWorker.js", { scope: "./" })
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
function getUserMedia(constraints) {
  // if Promise-based API is available, use it
  if (navigator.mediaDevices) {
    return navigator.mediaDevices.getUserMedia(constraints);
  }

  // otherwise try falling back to old, possibly prefixed API...
  var legacyApi = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;

  if (legacyApi) {
    // ...and promisify it
    return new Promise(function (resolve, reject) {
      legacyApi.bind(navigator)(constraints, resolve, reject);
    });
  }
}

function getStream(type) {
  if (!navigator.mediaDevices && !navigator.getUserMedia && !navigator.webkitGetUserMedia &&
    !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
    alert('User Media API not supported.');
    return;
  }

  var constraints = {};
  constraints[type] = true;

  getUserMedia(constraints)
    .then(function (stream) {
      var mediaControl = document.querySelector(type);

      if ('srcObject' in mediaControl) {
        mediaControl.srcObject = stream;
      } else if (navigator.mozGetUserMedia) {
        mediaControl.mozSrcObject = stream;
      } else {
        mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
      }

      mediaControl.play();

      // Aufnahme starten
      startRecording(stream);
    })
    .catch(function (err) {
      alert('Error: ' + err);
    });
}

function startRecording(stream) {
  var mediaRecorder = new MediaRecorder(stream);
  var recordedChunks = [];

  mediaRecorder.ondataavailable = function (event) {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = function () {
    
    var recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });

    
    localStorage.setItem('recordedVideo', recordedBlob);

/*     //Optional: Ein Video-Element hinzufügen, um die Aufnahme anzuzeigen
    var videoPlayer = document.createElement('video');
    videoPlayer.src = URL.createObjectURL(recordedBlob);
    videoPlayer.controls = true;
    document.body.appendChild(videoPlayer); */
  };

  mediaRecorder.start();
  
//10sek stop
  setTimeout(function () {
    mediaRecorder.stop();
  }, 10000);
}


getStream('video');



