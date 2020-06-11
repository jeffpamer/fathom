import React from 'react';
import ReactDOM from 'react-dom';

import '@ibm/plex/scss/ibm-plex.scss'
import './index.css';

import FathomEditor from './editor';
import FathomViewer from './viewer';
import ControlPanel from './controlPanel';

const DEFAULT_FRAG =
`#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  gl_FragColor = vec4(st.x * abs(sin(u_time * 0.25)),
    (st.y * 0.5 + st.x * 0.5) * abs(sin(u_time * 0.1)),
    st.y * abs(sin(u_time * 0.33)), 1.0);
}`;

class Fathom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { frag: DEFAULT_FRAG, circular: true };
    this.onUpdateFrag = this.onUpdateFrag.bind(this);
    this.onToggleCircular = this.onToggleCircular.bind(this);
  }

  onToggleCircular() {
    this.setState({ circular: !this.state.circular });
  }

  onUpdateFrag(frag) {
    this.setState({ frag });
  }

  render() {
    const { frag, circular } = this.state;

    return (
      <div className="fathom-container">
        <div className="header" />
        <FathomEditor frag={frag} updateFrag={this.onUpdateFrag} />
        <FathomViewer frag={frag} circular={circular} />
        <ControlPanel toggleCircular={this.onToggleCircular} />
      </div>
    );
  }
}

const mountNode = document.getElementById("app");
ReactDOM.render(<Fathom />, mountNode);
