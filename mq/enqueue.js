#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

module.exports = {
	enqueueDump: function(req, res, next) {
		amqp.connect('amqp://localhost', function(err, conn) {
			conn.createChannel(function(err,ch) {
				var queueName = 'dump';

				ch.assertQueue(queueName, {durable: false});

				// Client IP 가져옴
        			var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        			//(IPv6 to IPv4 format)
        			ip = ip.split(':');
				req.body.device_info.ip = ip[ip.length-1];
				//console.log(req.body);

				ch.sendToQueue(queueName, new Buffer(JSON.stringify(req.body)));
				console.log("enqueue dump!");
				res.writeHead(200, {'Content-Type': 'application/json'});
				res.end('{"msg": "complete"}');
			});
			//setTimeout(function() { conn.close(); process.exit(0)}, 500);
		});
	}
};
