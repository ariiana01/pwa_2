const container = document.querySelector(".container");
const coffees = [
  {
   
 <div class="columns">
  <div class="column">
    <p><button type="button" onclick="getStream('video')">Grab video</button></p>
    
    <video controls autoplay style="height:180px; width: 240px;"></video>
  </div>
  <div class="column">
    <p><button type="button" onclick="getStream('audio')">Grab audio</button></p>
    
    <audio controls></audio>
  </div>
</div>
 
  }
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
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
