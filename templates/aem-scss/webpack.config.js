const { build } = require('@intouchg/tarot')
const { name } = require('./package.json')

module.exports = build({
    entries: {
        [name]: 'styles/main.scss',
        home: 'styles/pages/home.scss',
    },
})