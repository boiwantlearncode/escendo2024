// Change accordingly
const URL = "http://192.168.109.81:80" + "/data";


var HTMLheatindex = document.querySelector("#heatindex")
var HTMLhumidity = document.querySelector("#humidity")
var HTMLtemperature = document.querySelector("#temperature")

// Decide on the values
const thresholds = {
  "heatindex": 30.0,
  "humidity": 75.0,
  "temperature": 50.0,
}

async function fetchAsync (url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

setInterval(() => {
  fetchAsync(URL).then((data) => {
    var { heatindex, humidity, temp, JSON } = data;
    var { analog } = JSON;

    HTMLheatindex.innerHTML = heatindex
    HTMLhumidity.innerHTML = humidity
    HTMLtemperature.innerHTML = temp

    // Here's where the magic happens
    removeData(chart);
    addData(chart, analog);

    checkThresholds();
  })
}, 500);


function checkThresholds() {
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
  
  if (temperature >= thresholds["temperature"]) {
    if (!HTMLtemperature.classList.contains("error")) {
      HTMLtemperature.classList.add("error")
    }
  } else {
    if (HTMLtemperature.classList.contains("error")) {
      HTMLtemperature.classList.remove("error")
    }
  }
}

// Chart.js
const ctx = document.getElementById('myChart').getContext('2d');
const labels = Array.from({length: 100}, (_, i) => i+1);
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
  console.log(chart.data.datasets[0].data);
}
  
function removeData(chart) {
  chart.data.datasets[0].data = [];
  chart.update();
  console.log(chart.data.datasets[0].data);
}



