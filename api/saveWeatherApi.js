'use strict'

const { db } = require('../src/config/firebaseConfig')
const getWeatherApi = require('../src/helpers/getWeatherApi')

const deleteCollection = async (collectionName) => {
  const collectionRef = db.collection(collectionName)
  const snapshot = await collectionRef.get()

  const batch = db.batch()
  snapshot.forEach((doc) => {
    batch.delete(doc.ref)
  })

  await batch.commit()
}

const saveWeatherForecasts = async (req, res) => {
  try {
    const cities = [
      'London',
      'Paris',
      'Berlin',
      'Tokyo',
      'New York',
      'Istanbul',
      'Ankara',
      'Washington',
    ]

    // delete old collections
    await deleteCollection('weatherForecast')

    const batch = db.batch()

    for (const city of cities) {
      const weatherData = await getWeatherApi(city)
      if (weatherData) {
        const cityDocRef = db.collection('currentWeather').doc(city)
        batch.set(cityDocRef, weatherData)
      }
    }

    await batch.commit()
    console.log('All weather data successfully saved to Firestore.')

    if (res) {
      res.status(200).json({ message: 'Weather data successfully saved!' })
    }
  } catch (error) {
    console.error('Error saving weather data:', error)
    if (res) {
      res.status(500).json({ error: 'Failed to save weather data.' })
    }
  }
}

module.exports = saveWeatherForecasts
