//
//VARIABLES
//

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

var Answer = "";

var operations = [
  {
    operation: "Addition",
    logic: function (input) {
      return input.reduce((partialSum, a) => partialSum + a);
    },
    verb: "add",
  },
  {
    operation: "Subtraction",
    logic: function (input) {
      return input.reduce((partialSum, a) => partialSum - a);
    },
    verb: "subtract",
  },
  {
    operation: "Multiplication",
    logic: function (input) {
      return input.reduce((partialSum, a) => partialSum * a);
    },
    verb: "multiply",
  },
  {
    operation: "Division",
    logic: function (input) {
      return input.reduce((partialSum, a) => partialSum / a);
    },
    verb: "divide",
  },
];

//
//FUNCTIONS
//

function main() {
  const selectedOperationIndex = new Promise((resolve) => {
    readline.question(
      `Enter the number for the desired operation.\n${createOperationSelectionPrompt()}`,
      (operationIndex) => {
        resolve(operationIndex);
      }
    );
  });
  selectedOperationIndex.then((userEnteredOperationIndex) => {
    isEnteredIndexANumber(userEnteredOperationIndex);
  });
}

function createOperationSelectionPrompt() {
  let prompt = "";
  for (let i = 0; i <= operations.length - 1; i++) {
    prompt = prompt.concat(`${i}> ${operations[i].operation}\n`);
  }
  return prompt;
}

function isEnteredIndexANumber(userEnteredOperationIndex) {
  if (isNaN(userEnteredOperationIndex)) {
    console.log("Please enter a numeric value ");
    main();
  } else {
    doesOperationExist(userEnteredOperationIndex);
  }
}

function doesOperationExist(userEnteredOperationIndex) {
  if (operations[userEnteredOperationIndex] === undefined) {
    console.log("The number entered does not correspond to an operation ");
    main();
  } else {
    let operation = operations[userEnteredOperationIndex];
    performOperation(operation);
  }
}

function performOperation(operation) {
  const getAnswer = new Promise((resolve) => {
    readline.question(
      `Enter the numbers you would like to ${operation.verb} seperated by a space (ex. 2 5) `,
      (userInput) => {
        let valuesForOperation = mapUserInputToCalculableValues(userInput);
        this.Answer = operation.logic(valuesForOperation);
        console.log(`result: ${this.Answer}`);
        resolve(this.Answer);
      }
    );
  });
  getAnswer.then((value) => {
    this.Answer = value;
    additionalOps();
  });
}

function mapUserInputToCalculableValues(userInput) {
  let userInputArray = convertUserInputToArray(userInput);
  let cleanStringArray = removeEmptyStringsFromArray(userInputArray);
  let calculableValueArray = convertArrayElementsToNumbers(cleanStringArray);
  return calculableValueArray;
}

function convertUserInputToArray(userInput) {
  let userInputArray = userInput.split(" ");
  if (typeof this.Answer != "undefined") {
    userInputArray = includePreviousResultIfNecessary(userInputArray);
  }
  return userInputArray;
}

function includePreviousResultIfNecessary(userInputArray) {
  let userInputArrayWithPreviousResult = userInputArray;
  userInputArrayWithPreviousResult.unshift(this.Answer);
  return userInputArrayWithPreviousResult;
}

function removeEmptyStringsFromArray(userInputArray) {
  let cleanUserInputArray = userInputArray.filter((e) => (e === 0 ? true : e));
  return cleanUserInputArray;
}

function convertArrayElementsToNumbers(cleanStringArray) {
  return cleanStringArray.map(Number);
}

function additionalOps() {
  readline.question(
    "Press 1 to continue calculations, 2 to clear result, or 3 to exit ",
    (input) => {
      if (input == "1") {
        main();
      } else if (input == "2") {
        this.Answer = "";
        main();
      } else {
        console.log("Goodbye");
        readline.close();
      }
    }
  );
}

//
//INVOCATION
//

console.log("Welcome to the basic node.js calculator.\n");
main();
