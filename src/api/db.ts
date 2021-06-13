import { MongoClient } from 'mongodb'

const uri =
  'mongodb://mongodb:27017?retryWrites=true&writeConcern=majority'

export const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export function getGamesCollection() {
  const db = client.db('urbantreasure')
  return db.collection('games')
}
