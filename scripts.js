function add(a, b) {
    return (a+b);
}

function subtract(a, b) {
    return (a-b);
}

function multiply(a, b) {
    return(a*b);
}

function divide(a, b) {
    return (a/b);
}

function stringParsing(keys) {
    // splits string of keys into an array of individual letters
    const keysTranslation = keys.split("");

    // initialize keyIndex as object and keysStore as array to store the objects in
    let keyIndex = {};
    let keysStore = [];

    // intermediate calculator is for multi operator functions
    let intermediateCalculator = 0;

    // iterates through array passed in (keys) and returns all operators and their indexes
    keysTranslation.forEach((key, index) => {
        if (key === "+" || key === "-" || key === "/" || key === "*") {
            keyIndex = {key, index};
            keysStore.push(keyIndex);
        }
    });

    // logic for multi operator functions passed in
    // unique logic for determining a and b for first operator of string, last operator of string, and middle operators
    if (keysStore.length > 1) {
        for (let i = 0; i < keysStore.length; i++){
            if (i == 0) {
                a = keysTranslation.slice(0, keysStore[i]["index"]).join('');
                a = parseFloat(a);
    
                b = keysTranslation.slice(keysStore[i]["index"]+1, keysStore[i+1]["index"]).join('');
                b = parseFloat(b);
    
                intermediateCalculator = operate(keysStore[i]["key"], a, b);
            } else if (i == keysStore.length-1) {
                a = intermediateCalculator;
    
                b = keysTranslation.slice(keysStore[i]["index"]+1).join('');
                b = parseFloat(b);
    
                intermediateCalculator = (operate(keysStore[i]["key"], a, b));
            } else {
                a = intermediateCalculator;
    
                b = keysTranslation.slice(keysStore[i]["index"]+1, keysStore[i+1]["index"]).join('');
                b = parseFloat(b);
    
                intermediateCalculator = operate(keysStore[i]["key"], a, b);
            }
        }
    } 
    // logic for single operator functions
    else {
        a = keysTranslation.slice(0, keysStore[i]["index"]).join('');
        a = parseFloat(a);
    
        b = keysTranslation.slice(keysStore[i]["index"]+1, keysStore[i+1]["index"]).join('');
        b = parseFloat(b);
    
        intermediateCalculator = operate(keysStore[i]["key"], a, b);
    }
}

// switch statement that takes an operator passed in and performs the correct operation based on operator
function operate(operator, a, b) {
    console.log("in operate");
    let value = 0;
    switch (operator) {
        case '+':
            value = add(a, b);
            console.log(value);
            return value;
        case '-':
            value = subtract(a, b);
            console.log(value);
            return value;
        case '*':
            value = multiply(a, b);
            console.log(value);
            return value;
        case '/':
            value = divide(a, b);
            console.log(value);
            return value;
    }
}

// wait for dom content to load, then select all buttons and add click listeners to them to collect their data-key
document.addEventListener("DOMContentLoaded", () => {
    const btns = document.querySelectorAll('.calc-button');
    btns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            collector(e.target.getAttribute('data-key'));
        });
    });
});

// gets display, deletes the display if there is a child node, then performs different functions on the display of the calculator
// based on what button was pressed - clear, delete, =, or any other button
let keys = "";
function collector(key) {
    const display = document.querySelector(".display");
    let displayNumber = document.createElement("p");
    displayNumber.className = ".display-number";
    if (display.hasChildNodes) {
        while (display.firstChild) {
            display.removeChild(display.firstChild);
        }
    }

    if (key === "=") {
        passKeys = keys;
        keys = "";
        stringParsing(passKeys);
    } else if (key === "clear") {
        keys = "";
        displayNumber.textContent = keys;
        display.appendChild(displayNumber);
    } else if (key === "delete") {
        keys = keys.substring(0, keys.length - 1);
        displayNumber.textContent = keys;
        display.appendChild(displayNumber);
    } else {
        keys = keys + key;
        displayNumber.textContent = keys;
        display.appendChild(displayNumber);
    }
}
