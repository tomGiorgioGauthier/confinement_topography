'use strict';

let db = require('./js/db');
const path = require('path');
const port = 8888;

let express = require('express');
let app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/js')));
app.use(express.static(path.join(__dirname, '/data')));
app.use('/stylesheets/', express.static(path.join(__dirname, '/stylesheets')));
app.use('/src/', express.static(path.join(__dirname, 'node_modules/three/src')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));

app.get('\/scan*', function(req, res) {
    let dbName = req.originalUrl.replace('/scan_', '');
    res.render(__dirname + '/pages/cloud_page', {
        dbName: dbName,
    });
});

app.get('/', async function(req, res) {
    let dbList = [];
    try {
        dbList = await db.connection(db.listDB);
        res.render(__dirname + '/pages/index', {
            dbList: dbList,
        });
    } catch (err) {
        console.log(err)
    }
});

app.listen(port);
console.log('listening on port ' + port);