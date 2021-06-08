import { MongoClient } from 'mongodb'

const uri =
  'mongodb://mongodb:27017?retryWrites=true&writeConcern=majority'

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
client.connect()

const database = client.db('urbantreasure')
export const gamesCollection = database.collection('games')
