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
  console.log(operation,userInput);
  if (operation === "Clear Result") {
    this.Answer = "";
    setDisplayValue();
    return;
  }

  if (containsOnlyNumbers(userInput)) {
    let operationObj = operations.find((x) => x.operation === operation);
    valuesForOperation = mapUserInputToCalculableValues(userInput);
    this.Answer = operationObj.logic(valuesForOperation);
    //setDisplayValue();
    //return for testing
    return this.Answer;
  } else {
    alert("Please only enter numbers or spaces");
    return;
  }
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

function setDisplayValue() {
  const showResultElement = document.getElementById("showResult");
  showResultElement.innerText = `result: ${this.Answer}`;
}

function containsOnlyNumbers(str) {
  return /^(?=.*\d)[\d ]+$/.test(str);
}

function clearInputField() {
  const showResultElement = document.getElementById("userInput");
  showResultElement.value = '';
}

async function writeToDynamoDB() {
  let timestamp = getTimeStamp();
  let reqObj = `{\"timestamp\": \"${timestamp}\", \"result\": \"${this.Answer}\"}`;
  await fetch("https://fom8wr9ivi.execute-api.us-east-1.amazonaws.com/items", {
    method: "put",
    body: reqObj,
  })
    .then((response) => {
      console.log(response);
    })
    .catch(function (error) {
      console.log("Request failed", error);
    });
}

function getRecords() {
  fetch("https://fom8wr9ivi.execute-api.us-east-1.amazonaws.com/items")
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      // Examine the text in the response
      response.json().then((dynamoRes) => {
        let table = document.getElementById("previousResultsTable");
        table.innerHTML = "";
        dynamoRes.forEach((res) => {
          let tr = document.createElement("tr");
          Object.values(res).forEach((value) => {
            let td = document.createElement("td");
            td.innerHTML = value;
            tr.appendChild(td);
          });
          table.appendChild(tr);
        });
        var header = table.createTHead();
        var row = header.insertRow(0);
        var cell = row.insertCell(0);
        cell.innerHTML = "<b>Timestamp</b>";
        var cell = row.insertCell(1);
        cell.innerHTML = "<b>Result</b>";
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

function getTimeStamp() {
  const currentTime = Date.now();
  const dateObject = new Date(currentTime);
  const timestamp = dateObject.toISOString();
  return timestamp;
}

module.exports={performOperation, getTimeStamp, convertArrayElementsToNumbers, clearInputField}