var HTMLheatindex = document.querySelector("#heatindex")
var HTMLhumidity = document.querySelector("#humidity")
var HTMLtemperature = document.querySelector("#temperature")

// Decide on the values
const thresholds = {
  "heatindex": 30.0,
  "humidity": 75.0,
  "temperature": 50.0
}

async function fetchAsync (url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

setInterval(() => {
  fetchAsync("http://192.168.109.81:80/data").then((data) => {
    console.log(data)
    var { heatindex, humidity, temp } = data;
    console.log(heatindex, humidity, temp)

    HTMLheatindex.innerHTML = heatindex
    HTMLhumidity.innerHTML = humidity
    HTMLtemperature.innerHTML = temp

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

