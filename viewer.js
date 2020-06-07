import React from 'react';

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function initProgram(gl, vert, frag) {
  const vertexShader = vert ? loadShader(gl, gl.VERTEX_SHADER, vert) : undefined;
  const fragmentShader = frag ? loadShader(gl, gl.FRAGMENT_SHADER, frag) : undefined;

  const program = gl.createProgram();
  if (vertexShader) gl.attachShader(program, vertexShader);
  if (fragmentShader) gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    // console.error('Unable to initialize shader program', gl.getProgramInfoLog(program));
    return null;
  }

  return program;
}

function initVertexBuffer(gl, program) {
  // const texCoordsLoc = gl.getAttribLocation(program, 'a_texcoord');
  // const texCoordsBuffer = gl.createBuffer();
  // gl.bindBuffer(gl.ARRAY_BUFFER, texCoordsBuffer);
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]), gl.STATIC_DRAW);
  // gl.enableVertexAttribArray(texCoordsLoc);
  // gl.vertexAttribPointer(texCoordsLoc, 2, gl.FLOAT, false, 0, 0);

  const verticesLoc = gl.getAttribLocation(program, 'a_position');
  const verticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(verticesLoc);
  gl.vertexAttribPointer(verticesLoc, 2, gl.FLOAT, false, 0, 0);
}

class InspectralViewer extends React.PureComponent {
  vert = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    attribute vec2 a_texcoord;
    attribute vec2 a_position;

    varying vec2 v_texcoord;

    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
      v_texcoord = a_texcoord;
    }
  `;

  frag = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    void main() {
      gl_FragColor = vec4(1.0);
    }
  `;
  
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.animationFrameRequest = undefined;
    this.startTime = undefined;
    this.animationFrameRequest = undefined;
    this.mouseX = 0;
    this.mouseY = 0;

    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentDidMount() {
    this.setup();
    this.startTime = performance.now();
    this.animationFrameRequest = window.requestAnimationFrame(() => this.drawLoop());
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrameRequest);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
  }

  componentDidUpdate() {
    window.cancelAnimationFrame(this.animationFrameRequest);
    const { frag } = this.props;
    this.program = initProgram(this.gl, this.vert, frag);

    if (this.program) {
      this.gl.useProgram(this.program);
      this.animationFrameRequest = window.requestAnimationFrame(() => this.drawLoop());
    }
  }

  setup() {
    const { frag } = this.props;

    this.canvas = this.canvasRef.current;
    this.gl = this.canvas.getContext('webgl');
    this.program = initProgram(this.gl, this.vert, frag);
    this.gl.useProgram(this.program);
    this.buffer = initVertexBuffer(this.gl, this.program);

    this.canvas.addEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  setUniform(method, name, ...value) {
    const uniformLocation = this.gl.getUniformLocation(this.program, name);
    this.gl['uniform' + method].apply(this.gl, [uniformLocation].concat(value));
  }

  update(timeElapsed) {
    // set the resolution uniform
    this.setUniform('2f', 'u_resolution', this.canvas.width, this.canvas.height);

    // set the mouse position
    this.setUniform('2f', 'u_mouse', this.mouseX, this.mouseY);

    // set the time elapsed
    this.setUniform('1f', 'u_time', timeElapsed);
  }

  draw(timeElapsed) {
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }

  drawLoop(renderTime = 0) {
    this.animationFrameRequest = window.requestAnimationFrame((t) => this.drawLoop(t));
    const timeElapsed = Math.max((renderTime - this.startTime) / 1000, 0);
    this.update(timeElapsed);
    this.draw(timeElapsed);
  }

  render() {
    return (
      <canvas className="inspectral-viewer" ref={this.canvasRef} width="100%" height="100%" />
    )
  }
}

export default InspectralViewer