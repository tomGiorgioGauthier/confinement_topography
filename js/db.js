'use strict';
const { MongoClient, ConnectionCheckOutStartedEvent } = require('mongodb');
const fs = require('fs');

const uri = "mongodb+srv://tom:pomu895@rawdatacluster.eeoha.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);

module.exports.connection = async function connection(dbFunction) {
    try {
        await client.connect();
        return await dbFunction(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

module.exports.getDB = async function downloadDB(client, dbName) {
    const path = '../data/' + dbName + '.json';
    const rawCloud = client.db(dbName).collection("cloud");
    const items = await rawCloud.find().toArray();
    const data = JSON.stringify(items[0])
    fs.writeFile(path, data, err => {
        if (err) {
            throw err
        }
    });
}

module.exports.getAllDB = async function downloadAllDataBases(client, databases) {
    await Promise.all(databases.map(async(db) => {
        await downloadDB(client, db.name);
    }))
}

module.exports.listDB = async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    return databasesList.databases.splice(0, databasesList.databases.length - 3);
}