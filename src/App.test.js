const puppeteer = require('puppeteer')

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

let browser, page;
const appUrlBase = 'http://localhost:8080/';

beforeAll(async () => {
    browser = await puppeteer.launch(
        {
            headless: false,
            slowMo: 40,
            args: ['--window-size=1920,1080']
        }
    )
    page = await browser.newPage()
})

describe('Postings list', () => {
    test('List displays filtered elements by country and department', async () => {
        await page.goto(appUrlBase)
        await page.waitForSelector('#country')
        await page.click('#country')
        await page.type('#country', 'poland')
        await page.click('#department')
        await page.type('#department', 'engineering')
        await page.click('#btn-search')
        await delay(1000)
        await page.click('#country')
        await page.evaluate(() => { document.querySelector('#country').value = '' })
        await page.type('#country', 'germany')
        await page.click('#btn-search')
    }, 20000)
    test('Opens the first item on the list', async () => {
        await delay(1000)
        await page.waitForSelector('.jobs-list .row:first-of-type .job')
        await page.hover('.jobs-list .row:first-of-type .job')
        await delay(400)
        await page.click('.jobs-list .row:first-of-type .job')
        await delay(2000)
        await page.waitForSelector('.backward')
        await page.hover('.backward')
        await delay(400)
        await page.click('.backward')
        await delay(2000)
    }, 16000)
    test('test 404 not found page', async () => {
        await page.goto(appUrlBase + 'about')
        await delay(2000)
        page.goBack();
        await delay(2000)
    }, 10000)
})

afterAll(() => {
    browser.close()
})