const chalk = require('chalk')
const templates = require('../templates.json')

const validateTemplateName = (templateName) => {
	const templateData = templates.find(
		(template) => template.name === templateName
	)

	if (!templateData) {
		console.log(
			chalk.red(`ERROR: Template with name "${templateName}" not found`)
		)
		process.exit(1)
	}
}

module.exports = validateTemplateName
