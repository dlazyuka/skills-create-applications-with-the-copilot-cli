const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { calculate } = require("../calculator");

describe("calculate", () => {
  describe("addition", () => {
    it("adds the example values", () => {
      assert.equal(calculate(2, "+", 3), 5);
    });

    it("supports negative and decimal operands", () => {
      assert.equal(calculate(-2.5, "+", 1), -1.5);
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
