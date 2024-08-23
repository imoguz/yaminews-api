'use strict'

const { db } = require('../src/config/firebaseConfig')

const deleteCollection = async (collectionName) => {
  const collectionRef = db.collection(collectionName)
  const snapshot = await collectionRef.get()

  const batch = db.batch()
  snapshot.forEach((doc) => {
    batch.delete(doc.ref)
  })

  await batch.commit()
}

module.exports = async () => {
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
      // delete currentsApi collection
      await deleteCollection(`currentapi_${category}`)
    }
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
      // delete newsApi collections
      await deleteCollection(category)
      await deleteCollection(`${category}_TH`)
    }

    console.log(
      'NewsAPI and CurrentsApi article collections successfully deleted.'
    )
  } catch (error) {
    console.log(error)
  }
}
