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

const saveCurrentsApiArticles = async () => {
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
      // Get articles
      const currentsArticles = await getCurrentsApiArticles(category)

      if (currentsArticles && currentsArticles.length > 0) {
        // delete old collection
        await deleteCollection(category)

        // Save current article
        const currentsBatch = db.batch()
        currentsArticles.forEach((article) => {
          const docRef = db.collection(category).doc()
          currentsBatch.set(docRef, article)
        })
        await currentsBatch.commit()
        console.log(`articles from ${category} category have been saved.`)
      } else {
        console.log(`No articles found for ${category} category.`)
      }
    }

    console.log('Articles from CurrentsAPI successfully saved!')
  } catch (error) {
    console.log('Error saving articles:', error)
  }
}

module.exports = saveCurrentsApiArticles
