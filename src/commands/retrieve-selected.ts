import retrieve from './retrieve'
import * as vscode from 'vscode'

const isInContext = (uri: vscode.Uri) => /^.*\/src\/.*$/.test(uri.path)
const isFolder = (path: string) => !path.includes('/')

export default function retrieveSelected (uri: vscode.Uri, allUris: vscode.Uri[]) {
  if (allUris && allUris.length) {
    retrieve(allUris
      .filter(x => isInContext(x))
      .map(x => x.path.substring(x.path.lastIndexOf('src/') + 4))
      .map(x => isFolder(x) ? x + '/**/*' : x))
  } else if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document) {
    const fileName = vscode.window.activeTextEditor.document.fileName
    retrieve([fileName])
  }
}
