// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "git-browse" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('git-browse.openInBrowser', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		openInBrowser()
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() { }

const regex = /(?:git@|https:\/\/)(github\.com|gitlab\.com|bitbucket\.org)[:\/]([a-zA-Z0-9_.\-]+\/[a-zA-Z0-9_.\-]+\.git)/;

function extractUrl(text) {
	const match = regex.exec(text);
	if (match) {
		const hostname = match[1];
		const repoPath = match[2];
		const httpsUrl = `https://${hostname}/${repoPath}`;
		return httpsUrl;
	} else {
		return null;
	}
}

async function openInBrowser() {
	const editor = vscode.window.activeTextEditor;
	const selection = editor.selection;
	const lineRange = editor.document.lineAt(selection.active.line).range
	const text = editor.document.getText(lineRange);

	const url = extractUrl(text)
	if (url) {
		vscode.env.openExternal(vscode.Uri.parse(url));
	}
	else {
		vscode.window.showInformationMessage('No Git URLs found.');
	}
}

module.exports = {
	extractUrl,
	activate,
	deactivate
}
