exports.config = {

	framework: 'jasmine2',

	sauceUser: process.env.SAUCE_ACCESS_USER || '',
	sauceKey: process.env.SAUCE_ACCESS_KEY || '',

	specs: ['../specs/**/*.js'],

  capabilities: {
	 'browserName': 'chrome',
//	 'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
	 'screenResolution': '1280x800',
	 'name': 'Chrome',
	 'tags': 'Vizabi-DesktopWeb',
	 'build': 'v0.12.8'
  },

  allureReport: {
    resultsDir: 'allure-results'
  },

  onPrepare: function() {
	var AllureReporter = require('jasmine-allure-reporter/index.js');

	jasmine.getEnv().addReporter(new AllureReporter());
	jasmine.getEnv().afterEach(function(done){
      browser.takeScreenshot().then(function (png) {
        allure.createAttachment('Screenshot', function () {
          return new Buffer(png, 'base64')
        }, 'image/png')();
        done();
      })
    });
  }
};
