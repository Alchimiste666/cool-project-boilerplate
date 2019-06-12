import path from 'path';
import gulp from 'gulp';
import karma from 'karma';
import yargs from 'yargs';
import zip from 'gulp-zip';
import bump from 'gulp-bump';
import shell from 'gulp-shell';
import babel from 'gulp-babel';
import rimraf from 'rimraf-promise';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

import projectPackage from './package.json';

import babelConfig from './.babelrc';
import webpackReleaseConfig from './webpack.release-config.babel.js';

const args = yargs
    .option('releaseType', { type: 'string', default: 'minor' })
    .argv;

function runTests(executionMode = 'CI') {
    return new Promise(resolve => {

        const karmaDevConfig = path.resolve(__dirname, './karma.dev-conf.js')
        const karmaCiConfig = path.resolve(__dirname, './karma.ci-conf.js');

        let karmaConfig = null;

        switch (executionMode) {

            case 'TEST':
                karmaConfig = { configFile: karmaCiConfig, browsers: ['Chrome', 'Firefox'], singleRun: true };
                break;

            case 'CI':
                karmaConfig = { configFile: karmaCiConfig, browsers: ['ChromeHeadless'], singleRun: true };
                break;

            case 'DEV':
                karmaConfig = { configFile: karmaDevConfig };
                break;
        }

        const karmaCallback = exitCode => {

            console.log('Karma test run complete!');

            if (exitCode === 0) {
                resolve();
            } else {
                console.error(`Karma tests failed with status code ${exitCode}`);
                process.exit(exitCode);
            }
        };

        new karma.Server(karmaConfig, karmaCallback).start();
    });
}

function buildApplication(target) {
    // File name and versioning
    const zipFilename = `${projectPackage.name}-${projectPackage.version}-${target}.zip`;

    return new Promise(resolve =>
        webpackStream(webpackReleaseConfig(target), webpack)
            .pipe(gulp.dest('dist/' + target))
            .pipe(zip(zipFilename))
            .pipe(gulp.dest('release'))
            .on('end', resolve)
    );
}

gulp.task('clean', () => Promise.all([
    rimraf('build'),
    rimraf('dist'),
    rimraf('release'),
    rimraf('coverage')
]));

gulp.task('test', gulp.series('clean', () => runTests('TEST')));

gulp.task('test:ci', gulp.series('clean', () => runTests('CI')));

gulp.task('test:watch', gulp.series('clean', () => runTests('DEV')));

gulp.task('watch', shell.task('webpack-dev-server --config ./webpack.development-config.babel.js'));

gulp.task('build', gulp.series('clean', () =>
    gulp.src('src/**/*.js')
        .pipe(babel(babelConfig))
        .pipe(gulp.dest('build'))
));

gulp.task('release', gulp.series('clean', () =>
    runTests()
        .then(() => buildApplication('DEV'))
        .then(() => buildApplication('TEST'))
        .then(() => buildApplication('PROD'))
));

/*
  Usage
  gulp bump --release-type [RELEASE_TYPE]
  Possible values [patch, minor, major]
*/
gulp.task('bump', () => {
    gulp.src('./package.json')
        .pipe(bump({ type: args.releaseType }))
        .pipe(gulp.dest('./'));
});
