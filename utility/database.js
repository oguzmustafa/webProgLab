const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    mongoClient.connect('mongodb+srv://stok:17933971zyx@cluster0-hfrsc.mongodb.net/test?retryWrites=true&w=majority')
    //mongoClient.connect('mongodb://localhost/node-app')
        .then(client => {
            console.log('connected');
            _db = client.db();
            callback(client);
        })
        .catch(err => {
            console.log(err);
            throw err;
        })

}

const getdb = () => {
    if (_db) {
        return _db;
    }
    throw 'No Database'
}
exports.mongoConnect = mongoConnect;
exports.getdb = getdb;