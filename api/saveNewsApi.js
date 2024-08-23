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

const saveNewsApiArticles = async (req, res) => {
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

    console.log('Articles from CurrentsAPI successfully saved!')
    res.status(200).json({ message: 'Articles successfully saved!' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to save articles.' })
  }
}
module.exports = saveNewsApiArticles
