const numpad = document.querySelectorAll(".num");
const btnBlock = document.querySelector(".button_block");
console.log(numpad);

// operators
const clearAll = document.querySelector("#ac");
const backspace = document.querySelector("#backspace");

const percent = document.querySelector("#percent");
const divide = document.querySelector("#divide");
const multiply = document.querySelector("#multiply");
const minus = document.querySelector("#minus");
const plus = document.querySelector("#plus");
const radical = document.querySelector("#radical");

// return
const equals = document.querySelector("#equals");

// result
let expressionUI = document.querySelector("#expression");


let value;

numpad.forEach((number) => {
    number.addEventListener("click", (e) => {
        MATH.currentNum(e.target.value);
    })
})

let expression = "";
let currentNum = "";
let nextAction = false;

class MATH {
    static currentNum(number) {
        expression += number;
        nextAction = false;

        if (nextAction === false) {
            currentNum += number;
        }

        console.log("Приклад", expression);
        console.log("currentNum = ", currentNum);
    }

    static plus() {
        if (nextAction === false) {
            expression += "+";
        } else if (nextAction) {
            expression = expression.slice(0, -1);
            expression += "+";
        }

        nextAction = true;
        currentNum = "";
    }

    static minus() {
        let isMinus = expression.slice(-1);

        if (isMinus != "-") {
            expression += "-";
        } else if (nextAction) {
            expression = expression.slice(0, -1);
            expression += "-";
        }

        nextAction = true;
        currentNum = "";
    }

    static multiply() {
        if (nextAction === false) {
            expression += "*";
        } else if (nextAction) {
            expression = expression.slice(0, -1);
            expression += "*";
        }

        nextAction = true;
        currentNum = "";
    }

    static divide() {
        if (nextAction === false) {
            expression += "/";
        } else if (nextAction) {
            expression = expression.slice(0, -1);
            expression += "/";
        }

        nextAction = true;
        currentNum = "";
    }

    static radical() {
        nextAction = true;
        let radical = Math.sqrt(parseFloat(currentNum));

        expression = expression.slice(0, -1*currentNum.length);

        expression += parseFloat(radical);
        currentNum = "";

        console.log(expression);
        console.log(radical);
    }

    static equals() {
        let result = eval(expression);
        // expression = "";
        expression = `${result}`;

        console.log(result);
    }
}

class CLEAR {
    static last() {
        expression = expression.slice(0, -1);
    }

    static all() {
        expression = "";
    }
}

class UI {
    static showExpression() {
        let replaced = expression.replace(/\*/g, " x ")
                                .replace(/\//g, " : ")
                                .replace(/\+/g, " + ")
                                .replace(/\-/g, " - ");

        expressionUI.innerHTML = `<span>${replaced}</span>`;
    }

    static cleanUp() {

    }
}

// events
plus.addEventListener("click", () => {
    MATH.plus();
})

minus.addEventListener("click", () => {
    MATH.minus();
})

multiply.addEventListener("click", () => {
    MATH.multiply();
})

divide.addEventListener("click", () => {
    MATH.divide();
})

radical.addEventListener("click", () => {
    MATH.radical();
})

equals.addEventListener("click", () => {
    MATH.equals();

    // result.innerHTML = `<span>${value}</span>`
})

clearAll.addEventListener("click", () => {
    CLEAR.all();
})

backspace.addEventListener("click", () => {
    CLEAR.last();
})

btnBlock.addEventListener("click", () => {
    UI.showExpression();
})
