//
//VARIABLES
//
const express = require("express");
const app = express();

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
        valuesForOperation = mapUserInputToCalculableValues(userInput);
        this.Answer = operation.logic(valuesForOperation);
        console.log(`result: ${this.Answer}`);
        Answer = operation.logic(valuesForOperation);
        console.log(`result: ${Answer}`);
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

//
//INVOCATION
//

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile("C:/Users/MclawhornN/nodeCalculator/" + "index.html");
});

app.post("/", (req, res) => {
  let operationObj = operations.find(x => x.operation === req.body.operation);
  performOperation(operationObj, req.body.userInput)
  console.log("hit lambda endpoint to store in dynamoDB");  
  res.sendFile("C:/Users/MclawhornN/nodeCalculator/" + "index.html");
});

app.listen(3000);
