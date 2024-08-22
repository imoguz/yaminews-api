'use strict'

const { db } = require('../config/firebaseConfig')
const getNewsApiArticles = require('./getNewsApiArticles')
const getCurrentsApiArticles = require('./getCurrentsApiArticles')
const cron = require('node-cron')

const deleteCollection = async (collectionName) => {
  const collectionRef = db.collection(collectionName)
  const snapshot = await collectionRef.get()

  const batch = db.batch()
  snapshot.forEach((doc) => {
    batch.delete(doc.ref)
  })

  await batch.commit()
}

const saveArticles = async () => {
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

    const currentApiCategories = [
      'world',
      'regional',
      'lifestyle',
      'programming',
      'finance',
      'academia',
      'politics',
      'opinion',
      'food',
      'game',
    ]

    // Save articles from News API
    for (const category of newsApiCategories) {
      // delete old collections
      await deleteCollection(category)
      await deleteCollection(`${category}_TH`)

      // Save everything articles
      const everythingArticles = await getNewsApiArticles(
        'everything',
        category
      )
      const everythingBatch = db.batch()

      everythingArticles.forEach((article) => {
        const docRef = db.collection(category).doc()
        everythingBatch.set(docRef, article)
      })
      await everythingBatch.commit()

      // Save top-headlines articles
      const topHeadlinesArticles = await getNewsApiArticles(
        'top-headlines',
        category
      )
      const topHeadlinesBatch = db.batch()

      topHeadlinesArticles.forEach((article) => {
        const docRef = db.collection(`${category}_TH`).doc()
        topHeadlinesBatch.set(docRef, article)
      })
      await topHeadlinesBatch.commit()
    }

    // Save articles from Currents API
    for (const category of currentApiCategories) {
      // delete old collection
      await deleteCollection(`currentapi_${category}`)

      const currentsArticles = await getCurrentsApiArticles(category)
      const currentsBatch = db.batch()

      currentsArticles.forEach((article) => {
        const docRef = db.collection(`currentapi_${category}`).doc()
        currentsBatch.set(docRef, article)
      })
      await currentsBatch.commit()
    }

    console.log('Articles from NewsAPI and CurrentsAPI successfully saved!')
  } catch (error) {
    console.error('Error fetching or saving articles:', error)
  }
}

// set cron job every six hours
cron.schedule('0 */6 * * *', saveArticles)

module.exports = saveArticles
