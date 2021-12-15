const path = require('path')
const fs = require('fs')

const envFilename = '.env.' + (process.env.NODE_ENV || 'production')
let envFilepath

const parentEnvPath = path.resolve(__dirname, '..', envFilename)
const siblingEnvPath = path.resolve(__dirname, envFilename)

if (fs.existsSync(siblingEnvPath)) {
	envFilepath = siblingEnvPath
} else if (fs.existsSync(parentEnvPath)) {
	envFilepath = parentEnvPath
} else {
	throw Error('Missing .env config files')
}

require('dotenv').config({ path: envFilepath })
