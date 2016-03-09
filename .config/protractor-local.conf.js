'use strict';

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: ['../specs/**/*.js'],
  exclude: [],

  framework: 'jasmine2',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000,
    print: function () {
    }
  },
  //directConnect: true,

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['show-fps-counter=true']
    }
  },

  allureReport: {
    resultsDir: 'allure-results'
  },

  reporter: ['spec'],

  onPrepare: function () {
    if (process.env.JASMINE_REPORTER === 'allure') {
      var AllureReporter = require('jasmine-allure-reporter/index.js');

      jasmine.getEnv().addReporter(new AllureReporter());
      jasmine.getEnv().afterEach(function (done) {
        browser.takeScreenshot().then(function (png) {
          allure.createAttachment('Screenshot', function () {
            return new Buffer(png, 'base64')
          }, 'image/png')();
          done();
        })
      });
      return;
    }

    var SpecReporter = require('jasmine-spec-reporter');
    // add jasmine spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
  }
};