//
//VARIABLES
//


var Answer = "";
var valuesForOperation = [];

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


function performOperation(operation, userInput) {
  let operationObj = operations.find(x => x.operation === operation);
        valuesForOperation = mapUserInputToCalculableValues(userInput);
        this.Answer = operationObj.logic(valuesForOperation);
        console.log(`result: ${this.Answer}`);
        let displayResult = document.getElementById('result');
        displayResult.value = `result: ${this.Answer}`;
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



