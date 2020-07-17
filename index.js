const MongoClient = require("mongodb").MongoClient
const assert = require('assert')
const dbOps = require('./operations')

const url = 'mongodb://localhost:27017'
const dbname = 'conFusion'

MongoClient.connect(url)
    .then((client) => {
        console.log('Connected to Mongo DB server')

        const db = client.db(dbname)
        dbOps.insertDocument(db, { "name": "DB ops insert", "desc": "testing db ops" }, 'dishes')
            .then((result) => {
                console.log('Insert Document:\n', result.ops)
                return dbOps.findDocuments(db, 'dishes')
            })
            .then((docs) => {
                console.log('Found docs:\n', docs)
                return dbOps.updateDocument(db, { "name": "DB ops insert" }, { "desc": "Updated document des" }, 'dishes')
            })
            .then((result) => {
                console.log('Updated document:\n')
                return dbOps.findDocuments(db, 'dishes')
            })
            .then((docs) => {
                console.log('Found updated docs:\n', docs)
                return db.dropCollection('dishes')
            })
            .then((result) => {
                console.log(result)
                client.close()
            })
            .catch((err) => console.log("Error - ", err))
    })
    .catch((err) => console.log("Error - ", err))