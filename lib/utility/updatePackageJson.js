const fs = require('fs')
const path = require('path')

const updatePackageJson = ({ projectName, projectPath }) => {
	const packageJsonPath = path.join(projectPath, 'package.json')
	const packageJsonData = fs.readFileSync(packageJsonPath)
	const packageJson = JSON.parse(packageJsonData.toString())
	const newPackageJson = {
		name: projectName,
		version: '0.0.1',
		private: true,
		description: '',
		repository: '',
		author: 'Intouch Group',
		license: 'UNLICENSED',
	}
	Object.entries(packageJson).forEach(
		([key, value]) =>
			!(key in newPackageJson) && (newPackageJson[key] = value)
	)
	fs.writeFileSync(
		packageJsonPath,
		JSON.stringify(newPackageJson, null, '\t')
	)
}

module.exports = updatePackageJson
