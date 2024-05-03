const assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
// const myExtension = require('../extension');

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Extract Github SSH URL', () => {
		const { extractUrl } = require('../extension');
		const text = "Here is some Git repository SSH URL: git@github.com:username/repo.git : Let see if this is extracted";
		assert.strictEqual(extractUrl(text), "https://github.com/username/repo.git");
	});

	test('Extract Gitlab SSH URL', () => {
		const { extractUrl } = require('../extension');
		const text = "Here is some Git repository SSH URL: git@gitlab.com:username/repo.git : Let see if this is extracted";
		assert.strictEqual(extractUrl(text), "https://gitlab.com/username/repo.git");
	});

	test('Extract Guthub HTTPS URL', () => {
		const { extractUrl } = require('../extension');
		const text = "Here is some Git repository HTTPS URL: https://github.com/username/repo.git : Let see if this is extracted";
		assert.strictEqual(extractUrl(text), "https://github.com/username/repo.git");
	});

	test('Invalid URL', () => {
		const { extractUrl } = require('../extension');
		const text = "Here is some Git repository SSH URL: github.org:username/repo.git : Let see if this is extracted";
		assert.strictEqual(extractUrl(text), null);
	});
});