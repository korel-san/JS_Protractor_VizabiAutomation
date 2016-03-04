exports.config = {
	
	framework: 'jasmine2',
	
	sauceUser: '',
	sauceKey: '',

	specs: ['Vizabi_Web_Core_Interaction.js'],


  capabilities: {
	 'browserName': 'chrome',
//	 'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
	 'screenResolution': '1280x800',
	 'name': 'Chrome',
	 'tags': 'Vizabi-DesktopWeb',
	 'build': 'v0.12.8'
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
	
      allureReport: {
        resultsDir: 'allure-results'
      }	
  }
}
