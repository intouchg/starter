const chalk = require('chalk')
const inquirer = require('inquirer')
const { Searcher } = require('fast-fuzzy')
const autocomplete = require('inquirer-autocomplete-prompt')
const templates = require('../templates.json')

inquirer.registerPrompt('autocomplete', autocomplete)

const templatesSearchData = templates.map((template) => ({
	...template,
	searchTerm: `${template.name} ${template.description}`,
}))

const fuzzySearch = new Searcher(
	templatesSearchData,
	{ keySelector: (template) => template.searchTerm },
)

const searchTemplates = (answers, input) => {
	input = input || ''
	const searchResults = input ? fuzzySearch.search(input) : templates
	return [
		new inquirer.Separator(' '),
		...searchResults.map(({ name, description }) => ({
			name: `${chalk.green(name)}\n  ${description}\n`,
			value: name,
		}))
	]
}

const promptForTemplateName = async () => {
	console.log(`INFO: There are ${chalk.cyan(`${templates.length} templates`)} available\n`)

	return await inquirer.prompt([
		{
			type: 'autocomplete',
			name: 'templateName',
			message: 'Which template do you want to use?',
			pageSize: 12,
			loop: false,
			prefix: ' ',
			emptyText: '\n  No results...',
			searchText: '\n ',
			source: searchTemplates,
		},
	])
}

module.exports = promptForTemplateName