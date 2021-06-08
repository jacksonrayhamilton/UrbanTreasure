import { MongoClient } from 'mongodb'

const uri =
  'mongodb://mongodb:27017?retryWrites=true&writeConcern=majority'

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
client.connect()

export const database = client.db('urbantreasure')
