// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "badge-viewer" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('badge-viewer.view-badges', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		const panel = vscode.window.createWebviewPanel(
			'badgeView',
			'Badge View',
			vscode.ViewColumn.One,
			{}
		  );
	
		  // And set its HTML content
		  panel.webview.html = getWebviewContent();
	});

	context.subscriptions.push(disposable);
}

function getWebviewContent() {
	const badgeLinks: any = vscode.workspace.getConfiguration("badge-viewer").get("badge-links");
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Badge View</title>
  </head>
  <body>
	<h1>Badge View</h1>
	  ${badgeLinks.length && badgeLinks.map((link: string[]) => `
	  <div>	  
	  	<h2>${link[0]}</h2>
	  	<img src="${link[1]}" />
	  </div>
	  `).join('') || "Go to settings to add some badge links!"}
  </body>
  </html>`;
  }

// this method is called when your extension is deactivated
export function deactivate() {}
