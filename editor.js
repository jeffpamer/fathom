import React from 'react'
import debounce from 'lodash.debounce';
import ace from 'ace-builds/src-noconflict/ace';
import vim from 'ace-builds/src-noconflict/keybinding-vim';
import glsl from 'ace-builds/src-noconflict/mode-glsl';

import './spectral-glow';
import InspectralViewer from './viewer';

const DEFAULT_FRAG =
`#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  gl_FragColor = vec4(st.x * abs(sin(u_time * 0.25)), (st.y * 0.5 + st.x * 0.5) * abs(sin(u_time * 0.1)), st.y * abs(sin(u_time * 0.33)), 1.0);
}`;

class InspectralEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { frag: DEFAULT_FRAG };

    this.onChange = debounce(this.onChange.bind(this), 500);
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

    // EVENT LISTENERS
    editor.session.on('change', this.onChange);

    this.editor = editor;
  }

  onChange() {
    this.setState({ frag: this.editor.getValue() });
  }

  render() {
    const { frag } = this.state;

    return (
      <div className="inspectral-editor-container">
        <pre id="editor" className="inspectral-editor">{DEFAULT_FRAG}</pre>
        <InspectralViewer frag={frag} />
      </div>
    );
  }
}

export default InspectralEditor
