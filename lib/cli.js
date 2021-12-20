#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { program } = require('commander')
const validateProjectName = require('./utility/validateProjectName')
const validatePackageVersion = require('./utility/validatePackageVersion')
const validateProjectPath = require('./utility/validateProjectPath')
const validateTemplateName = require('./utility/validateTemplateName')
const promptForTemplateName = require('./utility/promptForTemplateName')
const downloadAndExtractTemplate = require('./utility/downloadAndExtractTemplate')
const updatePackageJson = require('./utility/updatePackageJson')
const updateReadme = require('./utility/updateReadme')
const getTemplateConfig = require('./utility/getTemplateConfig')
const installDependencies = require('./utility/installDependencies')

program
	.name('npx @intouchg/starter')
	.argument('<project-name>', 'New project name')
	.option('-t, --template <name>', 'Template name to use')
	.option('-b, --branch <name>', 'Template git branch to use')
	.parse(process.argv)

const projectName = program.args[0]
const projectPath = path.join(process.cwd(), projectName)

validateProjectName(projectName)
validatePackageVersion()
validateProjectPath(projectPath)

const options = program.opts()

const createNewProject = async () => {
	const branch = options.branch || 'master'
	let templateName = options.template

	if (!templateName)
		templateName = (await promptForTemplateName()).templateName

	validateTemplateName(templateName)

	console.log(
		`INFO: Creating new project ${chalk.cyan(
			projectName
		)} with template ${chalk.cyan(templateName)} on branch ${chalk.cyan(
			branch
		)}`
	)

	fs.mkdirSync(projectPath)
	process.chdir(projectPath)

	const projectData = { projectName, projectPath }

	await downloadAndExtractTemplate(templateName, branch, projectData)

	console.log('INFO: Successfully downloaded and extracted template')

	updatePackageJson(projectData)
	updateReadme(projectData)

	console.log('INFO: Updated project package.json and readme.md')

	const { preinstall, postinstall } = getTemplateConfig(projectData)

	if (preinstall) {
		console.log('INFO: Starting template.js preinstall script')
		await preinstall(process, projectData)
		console.log('INFO: Completed template.js preinstall script')
	}

	installDependencies()

	if (postinstall) {
		console.log('INFO: Starting template.js postinstall script')
		await postinstall(process, projectData)
		console.log('INFO: Completed template.js postinstall script')
	}

	console.log(
		chalk.green(
			`\nSUCCESS: Created new project "${projectName}" at path ${projectPath}`
		)
	)
}

createNewProject()
