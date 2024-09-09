'use strict'

const { db } = require('../config/firebaseConfig')

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
    const newsCategories = [
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
      'general',
      'sports',
      'health',
      'science',
      'business',
      'technology',
      'entertainment',
      'general_th',
      'sports_th',
      'health_th',
      'science_th',
      'business_th',
      'technology_th',
      'entertainment_th',
    ]

    for (const category of newsCategories) {
      await deleteCollection(category)
    }

    console.log('All news collections are successfully deleted.')
  } catch (error) {
    console.log(error)
  }
}
