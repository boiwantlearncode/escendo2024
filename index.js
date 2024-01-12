var HTMLheatindex = document.querySelector("#heatindex")
var HTMLhumidity = document.querySelector("#humidity")
var HTMLtemperature = document.querySelector("#temperature")

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
  })
}, 500);


