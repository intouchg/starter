const fs = require('fs')
const chalk = require('chalk')

const validateProjectPath = (projectPath) => {
	if (!fs.existsSync(projectPath)) return
	if (fs.lstatSync(projectPath).isDirectory()) {
		const files = fs.readdirSync(projectPath)
		if (!files.length) return
		console.log(
			chalk.red(
				`ERROR: Non-empty directory already exists at new project path ${projectPath}`
			)
		)
		process.exit(1)
	} else {
		console.log(
			chalk.red(
				`ERROR: File already exists at new project path ${projectPath}`
			)
		)
		process.exit(1)
	}
}

module.exports = validateProjectPath
