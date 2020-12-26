const { SignUpOnBrowser } = require('./scr/SignUpTest');
const { ChangePermissions } = require('./scr/ChangePermissionsTest');

// run: node index <<test name>> <<browser name>>

if (process.argv[2] === 'test1') {
	SignUpOnBrowser(process.argv[3], './testdata.xlsx');
} else if (process.argv[2] === 'test2') {
	ChangePermissions(process.argv[3], './testdata.xlsx');
}
