const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

var Answer = "";

var operations = [
  {
    id: 1,
    operation: "Addition",
    logic: function (input) {
      return input.reduce((partialSum, a) => partialSum + a);
    },
    verb: "add",
  },
  {
    id: 2,
    operation: "Subtraction",
    logic: function (input) {
      return input.reduce((partialSum, a) => partialSum - a);
    },
    verb: "subtract",
  },
  {
    id: 3,
    operation: "Multiplication",
    logic: function (input) {
      return input.reduce((partialSum, a) => partialSum * a);
    },
    verb: "multiply",
  },
  {
    id: 4,
    operation: "Division",
    logic: function (input) {
      return input.reduce((partialSum, a) => partialSum / a);
    },
    verb: "divide",
  },
];

function main() {
  const opSelection = new Promise((resolve) => {
    readline.question(
      "Enter the number for the desired operation.\n1> Addition\n2> Subtraction\n3> Multiplication\n4> Division\n",
      (selection) => {
        resolve(selection);
      }
    );
  });
  opSelection.then((value) => {
    if (isNaN(value)) {
      console.log("Please enter a numeric value ");
      main();
    } else {
      operationExistsCheck(value);
    }
  });
}

function operationExistsCheck(selection) {
  var opObj = operations.filter(function (o) {
    return o.id == selection;
  });
  if (opObj.length == 0) {
    console.log("The number entered does not correspond to an operation ");
    main();
  } else {
    performOperation(opObj[0].id);
  }
}

function cleanArray(input) {
  let inputArray = input.split(" ");
  if (typeof this.Answer != "undefined") {
    inputArray.unshift(this.Answer);
  }
  inputArray = inputArray.filter((e) => (e === 0 ? true : e));
  return inputArray.map(Number);
}

function performOperation(opID) {
  const getAnswer = new Promise((resolve) => {
    let index = opID - 1;
    readline.question(
      `Enter the numbers you would like to ${operations[index].verb} seperated by a space (ex. 2 5) `,
      (input) => {
        this.Answer = operations[index].logic(cleanArray(input));
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

console.log("Welcome to the basic node.js calculator.\n");
main();