import React from 'react';

let NEXT_RENDER_BLOCKED = false;

if (module.hot) {
  module.hot.dispose(function() {
    NEXT_RENDER_BLOCKED = true;
  })

  module.hot.accept(function() {
    NEXT_RENDER_BLOCKED = false;
  })
}

class Fathom extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext('2d');

    this.setup(this.canvas, this.ctx);
    this.startTime = performance.now();
    this.drawLoop(this.canvas, this.ctx);
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
    if (NEXT_RENDER_BLOCKED) return;
    this.update(canvas, ctx, timeElapsed);
    this.clear(canvas, ctx);
    this.draw(canvas, ctx, timeElapsed);
    this.renderRequestId = window.requestAnimationFrame(currentTime => this.drawLoop(canvas, ctx, (currentTime - this.startTime) / 1000));
  }

  render() {
    return (
      <canvas ref={this.canvasRef} width="400" height="400" />
    )
  }
}

export default Fathom;
