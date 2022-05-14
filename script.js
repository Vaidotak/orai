let apiKey = "3caf575b23a52e649f756f432846ed3e"; // mano api key
let lang = "lt"; // kalba
let units = "metric"; // naudojama metrinė sistema
let city = ""; // miestas įrašytas inpute

let cityName = document.getElementById("city")
let searchButton = document.getElementById("search")

// iš local storage paimu vertę ir įdedu į inputą
cityName.value = localStorage.getItem('miestas')

// uždedu click eventą ant search mygtuko
searchButton.addEventListener("click", getDataFromApi);

// funkcija, kuri gauna duomenis iš API
function getDataFromApi() {
  // paimu įrašytą miestą iš input ir nustatau
  city = cityName.value;

  // išsaugau įvestą miestą į local storage
  localStorage.setItem("miestas", city)
  

  // url yra skirtas pasiimti duomenis iš api
  let url =
    "https://api.openweathermap.org/data/2.5/forecast?" +
    "q=" +
    city +
    "&units=" +
    units +
    "&lang=" +
    lang +
    "&appid=" +
    apiKey;

  // su fetch funkcija pasiimu duomenis iš api (asinchroninė funkcija)
  fetch(url)
    .then((response) => response.json())
    // data => mano kodas
    .then(function (data) {
      //paduodu gautus duomenis į funkciją
      showWeatherInDom(data);
    });

}

