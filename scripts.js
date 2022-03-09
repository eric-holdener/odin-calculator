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

function operate(keys) {
    const keysTranslation = keys.split("");
    console.log(keysTranslation);

    // keysTranslation.forEach(key => )
    // switch (operator) {
    //     case '+':
    //         add(a, b);
    //     case '-':
    //         subtract(a, b);
    //     case '*':
    //         multiply(a, b);
    //     case '/':
    //         divide(a, b);
    // }
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
        operate(passKeys);
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
