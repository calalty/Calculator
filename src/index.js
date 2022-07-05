class Calculator {

    constructor(prevOperandTextEl, currOperandTextEl) {
        this.prevOperandTextEl = prevOperandTextEl
        this.currOperandTextEl = currOperandTextEl
        this.clear()
    }

    updateDisplay() {
        this.currOperandTextEl.textContent = this.getDisplayNumber(this.currOperand)
        if(this.operation != null) {
        this.prevOperandTextEl.textContent = `${this.prevOperand} ${this.operation}`
        } else {
            this.prevOperandTextEl.innerText = ''
        }
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('eng', {maximumFractionDigits: 0})
        }

        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    clear() {
        this.currOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }

    append(number) {
        if (number === '.' && this.currOperand.includes('.')) return
        this.currOperand += number.toString()
    }

    delete() {
       this.currOperand.toString().slice(0, -1)
    }

    chooseOperation(operation) {
        if (this.currOperand === '') return
        if (this.prevOperand !== '') {
            this.calculate()
        }
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ''
    }

    calculate() {
        let calculation
        const prev = parseFloat(this.prevOperand)
        const current = parseFloat(this.currOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+': calculation = prev + current
                break
            case '-': calculation = prev - current
                break
            case '%': calculation = prev / current
                break
            case '*': calculation = prev * current
                break
            default:
                return
        }
        this.currOperand = calculation
        this.operation = undefined
        this.prevOperand = ''
    }

}

const numberBtns = document.querySelectorAll('[data-number]')
const operationBtns = document.querySelectorAll('[data-operation]')
const equalsBtn = document.querySelector('[data-equals]')
const deleteBtn = document.querySelector('[data-delete]')
const allClearBtn = document.querySelector('[data-all-clear]')
const prevOperandTextEl = document.querySelector('[data-previous-operand]')
const currOperandTextEl = document.querySelector('[data-current-operand]')

const calculator = new Calculator(prevOperandTextEl, currOperandTextEl)

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.append(button.textContent)
        calculator.updateDisplay()
    })
})

operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.textContent)
        calculator.updateDisplay()
    })
})

equalsBtn.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateDisplay()
})

allClearBtn.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

