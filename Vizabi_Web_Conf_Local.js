exports.config = {
  framework: 'jasmine2',
  seleniumAddress: 'http://localhost:4444/wd/hub',

	specs: ['Vizabi_Web_Core_Interaction.js'],


  capabilities: {
    'browserName': 'chrome'
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