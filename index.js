const MongoClient = require("mongodb").MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017'
const dbname = 'conFusion'

MongoClient.connect(url, (err, client) => {

    assert.equal(err, null)

    console.log('Connected to Mongo DB server')

    const db = client.db(dbname)
    const collection = db.collection('dishes')

    collection.insertOne({"name" :"KP", "desc": "inserted from code"}, (err, result) => {
        assert.equal(err, null)

        console.log('After Insert: \n')
        console.log(result.ops)

        // get all documents
        collection.find({}).toArray((err, docs) => {
            assert.equal(err, null)

            console.log('Found: \n')
            console.log(docs)

            // drop the collection
            db.dropCollection('dishes', (err, result) => {
                assert.equal(err, null)
                console.log('collection is dropped')

                client.close()
            })

        })
    })
})