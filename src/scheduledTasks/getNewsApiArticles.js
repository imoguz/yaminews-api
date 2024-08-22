module.exports = async (category, query) => {
  const apiKey = process.env.NEWSAPI_KEY
  const url = `https://newsapi.org/v2/${category}?q=${query}&apiKey=${apiKey}`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    const data = await response.json()
    const articles = data.articles
      ?.filter((article) => article.title !== '[Removed]')
      .sort((a, b) => {
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )
      })

    return articles
  } catch (error) {
    throw new Error(error.message)
  }
}
