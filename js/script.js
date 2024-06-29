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

let isFirstZero;
let isResultZero;

class MATH {
    static currentNum(number) {
        nextAction = false;

        if (number == "0") {
            currentNum += number;
        } else if (number != "0") {
            isFirstZero = currentNum.slice(0, 1);
            currentNum += number;
            // isResultZero = expression.slice(0, -1);
        }


        if (isFirstZero !== "0" && isResultZero != "0") {
            expression += number;
        } else if (isFirstZero == "0") {
            console.log("isResultZero");
            expression = expression.slice(0, -1) + number;
        } else if (isResultZero == "0") {
            expression = number;
            isResultZero = expression;
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
        console.log("поточний номер", currentNum);
        if (currentNum >= 0) {
            nextAction = false;

            let radical = Math.sqrt(parseFloat(currentNum));

            expression = expression.slice(0, -1*currentNum.length);

            expression += parseFloat(radical);
            currentNum = parseInt(radical);

            console.log(expression);
            console.log(radical);
        }
    }

    // static radical() {
    //     console.log("поточний номер", currentNum);
    //     try {
    //         if (currentNum && !isNaN(currentNum)) {
    //             nextAction = true;
    
    //             // Перевірка на негативні числа
    //             if (parseFloat(currentNum) < 0) {
    //                 console.error("Неможливо обчислити корінь з негативного числа");
    //                 return;
    //             }
    
    //             // Обчислення квадратного кореня
    //             let radicalValue = Math.sqrt(parseFloat(currentNum));
    
    //             // Оновлення виразу, замінивши поточне число на його корінь
    //             expression = expression.slice(0, -currentNum.length) + radicalValue;
                
    //             // Очищення поточного числа та оновлення його значенням кореня
    //             currentNum = `${radicalValue}`;
                
    //             // Оновлення UI
    //             UI.showExpression();
    
    //             console.log("оновлений вираз:", expression);
    //             console.log("значення кореня:", radicalValue);
    //         } else {
    //             console.error("Поточне число відсутнє або не є числом");
    //         }
    //     } catch (error) {
    //         console.error("Сталася помилка під час обчислення кореня:", error);
    //     }
    // }
    

    static equals() {
        let result = eval(expression);
        // expression = "";
        expression = `${result}`;
        currentNum = `${result}`;

        if (expression == 0) {
            isResultZero = expression;
            console.log("zero!");
        } else {
            isResultZero = expression;
        }

        console.log(result);
    }
}

class CLEAR {
    static last() {
        expression = expression.slice(0, -1);
        currentNum = currentNum.slice(0, -1);
        isFirstZero = false;
        isResultZero = false;
        nextAction = false;
    }

    static all() {
        expression = "";
        currentNum = "";
        isFirstZero = false;
        isResultZero = false;
    UI.showExpression();
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
