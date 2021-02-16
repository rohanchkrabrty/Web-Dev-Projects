const display = document.getElementById("display");
let previousOperand = null;
let previousOperator = null;

document.querySelector(".container").addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
        let btn = event.target;

        if (!isNaN(btn.innerText)) {
            //if active operator is present replace display else append
            if (document.querySelectorAll(".activeOperator").length) {
                clearActiveOperator();
                display.innerText = btn.innerText;
            } else {
                display.innerText = parseInt(display.innerText + btn.innerText);
            }
        } else if (btn.innerText === "AC") {
            display.innerText = 0;
            previousOperand = null;
            previousOperator = null;
            clearActiveOperator();
        } else if (btn.innerText === "⟵") {
            display.innerText = display.innerText.slice(0, -1);
            //to fix empty state
            if (display.innerText.length === 0)
                display.innerText = 0;
        } else if (btn.innerText === "=") {
            evaluate();
            clearActiveOperator();
            previousOperator = null;
            previousOperand = null;
        } else {
            //if active operator present replace operator else do operation
            if (document.querySelectorAll(".activeOperator").length) {
                clearActiveOperator();
            } else {
                if (previousOperator)
                    evaluate();
                previousOperand = display.innerText;
            }
            previousOperator = btn.innerText;
            btn.classList.add("activeOperator");
        }
    }
});

function evaluate() {
    switch (previousOperator) {
        case "+":
            display.innerText = parseInt(previousOperand) + parseInt(display.innerText);
            break;
        case "-":
            display.innerText = parseInt(previousOperand) - parseInt(display.innerText);
            break;
        case "×":
            display.innerText = parseInt(previousOperand) * parseInt(display.innerText);
            break;
        case "÷":
            display.innerText = parseInt(previousOperand) / parseInt(display.innerText);
            break;
    }
}

function clearActiveOperator() {
    if (document.querySelectorAll(".activeOperator").length)
        document.querySelector(".activeOperator").classList.remove("activeOperator");
}