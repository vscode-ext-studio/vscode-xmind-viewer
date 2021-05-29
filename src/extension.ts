import * as vscode from 'vscode';
import { XmindViewerProvider } from './xmindViewerProvider';

export function activate(context: vscode.ExtensionContext) {

console.log('active')
	const option = { webviewOptions: { retainContextWhenHidden: true, enableFindWidget: true } };
	vscode.window.registerCustomEditorProvider("cweijan.xmindViewer", new XmindViewerProvider(context), option);

}

export function deactivate() { }
