module.exports = {
	presets: [
		["@babel/preset-env", {
			debug: false,
			modules: false,
			useBuiltIns: "entry",
			corejs: 3
		}],
		"@babel/preset-react"
	],
	plugins: [
		["@babel/plugin-proposal-class-properties", { "spec": true }],
		"@babel/plugin-syntax-dynamic-import",
		"react-html-attrs",
		"lodash"
	],
	overrides: [{
		test: "./*.js", // Project configuration files
		presets: [
			["@babel/preset-env", {
				targets: {
					node: "current"
				}
			}]
		]
	}],
}
