var url   = require('url');
var http  = require('http');
var https = require('https');

function tstamp() {
	return Math.round(Date.now() / 1000);
}

function winTimestamp() {
	var unixtimestamp = tstamp();
	return ((unixtimestamp + 11644477200) * 10000000);
}

function objSize(obj) {
	var size = 0;

	for(var key in obj) {
		if(obj.hasOwnProperty(key)) {
			++size;
		}
	}

	return size;
}

function toArray(iterable) {
	var arr = [];

	for(var i = 0, len = iterable.length; i < len; i++) {
		arr.push(iterable[i]);
	}

	return arr;
}

var toBuffer = function(arrayBuffer) {
    var buffer = new Buffer(arrayBuffer.byteLength);
    var view = new Uint8Array(arrayBuffer);
    for (var i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i];
    }
    return buffer;
};

var toArrayBuffer = function(buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
};

function extend(dest) {
	var args   = toArray(arguments),
		target = args.shift();

	for(var i = 0, len = args.length, source; i < len; i++) {
		source = args[i];

		for(var key in source) {
			if(source.hasOwnProperty(key)) {
				target[key] = source[key];
			}
		}
	}

	return target;
}

function fetch(target, callback) {
	var protocol = url.parse(target).protocol === 'https:' ? https : http;

	protocol.get(target, function(res) {
		var buffers = [];

		res.on('data', function(buf) {
			buffers.push(buf);
		});

		res.on('end', function() {
			callback(false, Buffer.concat(buffers));
		});
	}).on('error', function(e) {
		callback(e);
	});
}

function isWindows() {
	return /^win/.test(process.platform);;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.tstamp = tstamp;
exports.winTimestamp = winTimestamp;
exports.objSize = objSize;
exports.toBuffer = toBuffer;
exports.toArrayBuffer = toArrayBuffer;
exports.extend = extend;
exports.fetch = fetch;
exports.isWindows = isWindows;
exports.getRandomInt = getRandomInt;
