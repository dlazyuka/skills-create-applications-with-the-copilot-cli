// Supported operations: addition (+), subtraction (-), multiplication (*), and division (/).
function calculate(first, operator, second) {
  if (!Number.isFinite(first) || !Number.isFinite(second)) {
    throw new TypeError("Both operands must be finite numbers.");
  }

  switch (operator) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "*":
      return first * second;
    case "/":
      if (second === 0) {
        throw new RangeError("Cannot divide by zero.");
      }
      return first / second;
    default:
      throw new Error("Unsupported operation. Choose +, -, *, or /.");
  }
}

module.exports = { calculate };
