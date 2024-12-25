// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

function countWords(text) {
  const words = text.match(/\b\w+\b/g);
  return words ? words.length : 0;
}

function countSpaces(text) {
  const spaces = text.match(/ /g); // Ищем пробелы
  return spaces ? spaces.length : 0;
}

function countPunctuation(text) {
  const punctuation = text.match(/[.,!?;:"'()\-]/g);
  return punctuation ? punctuation.length : 0;
}

function activate(context) {

  let characters = vscode.commands.registerCommand(
    "extension.countSelectedCharacters",
    function () {
      // Получаем активный редактор
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const selection = editor.selection;
        const text = editor.document.getText(selection);

        // Показываем количество символов
        vscode.window.showInformationMessage(
          `Выделено символов: ${text.length}`
        );
      } else {
        vscode.window.showWarningMessage("Нет активного редактора!");
      }
    }
  );

  let words = vscode.commands.registerCommand(
    "extension.countSelectedWords",
    function () {
      // Получаем активный редактор
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const selection = editor.selection;
        const text = editor.document.getText(selection);

        let count = countWords(text);

        // Показываем количество символов
        vscode.window.showInformationMessage(`Выделено слов: ${count}`);
      } else {
        vscode.window.showWarningMessage("Нет активного редактора!");
      }
    }
  );

  let spaces = vscode.commands.registerCommand(
    "extension.countSelectedSpaces",
    function () {
      // Получаем активный редактор
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const selection = editor.selection;
        const text = editor.document.getText(selection);

        let count = countSpaces(text);

        // Показываем количество символов
        vscode.window.showInformationMessage(`Выделено пробелов: ${count}`);
      } else {
        vscode.window.showWarningMessage("Нет активного редактора!");
      }
    }
  );

  let punct = vscode.commands.registerCommand(
    "extension.countSelectedPunctuations",
    function () {
      // Получаем активный редактор
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const selection = editor.selection;
        const text = editor.document.getText(selection);

        let count = countPunctuation(text);

        // Показываем количество символов
        vscode.window.showInformationMessage(`Выделено знаков: ${count}`);
      } else {
        vscode.window.showWarningMessage("Нет активного редактора!");
      }
    }
  );

  let properties = vscode.commands.registerCommand(
    "extension.countTextProperties",
    function () {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const selection = editor.selection;
        const text = editor.document.getText(selection);

        const wordCount = countWords(text);
        const spaceCount = countSpaces(text);
        const punctuationCount = countPunctuation(text);

        vscode.window.showInformationMessage(
          `Слова: ${wordCount}, Пробелы: ${spaceCount}, Знаки препинания: ${punctuationCount}`
        );
      } else {
        vscode.window.showWarningMessage("Нет активного редактора!");
      }
    }
  );

  context.subscriptions.push(characters);
  context.subscriptions.push(words);
  context.subscriptions.push(spaces);
  context.subscriptions.push(punct);
  context.subscriptions.push(properties);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
