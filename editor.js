import React from 'react'
import debounce from 'lodash.debounce';
import ace from 'ace-builds/src-noconflict/ace';
import vim from 'ace-builds/src-noconflict/keybinding-vim';
import glsl from 'ace-builds/src-noconflict/mode-glsl';

import './spectral-glow';

class FathomEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = debounce(this.onChange.bind(this), 500);
    this.defaultFrag = props.frag;
  }

  componentDidMount() {
    const editor = ace.edit('editor');
    editor.setKeyboardHandler(vim.handler);
    editor.setTheme('ace/theme/spectral_glow');
    editor.session.setOptions({
      mode: new glsl.Mode(),
      tabSize: 2,
      useSoftTabs: true,
    });
    editor.renderer.setOptions({
      showGutter: false,
      fontSize: 14,
      fontFamily: 'IBM Plex Mono',
    });
    editor.session.on('change', this.onChange);

    this.editor = editor;
  }

  onChange() {
    const { updateFrag } = this.props;
    updateFrag(this.editor.getValue());
  }

  render() {
    return (
      <div className="fathom-editor-container">
        <pre id="editor" className="fathom-editor">{this.defaultFrag}</pre>
      </div>
    );
  }
}

export default FathomEditor
