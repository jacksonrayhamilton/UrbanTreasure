import { MongoClient } from 'mongodb'

const uri =
  'mongodb://mongodb:27017?retryWrites=true&writeConcern=majority'

export const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export const database = (async () => {
  await client.connect()
  return client.db('urbantreasure')
})()
