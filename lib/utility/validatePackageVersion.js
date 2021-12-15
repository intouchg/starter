const { spawnSync } = require('child_process')
const semver = require('semver')
const chalk = require('chalk')
const pkg = require('../../package.json')

const validatePackageVersion = () => {
	const childProcess = spawnSync(
		'npm',
		'view @intouchg/starter@latest version'.split(' '),
		{ shell: true, cwd: process.cwd() },
	)

	const latestVersion = childProcess.stdout.toString().slice(0, -1)

	if (childProcess.status !== 0 || !semver.valid(latestVersion))
		return console.log(chalk.red('ERROR: Failed to determine latest version of @intouchg/starter'))

	const versionDiff = semver.rcompare(pkg.version, latestVersion)

	if (versionDiff === 1)
		console.log(chalk.red(`WARNING: Detected outdated version of @intouchg/starter, running ${pkg.version} but @latest is ${latestVersion}`))

	if (versionDiff === -1)
		console.log(chalk.yellow(`WARNING: Detected experimental version of @intouchg/starter, running ${pkg.version} but @latest is ${latestVersion}`))
}

module.exports = validatePackageVersion