const MongoClient = require("mongodb").MongoClient
const assert = require('assert')
const dbOps = require('./operations')

const url = 'mongodb://localhost:27017'
const dbname = 'conFusion'

MongoClient.connect(url, (err, client) => {

    assert.equal(err, null)

    console.log('Connected to Mongo DB server')

    const db = client.db(dbname)

    dbOps.insertDocument(db, {"name": "DB ops insert", "desc": "testing db ops"}, 'dishes', (result) => {
        console.log('Insert Document:\n', result.ops)

        dbOps.findDocuments(db, 'dishes', (docs) => {
            console.log('Found docs:\n', docs)

            dbOps.updateDocument(db, {"name": "DB ops insert"}, 
                {"desc": "Updated document des"}, 
                'dishes', 
                (result) => {
                console.log('Updated document:\n')

                dbOps.findDocuments(db, 'dishes', (docs) => {
                    console.log('Found updated docs:\n', docs)

                    db.dropCollection('dished', (result) => {
                        console.log(result)
                        client.close()
                    })
                })
            })
        })
    })
})