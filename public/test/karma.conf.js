// Karma configuration
// Generated on Thu Jul 23 2015 18:10:48 GMT+0300 (EEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-ng-html2js-preprocessor'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './js/app/**/*.html' : ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      //stripPrefix: '../',
      moduleName: 'templates'
    },

    // list of files / patterns to load in the browser
    files: [
      '../bower_components/angular/angular.min.js',
      '../bower_components/angular-sanitize/angular-sanitize.min.js',
      '../bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.min.js',
      '../bower_components/moment/min/moment.min.js',
      '../bower_components/angular-ui-select/dist/select.js',
      '../bower_components/angular-mocks/angular-mocks.js',
      './js/app/**/*.js',
      './js/app/**/*.html',
      './test/spec/*.js',
    ],


    // list of files to exclude
    exclude: [
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'/*, 'Chrome'*/],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
