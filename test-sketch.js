import Fathom from './fathom';

let squareWidth = 0;
let squareHeight = 0;
let squarePosition = { x: 0, y: 0 };
let squareRotation = 0;
let opacity = 0;

class TestSketch extends Fathom.Sketch {
  setup(canvas, ctx) {
    squareWidth = canvas.width / 2;
    squareHeight = canvas.height / 2;
    squarePosition = { x: squareWidth / 2, y: squareHeight / 2 };
  }

  update(canvas, ctx, timeElapsed) {
    squareRotation = timeElapsed;
    opacity = 1;// Math.abs(Math.sin(timeElapsed));
  }

  draw(canvas, context, timeElapsed) {
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = 'difference';
    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(squareRotation);
    context.fillStyle = `rgba(255, 0, 0, ${opacity})`;
    context.fillRect(-1 * (squareWidth / 2), -1 * (squareHeight / 2), squareWidth, squareHeight);
    context.rotate(squareRotation * 0.25);
    context.fillStyle = `rgba(0, 255, 0, ${opacity})`;
    context.fillRect(-1 * (squareWidth / 2), -1 * (squareHeight / 2), squareWidth, squareHeight);
    context.rotate(squareRotation * 0.25);
    context.fillStyle = `rgba(0, 0, 255, ${opacity})`;
    context.fillRect(-1 * (squareWidth / 2), -1 * (squareHeight / 2), squareWidth, squareHeight);
    context.restore();
  }
}

export default TestSketch;