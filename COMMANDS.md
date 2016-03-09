For testing inside test/system folder of Allure-jasmine-reporter:

1) To start Selenium server:
```
# Windows
java -jar selenium-server-standalone-2.47.1.jar -Dwebdriver.chrome.driver=chromedriver.exe
# Linux
npm run selenium-server-standalone
```

2) Run protractor
```
# Local config
npm run e2e

# Sauce config
npm run e2e:sauce

# Browser Stack config
npm run e2e:bstack

# Custom config
./node_modules/.bin/protractor conf.js
```

3) To convert XML reports into HTML: mvn site -Dallure.results_pattern=allure-results

4) To access HTML reports via localhost:1234 use: mvn jetty:run -Djetty.port=1234