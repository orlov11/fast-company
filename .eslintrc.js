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
		indent: 'off',
		quotes: [
			'error',
			'single',
			{ allowTemplateLiterals: true, avoidEscape: true }
		],
		'space-before-function-paren': [
			'error',
			{ anonymous: 'always', named: 'never' }
		],
		'multiline-ternary': 'off',
		'no-tabs': 'off',
		'no-unused-vars': 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'no-unused-expressions': 'off',
		'no-labels': 'off'
	}
}
