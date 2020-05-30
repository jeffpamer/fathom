import WebGLSketch, { glsl } from '../fathom/webgl';

class TestGLSketch extends WebGLSketch {
  setup(gl) {
    this.frag = glsl`
      #ifdef GL_ES
      precision mediump float;
      #endif

      uniform float u_time;
      void main() {
        gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
      }
    `;
  }
}

export default TestGLSketch;