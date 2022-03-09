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
    let i = 0;
    keysTranslation.forEach((key, index) => {
        if (key === "+" || key === "-" || key === "/" || key === "*") {
            i++;
            let operator = key;
            let a = "";
            let b = "";
            if (i == 1) {
                a = keysTranslation.slice(0, index);
                a = a.join('');
                a = parseFloat(a);

                findNextNumber = keysTranslation.slice(index+1);
                findNextNumber.forEach((key, index) => {
                    if (key === "+" || key === "-" || key === "/" || key === "*") {
                        b = findNextNumber.slice(0, index);
                        b = b.join('');
                        b = parseFloat(b);
                        return b;
                    } else {
                        b = findNextNumber;
                        b = b.join('');
                        b = parseFloat(b);
                        return b;
                    }
                });
            }

            // add multiple lines logic here


            switch (operator) {
                case '+':
                    console.log(add(a, b));
                    break;
                case '-':
                    console.log(subtract(a, b));
                    break;
                case '*':
                    console.log(multiply(a, b));
                    break;
                case '/':
                    console.log(divide(a, b));
                    break;
            }
        }
    });
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
