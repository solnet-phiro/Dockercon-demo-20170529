var express = require('express');
var os = require('os');
var router = express.Router();
var mysql = require('mysql');


var ifaces = os.networkInterfaces();
var networks = "";
var records = -1;
Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }

        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            console.log(ifname + ':' + alias, iface.address);
            networks += ifname + ":" + alias + " - " + iface.address + "\n";
        } else {
            // this interface has only one ipv4 adress
            console.log(ifname, iface.address);
            networks += ifname + " - " + iface.address + "\n";
        }
        ++alias;
    });
});

var connection = mysql.createConnection({
    host: '10.0.0.3',
    user: 'root',
    password: 'secret',
    database: 'information_schema'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        records = err.stack;
        return;
    }

    console.log('connected as id ' + connection.threadId);
    connection.query("SELECT * FROM GLOBAL_VARIABLES"), [], function (error, results, fields) {
        records = results.count;
    }

});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express',
        hostname: os.hostname(),
        ipaddress: networks,
        numberRecords: records
    });
});

module.exports = router;
