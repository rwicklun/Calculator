const START = 0;
const OPERATOR_NEEDED = 1;
const FINAL_OPERAND = 2;
const SOLVABLE = 3;
const INITIAL_VALUE = `0`;
let currentState = START;
let currentValue = INITIAL_VALUE;

function reset(){
    currentState = START;
    currentValue = INITIAL_VALUE;
    updateDisplay();

}
function updateDisplay(){
    // console.log('update');
    const display = document.querySelector('.display');
    display.textContent = currentValue;
}
//delete is a reserved word cannot call the function delete
function deleteFunction(){
    const display = document.querySelector('.display');
    let expression = display.textContent.split(' ');
    if (currentState === START) {
        reset();
    } else if (currentState === OPERATOR_NEEDED){
        if (expression[0].length > 1) {
            currentValue = expression[0].slice(0, -1);
            updateDisplay();
        } else {
            reset();
        }
    } else if (currentState === FINAL_OPERAND){
        currentValue = expression[0];
        currentState = OPERATOR_NEEDED;
        updateDisplay();

    } else if (currentState === SOLVABLE){
        if (expression[2].length > 1) {
            currentValue = `${expression[0]} ${expression[1]} ${expression[2].slice(0, -1)}`;
        } else {
            currentValue = `${expression[0]} ${expression[1]}`;
            currentState = FINAL_OPERAND;
        }
        updateDisplay();
    } else {
        console.error(`you've done some magic!`);
        reset();
    }
}
function evaluate(){
    if (currentState !== SOLVABLE) return;
    const display = document.querySelector('.display');
    const expression = display.textContent.split(' ');
    console.log(`Expresion = ${expression}`);
    if (isNaN(expression[0]) || isNaN(expression[2])){
        console.error(`At least one operand is not a number`);
        reset();
    };
    switch (expression[1]) {
        case '+':
            currentValue = +expression[0] + +expression[2];
            currentState = (currentValue === 0) ? START:OPERATOR_NEEDED;
            break;
        case '-':
            currentValue = +expression[0] - +expression[2];
            currentState = (currentValue === 0) ? START:OPERATOR_NEEDED;
            break;
        case '*':
            currentValue = +expression[0] * +expression[2];
            currentState = (currentValue === 0) ? START:OPERATOR_NEEDED;
            break;
        case '/':
            if (!(+expression[2] === 0)){
                currentValue = +expression[0] / +expression[2];
                currentState = (currentValue === 0) ? START:OPERATOR_NEEDED;
                break;
            } else {
                reset();
                alert('ERROR:DIVIDE_BY_ZERO  \nTo Infinity and Beyond!');
            }
            break;
    
        default:
            console.error(`you've done some magic, operator is not valid. :(`);
            reset();
            break;
    }
    updateDisplay();
}
function updateFromOperand(value){
    // console.log(`no + ${value}` );
    if (isNaN(value)) return;
    switch (currentState) {
        case START: 
            if (+value === 0) {
                reset();
            } else {
                currentValue = `${value}`;
                currentState = OPERATOR_NEEDED;
            }
            break;
        case OPERATOR_NEEDED: 
            currentValue += (currentValue.length < 10) ? `${value}` : '';
            currentState = OPERATOR_NEEDED;
            break;
        case FINAL_OPERAND: // Fallthrough
        case SOLVABLE:
            currentValue += `${value}`;
            currentState = SOLVABLE;
            break;

        default:
            console.error(`currentState is not within normal bounds: ${currentState}`);
            reset();
            break;
    }
    updateDisplay();
}
function updateFromOperator(value){
    let operator = `+`;
    switch (value) {
        case 'multiply':
            operator = `*`;
            break;
        case 'divide':
            operator = `/`;
            break;
        case 'add':
            operator = `+`;
            break;
        case 'subtract':
            operator = `-`;
            break;
        default:
            console.error('ERROR: incorrect Operator given.');
            reset();
            break;
    }
    // console.log(`operator got ${currentState}`);
    if (isNaN(currentState) || currentState > 3) {
        console.error(`currentState is not within normal bounds: ${currentState}`);
    }
    if (currentState === FINAL_OPERAND){
        const display = document.querySelector('.display');
        let value = display.textContent.split(' ');
        value[1] = operator;
        currentValue = `${value[0]} ${value[1]} `;
        updateDisplay();
    };
    if (currentState === OPERATOR_NEEDED || currentState === START) {
        currentValue += ` ${operator} `;
        currentState = FINAL_OPERAND;
        updateDisplay();
        
    };
    if (currentState === SOLVABLE){
        // evaluate and continue currentState should be FINAL_OPERAND
        evaluate();
        currentValue += ` ${operator} `;
        currentState = FINAL_OPERAND;
        updateDisplay();
    };
    
}
function setUp() {
    const operandButtons = document.querySelectorAll('.operand');
    const controlButtons = document.querySelectorAll('.control');
    const operatorButtons = document.querySelectorAll('.operator');
    const display = document.querySelector('.display');
    operandButtons.forEach(button => {
        button.addEventListener('click', ()=>{
            updateFromOperand(button.textContent);
        });
    });
    controlButtons.forEach( button => {
        button.addEventListener('click', ()=>{
            switch (button.textContent){
                case 'Delete':
                   deleteFunction();
                    break;
                case 'Enter':
                    // console.log(`button pressed ${button.textContent}`);
                    evaluate();
                    break;
                case 'Clear':
                    reset();
                    break;
                default:
                    console.error('how?');
                    reset();
                    break;

            }
        });
    });
    operatorButtons.forEach( button => {
        button.addEventListener('click', ()=>{
                updateFromOperator(button.id);
        });
    });
}
setUp();