// funkcija, kuri gauna duomenis ir juos atvaizduoja
function showWeatherInDom(data) {
  // tikrinu ar mano response yra geras
  if (data.cod === "200") {
    // data tai duomenys, kuriuos mes padavėm į funkciją
    // čia atvaizduojam gautus duomenis DOM'e
    const temperatura = Math.round(data.list[0].main.temp);
    const vejasSpeed = Math.round(data.list[0].wind.speed);
    const vejasGust = Math.round(data.list[0].wind.gust);
    const orasWeather = data.list[0].weather[0].description.toUpperCase();
    const orasFeelsLike = Math.round(data.list[0].main.feels_like);
    const slegis = data.list[0].main.pressure;
    const weatherIcon = data.list[0].weather[0].icon;
    const iconUrl =
      "http://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/" +
      weatherIcon +
      ".svg";

    // paleidžiu pagrindinį konteinerį
    domContainer(data)

    // sukuriami papildomi blokai ateities temperatūrai parodyti
    showWeather2days(1, 40, 2)

    function domContainer(data) {
      const container = document.createElement("div");
      container.setAttribute("id", "container");
      container.style.backgroundColor = "#FEEFC3";
      container.style.backgroundImage = "url('pattern8@2x.png')";
      //container.style.minWidth = "100%";
      container.style.maxWidth = "60%";
      container.style.margin = "auto";
      container.style.marginTop = "5px"
      container.style.marginBottom = "5px"
      container.style.borderRadius = "10px"
      container.style.padding = "2%";
      container.style.opacity = "95%";
      container.style.fontSize = "3vh";

      // prieš appendinant ištrinamas ankstesnis sukurtas konteineris
      if (document.getElementById("container")) {
        document.getElementById("container").remove();
      }

      document.body.appendChild(container);

      const containerH1 = document.createElement("H1")
      containerH1.innerText = data.city.name.toUpperCase()
      container.prepend(containerH1)

      const containerHeader = document.createElement("div");
      containerHeader.setAttribute("id", "container-header");
      containerHeader.style.display = "flex";
      //containerHeader.style.fontSize = '50px'
      containerHeader.style.alignItems = "center";
      container.appendChild(containerHeader);

      const infoWeather = document.createElement("H2");
      infoWeather.style.padding = "2%";
      infoWeather.innerHTML = orasWeather
      container.appendChild(infoWeather);

      // let htmlElements = ""
      //   for (let i = 0; i < 1; i++) {
      //   htmlElements += '<div class="weather"></div>'

      //   htmlElements += '<div class="pressure"></div>'
      //   htmlElements += '<div class="wind"></div>'
      //   }
      //   let pirmas = document.getElementsByClassName('weather')
      //   console.log(document.getElementsByClassName('weather'))
      //   console.log(orasWeather)
      //   document.getElementsByClassName('weather').innerHTML = orasWeather
      //   let containerDiv = document.getElementById("container")
      //   console.log(document.getElementById("container"))
      //   containerHeader.innerHTML = htmlElements



      // const population = document.createElement("div")
      // population.style.borderRadius = "10px";

      // population.style.padding = "2%";
      // population.style.margin = "2%";
      // population.innerHTML = ` `+  data.city.population
      // container.appendChild(population);

      // const personImg = document.createElement('img')
      // personImg.setAttribute('id', 'personimg')
      // const personImgUrl = 'person-solid.svg'
      // personImg.src = personImgUrl
      // population.prepend(personImg)

      // const windDiv = document.createElement("div")
      // windDiv.style.borderRadius = "10px";
      // windDiv.style.padding = "2%";
      // windDiv.style.margin = "2%";
      // windDiv.innerHTML = ` `+ vejasSpeed + ` ` + mS
      // container.appendChild(windDiv);

      // const windImg = document.createElement('img')
      // windImg.setAttribute('id', 'windimgurl')
      // const windimgurl = 'wind-solid.svg'
      // windImg.src = windimgurl
      // windDiv.prepend(windImg)

      const tempDabar = document.createElement("div");
      tempDabar.style.borderRadius = "10px";
      tempDabar.style.backgroundColor = "#FED68E";
      tempDabar.style.padding = "2%";
      tempDabar.style.margin = "2%";
      tempDabar.style.textAlign = 'center'
      tempDabar.setAttribute("id", "tempnow");
      tempDabar.innerHTML =
        feelsSign + ` ` + orasFeelsLike + ` ` + tempSign + `` + `,` + ` ` + langPressure + ` ` + slegis + ` hPa`;
      container.appendChild(tempDabar);

      const vejas = document.createElement("div");
      vejas.style.borderRadius = "10px";
      vejas.style.backgroundColor = "#FED68E";
      vejas.style.padding = "2%";
      vejas.style.margin = "2%";
      vejas.style.textAlign = 'center'
      vejas.innerHTML =
        windSpeed + ` ` +
        vejasSpeed +
        ` ` + mS + `` + `,` + ` ` + gusT + ` ` +
        vejasGust +
        ` ` + mS
      container.appendChild(vejas);

      const img = document.createElement("img");
      img.style.textAlign = "center";
      img.src = iconUrl;
      containerHeader.prepend(img);

      // Temperatūra. Pagrindinis rodmuo
      const tempDabarBig = document.createElement("div");
      tempDabarBig.setAttribute("id", "temp-big");
      tempDabarBig.style.fontSize = "15vh";
      tempDabarBig.style.padding = "2%";
      tempDabarBig.innerHTML = temperatura + ` ` + tempSign
      containerHeader.appendChild(tempDabarBig);
    }

  } else {
    alert("kazkas negerai, patikrinti konsole");
    console.log("Kazkas negerai", data);
  }

  function showWeather2days(indexReiksme, indexIlgis, indexPlius) {
    for (let i = indexReiksme; i < indexIlgis; i += indexPlius) {
      const futureWeatherIcon = data.list[i].weather[0].icon
      const futureIconUrl =
        "http://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/" +
        futureWeatherIcon +
        ".svg";
      futureWeatherIcon
      const futureWeather = document.createElement("div")
      const futureWeatherLeft1 = document.createElement("div")
      futureWeatherLeft1.setAttribute("id", "futureWeatherLeft1")
      //futureWeatherLeft1.style.backgroundColor = "#FFF7DF";
      futureWeatherLeft1.style.minWidth = "22%";
      futureWeatherLeft1.style.fontSize = "2.5vh";
      futureWeatherLeft1.innerHTML = data.list[i].dt_txt
      futureWeather.appendChild(futureWeatherLeft1);

      const futureWeatherLeft2 = document.createElement("div")
      futureWeatherLeft2.setAttribute("id", "futureWeatherLeft2")
      //futureWeatherLeft2.style.backgroundColor = "#FFF7DF"
      futureWeatherLeft2.style.display = "flex"
      futureWeatherLeft2.style.justifyContent = "center"
      futureWeather.appendChild(futureWeatherLeft2)

      const futureimg = document.createElement("img");
      futureimg.setAttribute("id", "futureimg");
      futureimg.style.textAlign = "center";
      futureimg.src = futureIconUrl;
      futureWeatherLeft2.prepend(futureimg)
      //futureWeatherLeft2.innerText = data.list[i].weather[0].description
      console.log(data.list[i].weather[0].description)

      const futureWeatherRight1 = document.createElement("div");
      futureWeatherRight1.setAttribute("id", "futureWeatherRight1");
      //futureWeatherRight1.style.backgroundColor = "#FFF7DF";
      futureWeatherRight1.style.minWidth = "22%";
      futureWeatherRight1.style.display = "flex";
      futureWeatherRight1.style.justifyContent = "center";
      futureWeatherRight1.style.alignItems = "center";
      futureWeatherRight1.innerHTML =
        Math.round(data.list[i].main.temp) + ` ` + tempSign
      futureWeather.appendChild(futureWeatherRight1);
      const futureWeatherRight2 = document.createElement("div");
      futureWeatherRight2.setAttribute("id", "futureWeatherRight2");
      //futureWeatherRight2.style.backgroundColor = "#FFF7DF";
      futureWeatherRight2.style.minWidth = "22%";
      futureWeatherRight2.style.display = "flex";
      futureWeatherRight2.style.justifyContent = "center";
      futureWeatherRight2.style.alignItems = "center";
      futureWeatherRight2.innerHTML =
        Math.round(data.list[i].wind.speed) + ` ` + mS
      futureWeather.appendChild(futureWeatherRight2);
      futureWeather.style.backgroundColor = "#FFFFFF";
      futureWeather.style.padding = "2px";
      futureWeather.style.margin = "5px";
      futureWeather.style.fontSize = "2.5vh";
      futureWeather.style.display = "flex";
      futureWeather.style.flexBasis = "0";
      futureWeather.style.flexGrow = " 1";
      futureWeather.style.flexShrink = " 1";
      futureWeather.style.columnGap = "10px";
      futureWeather.style.border = "0.1px solid #888888";
      futureWeather.style.justifyContent = "space-evenly";
      document.getElementById("container").appendChild(futureWeather);

      //let naujasArray = data.map(data.list[i])
      //console.log(naujasArray)
      //let tempForecast = data.list[i].dt_txt
      //console.log(tempForecast)
      console.log(data.list[i]);
    }
  }

}
let feelsSign = 'jutiminė'
let windSpeed = 'vėjo greitis'
let mS = 'm/s'
let gusT = 'gūsiais'
let tempSign = '°C'
let windSpeedImperial = 'mph'
let langPressure = 'slėgis'
document.getElementById('language').addEventListener('change', function () {
  lang = this.value
  if (lang === 'en') {
    feelsSign = 'feels like'
    windSpeed = 'wind speed'
    gusT = 'gust'
    langPressure = 'pressure'
  }
  if (lang === 'ua') {
    feelsSign = 'відчуває, як'
    windSpeed = 'швидкість вітруd'
    mS = 'м/с'
    gusT = 'порив'
    langPressure = 'тиск'
  }
  if (lang === 'lt') {
    feelsSign = 'jutiminė'
    windSpeed = 'vėjo greitis'
    gusT = 'gūsiais'
    langPressure = 'slėgis'
  }
})
document.getElementById('units').addEventListener('change', function () {
  units = this.value
  if (units === 'imperial') {
    tempSign = '°F'
    mS = 'mph'
  }
  if (units === 'standart') {
    tempSign = '°K'
    mS = 'm/s'
  }
  if (units === 'metric') {
    tempSign = '°C'
    mS = 'm/s'
  }
})
// function onTimerElapsed() {
//   let myDiv = document.getElementById("city");
//   myDiv.style.display = myDiv.style.display === 'none' ? 'block' : 'none';
// }
// function startTime(){
//   const date = new Date()
//   document.getElementById('laikrodis').innerHTML = date.toLocaleTimeString();
//   setTimeout(function() {startTime()}, 1000) 
// }
// labasVakaras('Vytenis', 'grupiokai')

// function labasVakaras(pirmasNarys, antrasNarys) {
//   console.log(pirmasNarys + ` ` + ` ir ` + antrasNarys + ` labas vakaras!`)
// }
let div = document.createElement('div');
        div.className = "alert";
        div.innerHTML = "Labas! Paieškos laukelyje įvesk miestą, kurio temperatūrą nori sužinoti";
      
        document.body.append(div);
        setTimeout(() => div.remove(), 3000);