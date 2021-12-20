const fs = require('fs')
const path = require('path')

const updateReadme = ({ projectName, projectPath }) => {
	const readmePath = path.join(projectPath, 'readme.md')
	let readme = fs.readFileSync(readmePath).toString()
	readme = readme.replace('[PROJECT NAME]', projectName)
	fs.writeFileSync(readmePath, readme)
}

module.exports = updateReadme
