function createNumbers (){
  let numberHolder = document.getElementById("numberHolder");
  for (let i = 0; i< 3; i++){
    let newRow = document.createElement("div");
    for (let j = 0; j< 3; j++){
      let newButton = document.createElement ("button");
      newButton.classList.add("buttonNumbers");
      newButton.textContent = i*3+j+1;
      newRow.appendChild(newButton);
    }
    numberHolder.appendChild(newRow);
  }
  
  let zeroButton = document.createElement ("button");
  zeroButton.classList.add ("zeroButton", "buttonNumbers");
  zeroButton.textContent = 0;
  numberHolder.appendChild(zeroButton);
}

function createOperands (){
  let operands = ['+', '-', '*', '/'];
  let newColumn = document.createElement ("div");
  const operandHolder = document.getElementById("operandHolder");
  //Add the + - / * buttons
  for (let i = 0; i< operands.length; i++){
    let newOperand = document.createElement ("button");
    newOperand.textContent = operands[i];
    newOperand.classList.add ("operandButtons")
    newColumn.appendChild(newOperand);
  }
  operandHolder.appendChild(newColumn);
  //Add the equals button
  let equals = document.createElement("button");
  let equalsDiv = document.getElementById("equalsHolder");
  equals.textContent = '=';
  equals.classList.add("equals");
  equalsDiv.append(equals);

  let clear = document.createElement ("button");
  clear.textContent = 'C';
  clear.classList.add("clear");
  equalsDiv.append(clear);
}

//Add eventListener for numberButtons
function updateNumbers (){
  let currentDisplayNum = "";
  let buttons = document.querySelectorAll(".buttonNumbers");
  let displayHolder = document.querySelector(".display");
  buttons.forEach(function(button){
      button.addEventListener('click', function (){
        if (displayHolder.textContent == 0){
          displayHolder.textContent = this.textContent;
        }
        else {
          displayHolder.textContent += ""+this.textContent;
        }
      });
  });
}

function operandMaker (){
  let firstValue = 0;
  let secondValue = 0;
  let operand = "";
  let firstTime = true;
  let operandButtons = document.querySelectorAll(".operandButtons");
  let displayHolder = document.querySelector(".display");
  operandButtons.forEach (function(button){
    button.addEventListener('click', function (){
      
      //Checks if first number of second number, if first then store value and reset display to 0
      //If second, compute the number and display it
        if (firstTime){
          operand = this.textContent;
          firstValue = displayHolder.textContent;
          firstTime = false;
        }
        else { //Chaining multiple operands
          secondValue = displayHolder.textContent;
          firstValue = compute (firstValue, secondValue, operand);
          operand = this.textContent;          
        }
        displayHolder.textContent = '0';
    });
  });

  let equalsButton = document.querySelector (".equals");
  equalsButton.addEventListener('click', function (){
    secondValue = displayHolder.textContent;
    result = compute (firstValue, secondValue, operand);
    displayHolder.textContent = result;
    firstTime = true;
  });

  let clearButton = document.querySelector (".clear");
  clearButton.addEventListener('click', function (){
    displayHolder.textContent = 0;
    firstValue = 0;
    secondValue = 0;
    operand = "";
  });
}

function compute (firstValue, secondValue, operand){
  switch (operand){
    case '+':
      result = add(secondValue, firstValue);
      break;
    case '-':
      result = subtract(firstValue, secondValue);
      break;
    case '*':
      result = multiply(firstValue, secondValue);
      break;
    case '/':
      if (secondValue == '0'){
        result = "ERROR";
        break;
      }
      result = divide(firstValue, secondValue);
      break;
    default:
      console.log ("DEFAULT");
      break;
    }
    return result;
}

add = (a,b) => {return parseFloat(a)+parseFloat(b)};
subtract = (a,b) => {return parseFloat(a)-parseFloat(b)};
multiply = (a,b) => {return parseFloat(a)*parseFloat(b)};
divide = (a,b) => {return Math.round((parseFloat(a)/parseFloat(b))*1000)/1000};

createNumbers();
createOperands();
updateNumbers();
operandMaker();