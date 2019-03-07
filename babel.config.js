import supportedBrowsers from './supported-browsers';

export default {
    "babelrc": false,
    "presets": [
        ["env", {
            "debug": false,
            "modules": false,
            "useBuiltIns": true,
            "targets": {
                "browsers": supportedBrowsers
            }
        }],
        "react"
    ],
    "plugins": [
        "syntax-dynamic-import",
        ["transform-class-properties", { "spec": true }],
        "transform-object-rest-spread",
        "jsx-classname-transformer",
        "lodash"
    ]
};
