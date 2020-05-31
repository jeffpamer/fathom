import WebGLSketch, { glsl } from '../fathom/webgl';

class TestGLSketch extends WebGLSketch {
  constructor(props) {
    super(props);

    this.frag = glsl`
      #ifdef GL_ES
      precision mediump float;
      #endif

      uniform vec2 u_resolution;
      uniform float u_time;

      void main() {
        vec2 st = gl_FragCoord.xy/u_resolution;
        gl_FragColor = vec4(st.x, st.y, (st.x * 0.5 + st.y * 0.5) * abs(sin(u_time * 0.5)), 1.0);
      }
    `;
  }
}

export default TestGLSketch;