// Supported operations: addition, subtraction, multiplication, division, modulo,
// exponentiation (power), and square root.
function assertFinite(value, name) {
  if (!Number.isFinite(value)) {
    throw new TypeError(`${name} must be a finite number.`);
  }
}

function calculate(first, operator, second) {
  assertFinite(first, "Both operands");
  assertFinite(second, "Both operands");

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

function modulo(a, b) {
  assertFinite(a, "Both operands");
  assertFinite(b, "Both operands");
  if (b === 0) {
    throw new RangeError("Cannot calculate modulo by zero.");
  }
  return a % b;
}

function power(base, exponent) {
  assertFinite(base, "Base");
  assertFinite(exponent, "Exponent");
  return base ** exponent;
}

function squareRoot(n) {
  assertFinite(n, "Number");
  if (n < 0) {
    throw new RangeError("Cannot calculate the square root of a negative number.");
  }
  return Math.sqrt(n);
}

module.exports = { calculate, modulo, power, squareRoot };
