'use strict'

const { db } = require('../src/config/firebaseConfig')
const getNewsApiArticles = require('../src/helpers/getNewsApiArticles')

const deleteCollection = async (collectionName) => {
  const collectionRef = db.collection(collectionName)
  const snapshot = await collectionRef.get()

  const batch = db.batch()
  snapshot.forEach((doc) => {
    batch.delete(doc.ref)
  })

  await batch.commit()
}

const saveNewsApiArticles = async () => {
  try {
    const newsApiCategories = [
      'general',
      'sports',
      'health',
      'science',
      'business',
      'technology',
      'entertainment',
    ]

    for (const category of newsApiCategories) {
      // Get everything articles
      const everythingArticles = await getNewsApiArticles(
        'everything',
        category
      )

      if (everythingArticles && everythingArticles.length > 0) {
        // delete old collection
        await deleteCollection(category)

        // Save current articles
        const everythingBatch = db.batch()
        everythingArticles.forEach((article) => {
          const docRef = db.collection(category).doc()
          everythingBatch.set(docRef, article)
        })
        await everythingBatch.commit()
        console.log(`articles from ${category} category have been saved.`)
      } else {
        console.log(`No articles found for ${category} category.`)
      }

      // Get top-headlines articles
      const topHeadlinesArticles = await getNewsApiArticles(
        'top-headlines',
        category
      )

      if (topHeadlinesArticles && topHeadlinesArticles.length > 0) {
        // delete old collection
        await deleteCollection(`${category}_th`)

        // Save current articles
        const topHeadlinesBatch = db.batch()
        topHeadlinesArticles.forEach((article) => {
          const docRef = db.collection(`${category}_th`).doc()
          topHeadlinesBatch.set(docRef, article)
        })
        await topHeadlinesBatch.commit()
        console.log(`articles from ${category}_th category have been saved.`)
      } else {
        console.log(`No "top-headlines" articles found for "${category}".`)
      }
    }

    console.log('Articles from NewsAPI successfully saved!')
  } catch (error) {
    console.log('Error saving articles:', error)
  }
}

module.exports = saveNewsApiArticles
