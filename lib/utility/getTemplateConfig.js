const fs = require('fs')
const path = require('path')

const getTemplateConfig = ({ projectPath }) => {
	const configPath = path.join(projectPath, 'template.js')

	if (fs.existsSync(configPath)) return require(configPath)
	
	console.log('INFO: No template.js config file, skipping config process')
	return {}
}

module.exports = getTemplateConfig