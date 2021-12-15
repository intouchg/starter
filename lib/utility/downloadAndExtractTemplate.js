const { Stream } = require('stream')
const { promisify } = require('util')
const got = require('got')
const tar = require('tar')

const downloadAndExtractTemplate = (templateName, branch, { projectPath }) =>
	promisify(Stream.pipeline)(
		got.stream(`https://codeload.github.com/intouchg/starter/tar.gz/${branch}`),
		tar.extract(
			{ cwd: projectPath, strip: 3 },
			[ `starter-${branch}/templates/${templateName}` ]
		)
	)

module.exports = downloadAndExtractTemplate