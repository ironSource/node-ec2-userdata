var expect = require('chai').expect
var http = require('http')
var ec2UserData = require('./index')

describe('ec2-userdata', function () {
	var server
	var throwError
	var opts = { hypervisorUrl: 'http://localhost:9123/' }

	it('gets the data from the hypervisor url', function (done) {
		this.timeout(5000)

		ec2UserData(opts, function (err, data) {
			expect(err).to.be.null
			expect(data).to.equal('hi')
			done()
		})
	})

	it('throws errors', function (done) {
		throwError = true
		ec2UserData(opts, function (err, data) {
			expect(err).to.be.instanceOf(Error)
			done()
		})
	})

	beforeEach(function (done) {
		throwError = false
		server = http.createServer(function (req, res) {
			if (throwError) {
				res.statusCode = 500
				res.end()
			} else {				
				res.end('hi')	
			}
		})

		server.listen(9123, done)
	})

	afterEach(function (done) {
		server.close(done)
	})
})