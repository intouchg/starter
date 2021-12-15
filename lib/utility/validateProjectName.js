const path = require('path')
const chalk = require('chalk')

const validateProjectName = (projectName) => {
	if (!projectName) {
		console.log(chalk.red(`ERROR: Must provide a name for your new project`))
		process.exit(1)
	}

	if (projectName !== path.basename(projectName)) {
		console.log(chalk.red(`ERROR: New project name cannot be a path, it must be a path.basename`))
		process.exit(1)
	}
}

module.exports = validateProjectName