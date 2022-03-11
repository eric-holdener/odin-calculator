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
    const keysTranslation = keys.split("");

    let keyIndex = {};
    let keysStore = [];

    let intermediateCalculator = 0;

    keysTranslation.forEach((key, index) => {
        if (key === "+" || key === "-" || key === "/" || key === "*") {
            keyIndex = {key, index};
            keysStore.push(keyIndex);
        }
    });

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

document.addEventListener("DOMContentLoaded", () => {
    const btns = document.querySelectorAll('.calc-button');
    btns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            collector(e.target.getAttribute('data-key'));
        });
    });
});

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
