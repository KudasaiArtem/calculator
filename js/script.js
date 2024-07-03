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

const point = document.querySelector("#point");

// return
const equals = document.querySelector("#equals");

// result
let expressionHTML = document.querySelector("#expression");


let value;

numpad.forEach((number) => {
    number.addEventListener("click", (e) => {
        MATH.currentNum(e.target.value);
    })
})

let expression = "";
let expressionUI = "";
let currentNum = "";
let nextAction = false;

let isFirstZero = false;
let isResultZero = false;

class MATH {
    // static currentNum(number) {
    //     nextAction = false;

    //     if (number == "0") {
    //         currentNum += number;
    //     } else if (number != "0") {
    //         isFirstZero = currentNum.slice(0, 1);
    //         currentNum += number;
    //     }


    //     if (isFirstZero !== "0" && isResultZero != "0") {
    //         expression += number;

    //     } else if (isFirstZero == "0") {
    //         console.log("isResultZero");
    //         expression = expression.slice(0, -1) + number;

    //     } else if (isResultZero == "0") {
    //         expression = number;
    //         isResultZero = expression;
    //     }

    //     console.log("Приклад", expression);
    //     console.log("currentNum = ", currentNum);
    // }

    static currentNum(number) {
        nextAction = false;

        let isIncludePoint = currentNum.includes(".");

        if (number == "0") {
            currentNum += number;
            expression += number;
            // isFirstZero = true;

        } else if (number != "0" || isIncludePoint) {
            isFirstZero = currentNum.slice(0, 1) === "0";
            currentNum += number;
            console.log("isFirstZero", isFirstZero);

            if (isFirstZero === true && !isIncludePoint) {
                expression = expression.slice(0, -1) + number;
                currentNum = number;
                isFirstZero = false;

            } else if (isFirstZero === false || isIncludePoint) {
                expression += number;
            } 
        }

        console.log(currentNum);
    }

    static point() {
        let isIncludePoint = currentNum.includes(".");
        let isLastNum = false;
        console.log(isLastNum);

        if (expression) {
            isLastNum = !isNaN(expression.slice(-1));
        }

        if (!isIncludePoint && isLastNum) {
            currentNum += ".";
            expression += ".";
        }
    }

    static percent() {
        let isIncludePercent = currentNum.includes("%");
        let isLastNum = false;
        console.log(isLastNum);

        if (expression) {
            isLastNum = !isNaN(expression.slice(-1));
        }

        if (!isIncludePercent && isLastNum) {
            currentNum += "%";
            expression += "%";
        }
    }

    static action(operator) {
        if (expression) {
            if (nextAction) {
                expression = expression.slice(0, -1);
            }
            expression += operator;
        }

        nextAction = true;
        currentNum = "";
    }

    // static plus() {
    //     if (nextAction === false) {
    //         expression += "+";
    //     } else if (nextAction) {
    //         expression = expression.slice(0, -1);
    //         expression += "+";
    //     }

    //     nextAction = true;
    //     currentNum = "";
    // }

    // static minus() {
    //     let isMinus = expression.slice(-1);

    //     if (isMinus != "-") {
    //         expression += "-";
    //     } else if (nextAction) {
    //         expression = expression.slice(0, -1);
    //         expression += "-";
    //     }

    //     nextAction = true;
    //     currentNum = "";
    // }

    // static multiply() {
    //     if (nextAction === false) {
    //         expression += "*";
    //     } else if (nextAction) {
    //         expression = expression.slice(0, -1);
    //         expression += "*";
    //     }

    //     nextAction = true;
    //     currentNum = "";
    // }

    // static divide() {
    //     if (nextAction === false) {
    //         expression += "/";
    //     } else if (nextAction) {
    //         expression = expression.slice(0, -1);
    //         expression += "/";
    //     }

    //     nextAction = true;
    //     currentNum = "";
    // }

    static radical() {
        if (currentNum >= 0) {
            nextAction = false;

            let radical = Math.sqrt(parseFloat(currentNum));

            expression = expression.slice(0, -1*currentNum.length);

            expression += parseFloat(radical);
            currentNum = `${radical}`;
        }
    }
    

    static equals() {
        if (expression) {
            expression = expression.replace(/\%/g, "/100");

            console.log(expression);
            let result = eval(expression);
            // expression = "";
            expression = `${result}`;
            currentNum = `${result}`;
    
            if (result === 0) {
                isFirstZero = true;
            } else {
                isFirstZero = false;
            }
        }
    }
}

class CLEAR {
    static last() {
        expression = expression.slice(0, -1);
        currentNum = currentNum.slice(0, -1);

        nextAction = false;
    }

    static all() {
        expression = "";
        currentNum = "";
        
        renderUI();
}

}

function renderUI() {
        let replaced = expression.replace(/\*/g, " x ")
                                .replace(/\//g, " : ")
                                .replace(/\+/g, " + ")
                                .replace(/\-/g, " - ");

        expressionHTML.innerHTML = `<span>${replaced}</span>`;
    }

// events
plus.addEventListener("click", () => {
    // MATH.plus();
    MATH.action("+");
})

minus.addEventListener("click", () => {
    // MATH.minus();
    MATH.action("-");
})

multiply.addEventListener("click", () => {
    // MATH.multiply();
    MATH.action("*");
})

divide.addEventListener("click", () => {
    // MATH.divide();
    MATH.action("/");
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
    renderUI();
})

point.addEventListener("click", () => {
    MATH.point();
})

percent.addEventListener("click", () => {
    MATH.percent();
})
