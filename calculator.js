let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen')

function buttonClick(value){
    if (isNaN(value)) { 
        handleSymbol(value)  
    }
    else {
        handleNumber(value)
    }
    screen.innerText = buffer;
};

function handleSymbol (symbol) {
    switch(symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0
            break;
        case '+':
            handleMath(symbol);
            break;
        case '\u2212':
            handleMath(symbol);
            break;
        case '\u00D7':
            handleMath(symbol);
            break;
        case '÷' :
            handleMath(symbol);
            break;
        // unicode for '=' '\u003D'
        case '\u003D':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer))
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
    }  

}

function handleMath(symbol) {
    if (buffer === "0") {
        // do nothing
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    }
    else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;

    buffer = '0'; 
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    }
    else if (previousOperator === '\u2212') { 
        runningTotal -= intBuffer;
    }
    else if (previousOperator === '\u00D7') {
        runningTotal *= intBuffer;
    }
    else {
        runningTotal /= intBuffer;
    }
}


function handleNumber (numberString){
    if (buffer === '0' | runningTotal === 0) {
        buffer = numberString;
    } 
    else {
        buffer += numberString;
    }
}



function init() {
document.querySelector('.calc-buttons')
    .addEventListener('click', function(event) {
        buttonClick(event.target.innerText)
    }) 
}

init();

