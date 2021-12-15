# @intouchg/starter

CLI for creating new apps with the [Intouch Design System](https://ids.intouchg.co/)

## Usage

Creates a new app in a newly created directory `project-name`:

```sh
npx @intouchg/starter <project-name>
```

### Options

* `-t`, `--template <name>` - The template to bootstrap the app with. You can use any template name [in the repo](https://github.com/intouchg/starter/tree/master/templates). When no template name is passed you will be prompted with a searchable list of all templates.
* `-b`, `--branch <name>` - The template repo branch name to use. Defaults to master.

## Creating a template

Create a new directory in the `templates` directory. The name of the new directory will be the name of the template.

As long as the template requirements are fulfilled, you can put whatever you want in the template directory. Templates are validated with this project's npm `prepare` script.

Templates also support an optional `template.js` file in the root of the template directory. See more about the template requirements and optional `template.js` file below.

### Template requirements

* Must contain a readme.md file in the template root which contains a string `[PROJECT NAME]` that will be replaced when boostrapping the app
* Must contain a package.json file in the template root which contains a `"description"` property that will be displayed alongside the name of the template in the CLI
* The template package.json file may include any other properties. When using the CLI to bootstrap a new project, all properties will be carried over into the new project package.json file - except the following properties, which are rewritten: `name`, `version`, `private`, `description`, `repository`, `author`, and `license`

### Optional `template.js`

The CLI supports an optional `template.js` file in the root of a template directory that allows for pre- and post-processing during dependency installation. The `template.js` file is only used for template install operations during the bootstrapping process, and is intentionally not included in the new project directory.

```js
// templates/my-template/template.js
module.exports = {
	preinstall: async (
		process,
		{ projectName, projectPath },
	) => {
		// Runs after the template has been downloaded to the new
		// projectPath but before dependencies are installed
	},
	postinstall: async (
		process,
		{ projectName, projectPath },
	) => {
		// Runs after dependencies are installed
	},
}
```

### Publishing new templates

1. Add the new template to the @intouchg/starter github repo
2. Run the `npm prepare` script and commit the generated `lib/templates.json` to the repo
3. Publish a new version of the @intouchg/starter package

## Limitations

* Currently assumes using `yarn` and `package.json`
* Only supports using templates published to the @intouchg/starter github repo

## Prior Art

* [create-next-app](https://github.com/vercel/next.js/tree/master/packages/create-next-app)