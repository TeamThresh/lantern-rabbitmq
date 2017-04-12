#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

module.exports = {
	enqueueDump: function(req, res, next) {
		amqp.connect('amqp://localhost', function(err, conn) {
			conn.createChannel(function(err,ch) {
				var queueName = 'dump';

				ch.assertQueue(queueName, {durable: false});
				ch.sendToQueue(queueName, new Buffer(JSON.stringify(req.body)));
				console.log("enqueue dump!");
				res.writeHead(200, {'Content-Type': 'application/json'});
				res.end('{"msg": "complete"}');
			});
			//setTimeout(function() { conn.close(); process.exit(0)}, 500);
		});
	}
};
