import React from 'react';

// Identity function for glsl tagged templates (i.e. just pass-through to allow for syntax highlighting, not other processing);
const glsl = x => x;
const frag = x => x;
const vert = x => x;

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the shader', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function initShaderProgram(gl, vert, frag) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vert);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, frag);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error('Unable to initialize shader program', gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  gl.useProgram(shaderProgram);
  return shaderProgram;
}

class WebGLSketch extends React.Component {
  vert = glsl`
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0, 1);
    }
  `;
  
  frag = glsl``;

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.renderRequestId = undefined;
    this.startTime = undefined;
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const gl = canvas.getContext('webgl');

    this.setup(gl);
    this.shaderProgram = initShaderProgram(gl, this.vert, this.frag);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER, 
      new Float32Array([
        -1.0, -1.0, 
         1.0, -1.0, 
        -1.0,  1.0, 
        -1.0,  1.0, 
         1.0, -1.0, 
         1.0,  1.0]), 
      gl.STATIC_DRAW
    );

    this.clear(gl);
    this.draw(gl, this.shaderProgram);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.renderRequestId);
  }

  setup(gl) {}

  update(gl, shaderProgram, timeElapsed) {}

  clear(gl) {
    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  draw(gl, shaderProgram, timeElapsed) {
    const positionLocation = gl.getAttribLocation(shaderProgram, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  drawLoop(gl, shaderProgram, timeElapsed = 0) {
    this.update(gl, shaderProgram, timeElapsed);
    this.clear(gl);
    this.draw(gl, shaderProgram, timeElapsed);
  }

  render() {
    return (
      <canvas ref={this.canvasRef} width="640" height="480" />
    )
  }
}

export default WebGLSketch
export { glsl, frag, vert }