const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

const fileUnderTest = 'file://' + __dirname.replace(/ /g, '%20') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
console.log(fileUnderTest);
    console.log("🔧 Bygger Firefox-drivrutin");
    driver = await new Builder().forBrowser('firefox').build();
    console.log("🔧 Navigerar till index.html");
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual("n/a");
});

describe('Clicking "Pusha till stacken"', () => {
    it('should open a prompt box', async () => {
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("Bananer");
        await alert.accept();
    });
});

// Nytt test
describe('Clicking "Poppa stacken!"', () => {
    it('should return the value on the top of the stack', async () => {       
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("Krokofanter");
        await alert.accept();

        let pop = await driver.findElement(By.id('pop'));
        await pop.click();
        let stack = await driver.findElement(By.id('top_of_stack')).getText();
        expect(stack).toEqual("Elefant");  //Medvetet fel
    });
});