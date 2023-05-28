import "./styles/index.css";

const url = 'https://api.open-meteo.com/v1/metno?latitude=59.64&longitude=17.08&hourly=temperature_2m&current_weather=true'
const berga = document.querySelector('.berga')
const bergaBtn = document.querySelector('#bergaBtn')

const callWeatherApi = async () => await (await fetch(url)).json()

const structureData = async () => {
  const data = await callWeatherApi()

  return [data.current_weather.temperature, data.current_weather.windspeed, data.current_weather.winddirection]
}

const dateFunc = () => {
  const date = new Date();
  const todaysDate = date.toLocaleDateString();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return [todaysDate, hours, minutes];
};

const appendToDom = async () => {
  const divi = document.createElement('div')
  divi.setAttribute('id', 'dataEnkp')
  const [date, hour, min] = dateFunc()
  const [temp, windspeed, windDirection] = await structureData()
  divi.innerHTML = `<p>${date} ${hour}:${min}</p><p>The temp in Enköping is ${temp}C. The windspeed is ${windspeed}m/s at ${windDirection} degrees.</p>`
  berga.append(divi)
}

bergaBtn.addEventListener('click', () => {
  if (document.querySelector('#dataEnkp')) {
    document.querySelector('#dataEnkp').remove()
  }
  appendToDom()
})