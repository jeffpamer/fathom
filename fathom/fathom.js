import React from 'react';

class CanvasSketch extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.renderRequestId = undefined;
    this.startTime = undefined;
  }

  componentDidMount() {
    if (this.renderRequestId) window.cancelAnimationFrame(this.renderRequestId);

    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    this.setup(canvas, ctx);
    this.startTime = performance.now();
    this.drawLoop(canvas, ctx);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.renderRequestId);
  }

  setup(canvas, ctx) {}

  update(canvas, ctx, timeElapsed) {}

  clear(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  draw(canvas, ctx, timeElapsed) {}

  drawLoop(canvas, ctx, timeElapsed = 0) {
    this.renderRequestId = window.requestAnimationFrame(currentTime => this.drawLoop(canvas, ctx, (currentTime - this.startTime) / 1000));
    this.update(canvas, ctx, timeElapsed);
    this.clear(canvas, ctx);
    this.draw(canvas, ctx, timeElapsed);
  }

  render() {
    return (
      <canvas ref={this.canvasRef} width="400" height="400" />
    )
  }
}

// Identity function for glsl tagged templates (i.e. just pass-through to allow for syntax highlighting, not other processing);
const glsl = x => x;
const frag = x => x;
const vert = x => x;

const loadShader = (gl, type, source) => {
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

class WebGLSketch extends React.Component {
  vert = glsl``;
  frag = glsl``;

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.renderRequestId = undefined;
    this.startTime = undefined;
  }

  componentDidMount() {
    if (this.renderRequestId) window.cancelAnimationFrame(this.renderRequestId);

    const canvas = this.canvasRef.current;
    const gl = canvas.getContext('webgl');

    this.setup(canvas, gl);
    this.drawLoop(canvas, gl);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.renderRequestId);
  }

  setup(canvas, gl) {}

  initShaders(gl, vert, frag) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragment

  }

  update(canvas, gl, timeElapsed) {}

  clear(canvas, gl) {
    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  draw(canvas, gl, timeElapsed) {}

  drawLoop(canvas, gl, timeElapsed = 0) {
    this.update(canvas, gl);
    this.clear(canvas, gl);
    this.draw(canvas, gl, timeElapsed);
  }

  render() {
    return (
      <canvas ref={this.canvasRef} width="640" height="480" />
    )
  }
}

export {
  CanvasSketch,
  WebGLSketch,
  frag,
  vert,
  glsl,
};
