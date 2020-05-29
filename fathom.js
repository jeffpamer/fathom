import React from 'react';

class FathomSketch extends React.Component {
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

export default {
  Sketch: FathomSketch,
};
