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

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      return res.status(200).send(data)
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

      const data = {
        id: doc.id,
        data: doc.data(),
      }

      return res.status(200).send(data)
    } catch (err) {
      return res.status(500).send('Internal server error.')
    }
  },
}
