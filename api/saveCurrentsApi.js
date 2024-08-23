'use strict'

const { db } = require('../src/config/firebaseConfig')
const getCurrentsApiArticles = require('../src/helpers/getCurrentsApiArticles')

const deleteCollection = async (collectionName) => {
  const collectionRef = db.collection(collectionName)
  const snapshot = await collectionRef.get()

  const batch = db.batch()
  snapshot.forEach((doc) => {
    batch.delete(doc.ref)
  })

  await batch.commit()
}

const saveCurrentsApiArticles = async (req, res) => {
  try {
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
    console.log('Articles from NewsAPI successfully saved!')
    res.status(200).json({ message: 'Articles successfully saved!' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to save articles.' })
  }
}

module.exports = saveCurrentsApiArticles
