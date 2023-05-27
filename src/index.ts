import "./styles/index.css";

const url = 'https://api.open-meteo.com/v1/metno?latitude=59.64&longitude=17.08&hourly=temperature_2m&current_weather=true'

const berga = document.querySelector('.berga')
const bergaBtn = document.querySelector('#bergaBtn')

const callWeather = async () => await (await fetch(url)).json()

const enkp = async () => {
const data = await callWeather()
const data2 = data.current_weather
const temp = data2.temperature
const windspeed = data2.windspeed
const windDirection = data2.winddirection

return [temp, windspeed, windDirection]
}

const weatherDiv = async () => {
  const divi = document.createElement('div')
  const [temp, windspeed, windDirection] = await enkp()
  divi.innerHTML = `<p>The temp in Enköping is ${temp}C. The windspeed is ${windspeed}m/s at ${windDirection} degrees.</p>`
  berga.append(divi)
}

bergaBtn.addEventListener('click', weatherDiv)