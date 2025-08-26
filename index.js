import React from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";

import "@ibm/plex/scss/ibm-plex.scss";
import "./index.css";

import FathomEditor from "./editor";
import FathomViewer from "./viewer";
import ControlPanel from "./controlPanel";

const DEFAULT_FRAG = `#ifdef GL_ES
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

function Fathom() {
  const [frag, setFrag] = useState(DEFAULT_FRAG);
  const [circular, setCircular] = useState(true);

  function onToggleCircular() {
    setCircular(!circular);
  }

  function onUpdateFrag(frag) {
    setFrag(frag);
  }

  return (
    <div className="fathom-container">
      <div className="header" />
      <FathomEditor defaultFrag={DEFAULT_FRAG} updateFrag={onUpdateFrag} />
      <FathomViewer frag={frag} circular={circular} />
      <ControlPanel toggleCircular={onToggleCircular} />
    </div>
  );
}

const mountNode = document.getElementById("app");
const root = createRoot(mountNode);
root.render(<Fathom />);
