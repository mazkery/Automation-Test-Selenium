const { Builder, By, Key, until } = require('selenium-webdriver');
const XLSX = require('xlsx');
async function ChangePermissions(browserName, filePath) {
	const workbook = await XLSX.readFile(filePath);
	const sheet_name_list = workbook.SheetNames;
	const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

	for (const element of xlData) {
		const driver = await new Builder().forBrowser(browserName).build();
		try {
			await driver.get('http://localhost/mantisbt-2.24.2');
			await driver.findElement(By.name('username')).sendKeys('administrator', Key.ENTER);
			const passwordField = await driver.wait(
				until.elementLocated(By.css('input[type="password"]'))
			);
			await passwordField.sendKeys('root', Key.ENTER);
			const manageLink = await driver.wait(
				until.elementLocated(By.css('li>a[href="/mantisbt-2.24.2/manage_overview_page.php"]'))
			);
			await manageLink.click();
			const manageUserLink = await driver.wait(
				until.elementLocated(By.css('li>a[href="/mantisbt-2.24.2/manage_user_page.php"]'))
			);
			await manageUserLink.click();
			await driver.findElement(By.linkText(element.username)).click();
			if (Number(element.username.slice(-1)) % 2 === 0) {
				await driver.findElement(By.css('#edit-access-level > option[value="70"]')).click();
			} else {
				await driver.findElement(By.css('#edit-access-level > option[value="55"]')).click();
			}
			await driver.findElement(By.css('input[value="Update User"]')).click();
			await driver.wait(until.elementsLocated(By.css('body')), 6000);
		} finally {
			await driver.quit();
		}
	}
}

module.exports.ChangePermissions = ChangePermissions;
