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

        // Save new everything article
        const everythingBatch = db.batch()
        everythingArticles.forEach((article) => {
          const docRef = db.collection(category).doc()
          everythingBatch.set(docRef, article)
        })
        await everythingBatch.commit()
        console.log(`"${category}" articles (everything) saved.`)
      } else {
        console.log(`No "everything" articles found for "${category}".`)
      }

      // Get top-headlines article
      const topHeadlinesArticles = await getNewsApiArticles(
        'top-headlines',
        category
      )

      if (topHeadlinesArticles && topHeadlinesArticles.length > 0) {
        // delete old collections
        await deleteCollection(`${category}_TH`)

        // Save new top-headlines article
        const topHeadlinesBatch = db.batch()
        topHeadlinesArticles.forEach((article) => {
          const docRef = db.collection(`${category}_TH`).doc()
          topHeadlinesBatch.set(docRef, article)
        })
        await topHeadlinesBatch.commit()
        console.log(`"${category}" articles (top-headlines) saved.`)
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
