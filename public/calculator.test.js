/** * @jest-environment jsdom */
const fs = require('fs');
window.document.body.innerHTML = fs.readFileSync('./index.html');
const calculator = require('./calculator');

test('properly performs selected operation', () => {
    expect(calculator.performOperation('Addition','2 5 4')).toBe(11)
});

test('properly converts array of strings to numbers', () => {
    expect(calculator.convertArrayElementsToNumbers(['6','43','9'])).toStrictEqual([6,43,9])
});

test('properly clears results field in html template', () => {
    const htmlTest = document.getElementById('userInput');
    calculator.clearInputField();
    expect(htmlTest.value).toBe('');
});