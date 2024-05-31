const num = document.body.querySelectorAll('.num')
const clear = document.body.querySelector('.clear')
const del = document.body.querySelector('.del')
const opt = document.body.querySelectorAll('.opt')
const prev = document.body.querySelector('.prev')
const curr = document.body.querySelector('.curr')
const equal = document.body.querySelector('.equal')
const error = document.body.querySelector('.error')
let checkOpt = false, checkEqual = false
let operation, prevOperand, currOperand

function reset() {
    error.textContent = ''
    prev.textContent = ''
    prevOperand = undefined
}

function chooseOperand(operand) {
    // console.log(prevOperand)
    if (prevOperand !== undefined && !checkOpt) {
        // console.log('hey')
        evaluate()
    }

    operation = operand
    prevOperand = curr.textContent
    // console.log(operation)
    // console.log(prevOperand)
    // currOperand = ''

}
function evaluate() {
    // console.log(operation)
    let ans = 0
    switch (operation) {
        case '+':
            ans = parseFloat(prevOperand) + parseFloat(curr.textContent)
            break;
        case '-':
            ans = parseFloat(prevOperand) - parseFloat(curr.textContent)
            break;
        case 'x':
            ans = parseFloat(prevOperand) * parseFloat(curr.textContent)
            break;
        case '÷':
            ans = parseFloat(prevOperand) / parseFloat(curr.textContent)
            break
    }
    // console.log(parseFloat(prev.textContent))
    // console.log(ans)
    // prev.textContent = `${ans} ${operation}`
    // curr.textContent = ans
    curr.textContent = ans
    // operation = undefined
    // prev.textContent = `${ans} ${operand}`
    // prevOperand = ''
}

function appendNumber(number) {
    if (number === '.' && curr.textContent.includes('.')) return

    curr.textContent += number
}

num.forEach((buttons) => {
    buttons.addEventListener('click', function () {
        error.textContent = ''
        if (checkOpt || checkEqual) {
            curr.textContent = ''
            checkOpt = false
            checkEqual = false
        }
        // curr.textContent += buttons.value
        appendNumber(buttons.value)
    })
})

opt.forEach((buttons) => {
    buttons.addEventListener('click', () => {

        if (isNaN(curr.textContent) || curr.textContent === '') error.innerHTML = "<small><i>Please enter a number first</i></small>"

        // else evaluate(buttons.value)
        else {
            chooseOperand(buttons.value)
            prev.textContent = `${curr.textContent} ${buttons.value}`
            // prev.textContent = `${curr.textContent} ${buttons.value}`
        }
        checkOpt = true
    })
})

clear.addEventListener('click', () => {
    curr.textContent = ''
    reset()
})

del.addEventListener('click', () => {
    if (checkEqual) curr.textContent = 0
    else curr.textContent = curr.textContent.toString().slice(0, -1)
})

equal.addEventListener('click', () => {
    if (checkOpt) error.innerHTML = "<small><i>Please enter a number first</i></small>"

    else {
        checkEqual = true
        chooseOperand(operation)
        reset()
    }
})
