const { spawnSync } = require('child_process')
const chalk = require('chalk')

const installDependencies = () => {
	console.log('INFO: Installing dependencies from package.json\n')

	const { status } = spawnSync(
		'yarn',
		[],
		{ shell: true, cwd: process.cwd(), stdio: 'inherit' },
	)

	if (status !== 0)
		console.log(chalk.red('\nERROR: Failed to install dependencies from package.json'))
}

module.exports = installDependencies