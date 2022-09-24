// const { tab } = require("@testing-library/user-event/dist/tab");

module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ['plugin:react/recommended', 'standard'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['react'],
	rules: {
		indent: ['error', 'tab'],
		quotes: ['error', 'single', { allowTemplateLiterals: true }],
		'space-before-function-paren': ['error', 'never'],
		'multiline-ternary': ['error', 'never'],
		'no-tabs': ['error', { allowIndentationTabs: true }]
	}
}