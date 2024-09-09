'use strict'

const { db } = require('../config/firebaseConfig')
module.exports = {
  readMany: async (req, res) => {
    const collection = req.query.collection
    try {
      const snapshot = await db.collection(collection).get()

      if (snapshot.empty) {
        return res.status(404).send('No articles found')
      }

      const data = snapshot.docs.map((doc) => {
        const docData = doc.data()

        if (!docData.image) docData.image = docData.urlToImage || ''
        if (!docData.publishedAt)
          docData.publishedAt = docData.published || null

        return {
          id: doc.id,
          ...docData,
        }
      })

      const sortedData = data.sort((a, b) => {
        return (
          new Date(b.publishedAt || 0).getTime() -
          new Date(a.publishedAt || 0).getTime()
        )
      })

      return res.status(200).send(sortedData)
    } catch (err) {
      return res.status(500).send('Internal server error.')
    }
  },

  readOne: async (req, res) => {
    try {
      const id = req.params.id
      const collection = req.query.collection

      const doc = await db.collection(collection).doc(id).get()
      if (!doc.exists) {
        return res.status(404).send('Article not found')
      }

      const docData = doc.data()

      if (!docData.image) docData.image = docData.urlToImage || ''
      if (!docData.publishedAt) docData.publishedAt = docData.published || null

      const data = {
        id: doc.id,
        ...docData,
      }

      return res.status(200).send(data)
    } catch (err) {
      return res.status(500).send('Internal server error.')
    }
  },
}
