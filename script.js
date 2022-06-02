class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)


    }


    //adds number to screen
    appendNumber(number) {
        //only allow 1 '.'
        if (number === '.' && this.currentOperand.includes('.')) return 
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }


    //inputs operation 
    chooseOperation(operation) {
        //ensure that there is a value before applying an operator
        if (this.currentOperand ==='') return
        //computes numbers before moving to next operand
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand =''
    }

    

    compute() {
        let computation
        //ensure that operand are floats not strings
        const prev= parseFloat(this.previousOperand)
        const current= parseFloat(this.currentOperand)
        // if there are no values in previous Operand or current Operand clicking equals will not run the compute
        if (isNaN(prev) || isNaN(current)) return
        
        //use a switch statement which is a bunch of if statements chain together and a switch statement allows to run the statement on a single object in this case the this.operation
        //if the this.operation is a '+' then sum the values
        switch (this.operation) {
            case '+':
                computation= prev + current
                // break makes is such that you dont follow other switch statements
                break
            case '-':
                computation= prev - current
                // break makes is such that you dont follow other switch statements
                break
            case '*':
                computation= prev * current
                // break makes is such that you dont follow other switch statements
                break
            case '÷':
                computation= prev / current
                // break makes is such that you dont follow other switch statements
                break
           
            default :
                return

        }
        this.currentOperand = computation
        this.operation= undefined
        this.previousOperand= ''

    }

    getDisplayNumber(number) {
        const stringNumber= number.toString()
        const integerDigits= parseFloat(stringNumber.split('.')[0])
        const decimalDigits= stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay =''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 }) // there can only be 1 decimal point
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
          }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null){ 
        this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        }else {
            this.previousOperandTextElement.innerText = ''
        }
    }


}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')



const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        //on clicking an operation include it in the calculator so that this.operation = operation and update display
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    //when clicking equals it will call the compute function
    calculator.compute() 
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    //when clicking equals it will call the compute function
    calculator.clear() 
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    //when clicking equals it will call the compute function
    calculator.delete() 
    calculator.updateDisplay()
})