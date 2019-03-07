# Instructions
---------------------------

### Project setup

1. Install Node.js (LTS version) at https://nodejs.org/en/download/
2. Clone project
3. Checkout *development branch
4. Install global and project dependencies

```shell
    npm install --global gulp-cli karma-cli webpack-dev-server http-serve live-server rimraf npm-check-updates sort-package-json
    npm install
```

5. Run the project in either development, testing or release mode
- run `gulp build` to run a default build
- run `gulp watch` to run a development build in watch mode (Will automatically open http://localhost:7070/)
- run `gulp test` to run unit tests
- run `gulp test:watch` to run unit tests in watch mode (Open manually http://localhost:9876/)
- run `gulp test:ci` to run unit tests in CI mode (Single run. Headless browser)
- run `gulp release` to bundle and build application artifacts

### Developer Tools

- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- [React Developer](Tools: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Postman Interceptor](https://chrome.google.com/webstore/detail/postman-interceptor/aicmkgpgakddgnaphhhpliifpcfhicfo)

### Useful links

- [Font Awesome 4.7](https://fontawesome.com/v4.7.0/icons/)
