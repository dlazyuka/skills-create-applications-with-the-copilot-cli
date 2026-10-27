const readline = require("node:readline");
const { stdin, stdout } = require("node:process");
const { calculate } = require("./calculator");

function parseNumber(value) {
  const number = Number(value);
  if (value.trim() === "" || !Number.isFinite(number)) {
    throw new TypeError("Please enter a valid finite number.");
  }
  return number;
}

async function main() {
  const prompt = readline.createInterface({ input: stdin, output: stdout });
  const answers = [];
  const waiting = [];
  let inputClosed = false;

  prompt.on("line", (answer) => {
    const waiter = waiting.shift();
    if (waiter) {
      waiter.resolve(answer);
    } else {
      answers.push(answer);
    }
  });
  prompt.on("close", () => {
    inputClosed = true;
    for (const waiter of waiting.splice(0)) {
      waiter.reject(new Error("Input ended before all values were provided."));
    }
  });

  function question(message) {
    stdout.write(message);
    if (answers.length > 0) {
      return Promise.resolve(answers.shift());
    }
    if (inputClosed) {
      return Promise.reject(new Error("Input ended before all values were provided."));
    }
    return new Promise((resolve, reject) => waiting.push({ resolve, reject }));
  }

  try {
    const first = parseNumber(await question("First number: "));
    const operator = (await question("Operation (+, -, *, /): ")).trim();
    const second = parseNumber(await question("Second number: "));

    console.log(`Result: ${calculate(first, operator, second)}`);
  } finally {
    prompt.close();
  }
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});
