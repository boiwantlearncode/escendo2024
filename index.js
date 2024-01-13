// Change accordingly
const URL = "http://192.168.109.81:80" + "/data";


var HTMLheatindex = document.querySelector("#heatindex")
var HTMLhumidity = document.querySelector("#humidity")
var HTMLtemperature = document.querySelector("#temperature")
var HTMLsound = document.querySelector("#sound")

var HTMLtemperaturecard = document.querySelector("#temperature-card")
var HTMLsoundcard = document.querySelector("#sound-card")

var HTMLtemperaturecapsule = document.querySelector("#temperature-capsule")
var HTMLsoundcapsule = document.querySelector("#sound-capsule")

// Decide on the values
const thresholds = {
  "heatindex": 30.0,
  "humidity": 75.0,
  "temperature": 60.0,
  "sound": 1.0,
}

async function fetchAsync(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

setInterval(() => {
  fetchAsync(URL).then((data) => {
    var { heatindex, humidity, temp } = data;
    var { analog } = data;
    console.log(analog)
    var maxAnalog = Math.floor(Math.max(...analog) / 10)
    console.log(maxAnalog)

    HTMLheatindex.innerHTML = heatindex
    HTMLhumidity.innerHTML = humidity
    HTMLtemperature.innerHTML = temp
    HTMLsound.innerHTML = maxAnalog

    // Here's where the magic happens
    removeData(chart);
    addData(chart, analog);

    checkThresholds(temp, maxAnalog);
  })
}, 500);


function checkThresholds(temperatureValue, analogValue) {
  if (heatindex >= thresholds["heatindex"]) {
    if (!HTMLheatindex.classList.contains("error")) {
      HTMLheatindex.classList.add("error")
    }
  } else {
    if (HTMLheatindex.classList.contains("error")) {
      HTMLheatindex.classList.remove("error")
    }
  }

  if (humidity <= thresholds["humidity"]) {
    if (!HTMLhumidity.classList.contains("error")) {
      HTMLhumidity.classList.add("error")
    }
  } else {
    if (HTMLhumidity.classList.contains("error")) {
      HTMLhumidity.classList.remove("error")
    }
  }

  if (temperatureValue >= thresholds["temperature"]) {
    if (!HTMLtemperaturecapsule.classList.contains("danger")) {
      HTMLtemperaturecapsule.innerHTML = "Danger"
      HTMLtemperaturecapsule.classList.add("danger")
      HTMLtemperaturecapsule.classList.remove("safe")

      HTMLtemperaturecard.classList.add("danger")
      HTMLtemperaturecard.getElementsByTagName("h3")[0].style.color = "#5b5b5b"
    }
  }

  if (analogValue >= thresholds["sound"]) {
    if (!HTMLsoundcapsule.classList.contains("danger")) {
      HTMLsoundcapsule.innerHTML = "Danger"
      HTMLsoundcapsule.classList.add("danger")
      HTMLsoundcapsule.classList.remove("safe")

      HTMLsoundcard.classList.add("danger")
      HTMLsoundcard.getElementsByTagName("h3")[0].style.color = "#5b5b5b"
    }
  }
  // } else {
  //   if (HTMLsoundcapsule.classList.contains("danger")) {
  //     HTMLsoundcapsule.innerHTML = "Safe"
  //     HTMLsoundcapsule.classList.remove("danger")
  //     HTMLsoundcapsule.classList.add("safe")
  //   }
  // }
}

// Chart.js
const ctx = document.getElementById('myChart').getContext('2d');
const labels = Array.from({ length: 100 }, (_, i) => i + 1);
//const labels = analog
const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};
const data = {
  labels: labels,
  datasets: [{
    label: 'Loudness',
    data: [],
    fill: true,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

const config = {
  type: 'line',
  data: data,
  options: options
};

var chart = new Chart(ctx, config);

// function fetchAnalog() {
//   return Array.from({length: 100}, () => Math.floor(Math.random() * 100));
// }

function addData(chart, newData) {
  chart.data.datasets[0].data = newData;
  chart.update();
  // console.log(chart.data.datasets[0].data);
}

function removeData(chart) {
  chart.data.datasets[0].data = [];
  chart.update();
  // console.log(chart.data.datasets[0].data);
}