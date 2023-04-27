const START = 0;
const OPERATOR_NEEDED = 1;
const FINAL_OPERAND = 2;
const SOLVABLE = 3;
const INITIAL_STATE = {
    state: START,
    firstOperand: 0,
    operator: null,
    secondOperand: null,

};
Object.freeze(INITIAL_STATE);
let currentState = Object.assign({}, INITIAL_STATE);

function reset(){
    console.log(`initial state: ${INITIAL_STATE.firstOperand}`);
    console.log(`current state: ${currentState.firstOperand}`);
    currentState = Object.assign({}, INITIAL_STATE);
    console.log(`current state post update: ${currentState.firstOperand}`);
    updateDisplay();

}
function updateDisplay(){
    console.log('update');
    const display = document.querySelector('.display');
    const firstOperand = isNaN(currentState.firstOperand) ? 'Error, magic has happened.' : +currentState.firstOperand;
    const operator = currentState.operator ? currentState.operator: '';
    const secondOperand = currentState.secondOperand ? currentState.secondOperand: '';
    console.log( `${firstOperand} ${operator} ${secondOperand}`)
    display.textContent = `${firstOperand} ${operator} ${secondOperand}`;
}
//delete is a reserved word cannot call the function delete
function deleteFunction(){
    // TO DO: decrement most recent value and the currentState.state as needed
}
function updateStateNumber(value){
    console.log('no');
    if (isNaN(value)) return;
    switch (currentState.state) {
        case START:
            console.log('hi');
            currentState.firstOperand = value;
            currentState.state = OPERATOR_NEEDED;
            updateDisplay();
            break;
        case OPERATOR_NEEDED:
        
            break;
        case FINAL_OPERAND:
        
            break;
        case SOLVABLE:
            
            break;
        default:
            break;
    }
}
function setUp() {
    const operandButtons = document.querySelectorAll('.operand');
    const controlButtons = document.querySelectorAll('.control');
    const operatorButtons = document.querySelectorAll('.operator');
    const display = document.querySelector('.display');
    operandButtons.forEach(button => {
        button.addEventListener('click', ()=>{
            updateStateNumber(button.textContent);
            // if (+display.textContent === 0) {
            //     display.textContent = button.textContent;
            // } else {
            // display.textContent += button.textContent;
            // }
        });
    });
    controlButtons.forEach( button => {
        button.addEventListener('click', ()=>{
            switch (button.textContent){
                case 'Delete':
                   deleteFunction();
                    break;
                case 'Enter':
                    console.log(`button pressed ${button}`)
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
            switch (button.id){
                case 'multiply':
                    console.log(`${button.id} button pressed`)
                    break;
                case 'divide':
                    console.log(`${button.id} button pressed`)
                    break;
                case 'add':
                    console.log(`${button.id} button pressed`)
                    break;
                case 'subtract':
                    console.log(`${button.id} button pressed`)
                    break;
                default:
                    console.error('how?');
                    break;

            };
        });
    });
}
setUp();