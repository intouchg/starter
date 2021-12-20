#!/usr/bin/env node

/**
 * Validates templates and saves template metadata to ./lib/templates.json
 */

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const packageKeyBlacklist = [
	'name',
	'version',
	'private',
	'repository',
	'author',
	'license',
]

let validationErrors = ''
const addValidationError = (error) =>
	(validationErrors += `${validationErrors ? '\n' : ''}${error}`)

const validateTemplate = (templateName, templatePath) => {
	const packageJsonPath = path.join(templatePath, 'package.json')
	const readmePath = path.join(templatePath, 'readme.md')
	const yarnLockPath = path.join(templatePath, 'yarn.lock')

	let errorList = ''
	const addErrorListItem = (error) =>
		(errorList += `${errorList ? '\n' : ''}  ${error}`)

	if (!fs.existsSync(packageJsonPath))
		addErrorListItem(`* package.json must exist`)

	if (!fs.existsSync(readmePath)) addErrorListItem(`* readme.md must exist`)

	if (!fs.existsSync(yarnLockPath)) addErrorListItem(`* yarn.lock must exist`)

	const packageJson = require(packageJsonPath)
	const readme = fs.readFileSync(readmePath).toString()

	if (!packageJson.description)
		addErrorListItem(
			'* package.json must contain a "description" property that describes your template'
		)

	packageKeyBlacklist.forEach((key) => {
		if (packageJson[key] === undefined) return
		addErrorListItem(`* package.json must not contain property "${key}"`)
	})

	if (!readme.includes('[PROJECT NAME]'))
		addErrorListItem('* readme.md must contain "[PROJECT NAME]"')

	if (errorList)
		addValidationError(
			`\nERROR: Invalid template "${templateName}" at path ${templatePath}\n${errorList}`
		)

	return packageJson
}

console.log(
	'INFO: Validating @intouchg/starter templates and generating metadata'
)
console.log(
	'INFO: Read more about template requirements here: https://github.com/intouchg/starter#template-requirements'
)

const templatesPath = path.join(__dirname, 'templates')

const templates = fs
	.readdirSync(templatesPath, { withFileTypes: true })
	.filter((dirent) => dirent.isDirectory())
	.map(({ name }) => {
		const pkg = validateTemplate(name, path.join(templatesPath, name))
		return { name, description: pkg.description }
	})

if (validationErrors) {
	console.log(
		chalk.red(
			`ERROR: Failed to generate templates.json\n${validationErrors}\n`
		)
	)
	process.exit(1)
}

const defaultIndex = templates.findIndex(
	(template) => template.name === 'default'
)
const orderedTemplates = templates.filter(
	(template, index) => index !== defaultIndex
)
orderedTemplates.unshift(templates[defaultIndex])

const jsonPath = path.join(__dirname, 'lib', 'templates.json')

fs.writeFileSync(jsonPath, JSON.stringify(orderedTemplates, null, '\t'))
