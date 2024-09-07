module.exports = async (city) => {
  const apiKey = process.env.WEATHER_API_KEY
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()

    const weatherData = {
      city: data.location.name,
      country: data.location.country,
      local_time: data.location.localtime,
      temperature_c: data.current.temp_c,
      temperature_f: data.current.temp_f,
      condition_text: data.current.condition.text,
      condition_icon: data.current.condition.icon,
      wind_kph: data.current.wind_kph,
      humidity: data.current.humidity,
      feelslike_c: data.current.feelslike_c,
      feelslike_f: data.current.feelslike_f,
      last_updated: data.current.last_updated,
    }

    return weatherData
  } catch (error) {
    return null
  }
}
