'use babel';

import TestAtomPackageView from './test-atom-package-view';
import { CompositeDisposable } from 'atom';

export default {

  testAtomPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.testAtomPackageView = new TestAtomPackageView(state.testAtomPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.testAtomPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'test-atom-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.testAtomPackageView.destroy();
  },

  serialize() {
    return {
      testAtomPackageViewState: this.testAtomPackageView.serialize()
    };
  },

  toggle() {
    console.log('TestAtomPackage was toggled!');
    let editor
     if (editor = atom.workspace.getActiveTextEditor()) {
       let selection = editor.getSelectedText()
       let reversed = selection.split('').reverse().join('')
       editor.insertText(reversed)
     }
  }

};
