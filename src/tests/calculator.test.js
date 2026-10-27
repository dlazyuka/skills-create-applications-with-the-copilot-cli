const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { calculate, modulo, power, squareRoot } = require("../calculator");

describe("calculate", () => {
  describe("addition", () => {
    it("adds the example values", () => {
      assert.equal(calculate(2, "+", 3), 5);
    });

    it("supports negative and decimal operands", () => {
      assert.equal(calculate(-2.5, "+", 1), -1.5);
    });
  });

  describe("modulo", () => {
    it("returns the remainder for the image example and other operands", () => {
      assert.equal(modulo(5, 2), 1);
      assert.equal(modulo(10, 3), 1);
    });

    it("supports negative operands", () => {
      assert.equal(modulo(-10, 3), -1);
    });

    it("rejects a zero divisor", () => {
      assert.throws(() => modulo(10, 0), {
        name: "RangeError",
        message: "Cannot calculate modulo by zero.",
      });
    });

    it("rejects non-finite operands", () => {
      assert.throws(() => modulo(Number.NaN, 2), TypeError);
    });
  });

  describe("power", () => {
    it("raises a base to an exponent, including the image example", () => {
      assert.equal(power(2, 3), 8);
      assert.equal(power(5, 0), 1);
    });

    it("supports negative and fractional exponents", () => {
      assert.equal(power(2, -2), 0.25);
      assert.equal(power(9, 0.5), 3);
    });

    it("rejects non-finite operands", () => {
      assert.throws(() => power(2, Number.POSITIVE_INFINITY), TypeError);
    });
  });

  describe("squareRoot", () => {
    it("returns the square root, including the image example", () => {
      assert.equal(squareRoot(16), 4);
      assert.equal(squareRoot(9), 3);
      assert.equal(squareRoot(0), 0);
    });

    it("rejects negative numbers", () => {
      assert.throws(() => squareRoot(-1), {
        name: "RangeError",
        message: "Cannot calculate the square root of a negative number.",
      });
    });

    it("rejects non-finite numbers", () => {
      assert.throws(() => squareRoot(Number.NaN), TypeError);
    });
  });

  describe("subtraction", () => {
    it("subtracts the example values", () => {
      assert.equal(calculate(10, "-", 4), 6);
    });

    it("supports negative results", () => {
      assert.equal(calculate(3, "-", 8), -5);
    });
  });

  describe("multiplication", () => {
    it("multiplies the example values", () => {
      assert.equal(calculate(45, "*", 2), 90);
    });

    it("supports negative and zero operands", () => {
      assert.equal(calculate(-4, "*", 0), -0);
      assert.equal(calculate(-4, "*", 2), -8);
    });
  });

  describe("division", () => {
    it("divides the example values", () => {
      assert.equal(calculate(20, "/", 5), 4);
    });

    it("supports fractional and negative results", () => {
      assert.equal(calculate(7, "/", 2), 3.5);
      assert.equal(calculate(6, "/", -2), -3);
    });

    it("rejects division by zero", () => {
      assert.throws(() => calculate(1, "/", 0), {
        name: "RangeError",
        message: "Cannot divide by zero.",
      });
    });
  });

  it("rejects non-finite operands", () => {
    assert.throws(() => calculate(Number.NaN, "+", 1), TypeError);
    assert.throws(() => calculate(1, "-", Number.POSITIVE_INFINITY), TypeError);
  });

  it("rejects unsupported operations", () => {
    assert.throws(() => calculate(2, "%", 1), {
      message: "Unsupported operation. Choose +, -, *, or /.",
    });
  });
});
