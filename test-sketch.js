import Fathom from './fathom';

let squareWidth = 0;
let squareHeight = 0;
let squarePosition = { x: 0, y: 0 };
let squareRotation = 0;

class TestSketch extends Fathom {
  setup(canvas, ctx) {
    squareWidth = canvas.width / 2;
    squareHeight = canvas.height / 2;
    squarePosition = { x: squareWidth / 2, y: squareHeight / 2 };
  }

  update(canvas, ctx, timeElapsed) {
    squareRotation = timeElapsed;
  }

  draw(canvas, context, timeElapsed) {
    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(squareRotation);
    context.fillStyle = 'black';
    context.fillRect(-1 * (squareWidth / 2), -1 * (squareHeight / 2), squareWidth, squareHeight);
    context.restore();
  }
}

export default TestSketch;