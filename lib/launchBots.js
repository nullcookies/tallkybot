const mongo = require('mongodb').MongoClient
const data = require('./data')
const createInstance = require('./createInstance')
const sendError = require('./sendError')

const launchBot = async () => {
  try {
    const client = await mongo.connect(data.mongoLink, { useUnifiedTopology: true })
    const db = client.db('tallkybot')
    const allBots = await db.collection('tallkybot').find({}).toArray()

    for (let key of allBots) {
      await createInstance(key.token)
    }
  } catch (err) {
    sendError(err)
  }
}


module.exports = launchBot