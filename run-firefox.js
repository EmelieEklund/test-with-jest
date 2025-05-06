const { Builder } = require('selenium-webdriver');
require('geckodriver');

(async () => {
  let driver = await new Builder().forBrowser('firefox').build();
  await driver.get('https://example.com');
  await driver.sleep(3000); 
  await driver.quit();
})();
