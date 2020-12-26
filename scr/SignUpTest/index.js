const { Builder, By, until } = require('selenium-webdriver');
const XLSX = require('xlsx');

async function SignUpOnBrowser(browserName, filePath) {
	const workbook = XLSX.readFile(filePath);
	const sheet_name_list = workbook.SheetNames;
	const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
	for (const element of xlData) {
		const driver = await new Builder().forBrowser(browserName).build();
		try {
			await driver.get('http://localhost/mantisbt-2.24.2/signup_page.php');
			await driver.findElement(By.name('username')).sendKeys(element.username);
			await driver.findElement(By.name('email')).sendKeys(element.username + '@localhost');
			await driver.findElement(By.css('input[type="submit"]')).click();
			await driver.wait(until.elementsLocated(By.css('body')));
		} finally {
			await driver.quit();
		}
	}
}

module.exports.SignUpOnBrowser = SignUpOnBrowser;
