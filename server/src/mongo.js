const MONGO_USER = process.env.MONGO_USER
const MONGO_PW = process.env.MONGO_PW
const MONGO_HOST = process.env.MONGO_HOST
const MONGO_PORT = process.env.MONGO_PORT
const DATABASE_NAME = process.env.DATABASE_NAME

const MongoClient = require('mongodb').MongoClient
const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PW}@${MONGO_HOST}:${MONGO_PORT}`
const dbOptions = {
    poolSize: 10,
    useUnifiedTopology: true,
}

exports.connect = (callback) => {
    MongoClient.connect(MONGO_URI, dbOptions, (err, client) => {
        if (err) {
            console.log('failed to connect to mongoDB:', err)
            process.exit(1)
        }

        db = client.db(DATABASE_NAME)
        console.log('successfully connected to mongoDB database:', db.databaseName)
        callback(db)
    })
}
