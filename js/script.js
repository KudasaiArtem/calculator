let numpad = document.querySelectorAll(".num");

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
let result = document.querySelector("#result");


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
        nextAction = true;
        currentNum = "";
        expression += "+";
    }

    static minus() {
        nextAction = true;
        currentNum = "";
        expression += "-";
    }

    static multiply() {
        nextAction = true;
        currentNum = "";
        expression += "*";
    }

    static divide() {
        nextAction = true;
        currentNum = "";
        expression += "/"
    }

    static radical() {
        nextAction = true;
        let radical = Math.sqrt(parseFloat(currentNum));

        expression = expression.slice(0, -1*currentNum.length);

        expression += parseInt(radical);
        currentNum = "";

        console.log(expression);
        console.log(radical);
    }

    static equals() {
        let result = eval(expression);
        // expression = "";
        expression = result;

        console.log(result);
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
