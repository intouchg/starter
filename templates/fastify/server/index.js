const path = require('path')

require('./env')
const { API_URL } = process.env

if (!API_URL) {
	throw Error(
		'API_URL was undefined, .env files may not have been properly configured or loaded'
	)
}

const fastify = require('fastify')({ logger: { level: 'debug' } })

fastify
	.register(require('fastify-http-proxy'), {
		prefix: '/api',
		upstream: API_URL + '/api',
		undici: {
			// https://github.com/fastify/fastify-http-proxy/issues/136
			// https://github.com/nodejs/undici/issues/581
			strictContentLength: false,
		},
	})
	.register(require('fastify-static'), {
		root: path.join(__dirname, 'public'),
		wildcard: false,
		preCompressed: true,
	})

if (process.env.NODE_ENV === 'development') {
	fastify.register(require('@intouchg/fastify-webpack-hot'), {
		configPath: path.resolve(__dirname, '..', 'webpack.config.js'),
	})
}

fastify.get('/*', (request, reply) => reply.sendFile('index.html'))

fastify.listen(process.env.port || 3000, (error, address) => {
	if (error) throw error
	console.log('Fastify server is listening on ' + address)
})
