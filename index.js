#!/usr/bin/env node

var http = require('http')

var ec2UserData = module.exports = function (opts, callback) {

	if (typeof (opts) === 'function') {
		callback = opts
		opts = undefined
	}

	opts = opts || {
		hypervisorUrl: 'http://169.254.169.254/latest/user-data/'
	}

	var error
		
	var request = http.get(opts.hypervisorUrl)

	request.once('response', onResponse)

	request.once('error', onError)

	function onError(err) {
		error = err
		callback(err)
	}

	function onResponse(res) {
		if (error) return // we already called the callback with an error

		var statusCode = res.statusCode;
		
		if (statusCode > 199 && statusCode < 300) {
			read()
		} else {
			onError(new Error('response status code was ' + statusCode))
		}

		var result = ''

		function read() {
			var line

			while (line = res.read())
				result += line

			res.once('readable', read)
		}

		res.once('readable', read)
		res.once('end', function () {
			if (error) {
				return // we already called the callback with an error
			}

			callback(null, result)
		})
	}	
}

if (require.main === module) {
	ec2UserData(function (err, data) {
		if (err) {
			console.error(err)
			return process.exit(1)
		}

		console.log(data)
	})
}
