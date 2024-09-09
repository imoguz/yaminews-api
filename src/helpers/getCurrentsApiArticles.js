module.exports = async (category) => {
  const apiKey = process.env.CURRENTSAPI_KEY
  const url = `https://api.currentsapi.services/v1/latest-news?category=${category}&apiKey=${apiKey}`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    const data = await response.json()

    return data.news
  } catch (error) {
    throw new Error(error.message)
  }
}
