import React,{useState} from "react";
import './App.css'


function Calculator() {
    const [exp,setExp] = useState('');
    
    const [result,setResult] = useState('');

    function evaluateExpression(expression) {
        const operators = {
          '+': (a, b) => a + b,
          '-': (a, b) => a - b,
          '*': (a, b) => a * b,
          '/': (a, b) => a / b,
        };
        
        const precedence = {
          '+': 1,
          '-': 1,
          '*': 2,
          '/': 2,
        };
        
        const tokens = expression.match(/(\d+|\+|\-|\*|\/|\(|\))/g);
        const output = [];
        const operatorsStack = [];
        
        for (let i = 0; i < tokens.length; i++) {
          const token = tokens[i];
          
          if (/\d+/.test(token)) {
            output.push(parseInt(token));
          } else if (operators[token]) {
            while (operatorsStack.length > 0 && operatorsStack[operatorsStack.length - 1] !== '(' && precedence[operatorsStack[operatorsStack.length - 1]] >= precedence[token]) {
              output.push(operators[operatorsStack.pop()](output.pop(), output.pop()));
            }
            operatorsStack.push(token);
          } else if (token === '(') {
            operatorsStack.push(token);
          } else if (token === ')') {
            while (operatorsStack[operatorsStack.length - 1] !== '(') {
              output.push(operators[operatorsStack.pop()](output.pop(), output.pop()));
            }
            operatorsStack.pop();
          }
        }
        
        while (operatorsStack.length > 0) {
          output.push(operators[operatorsStack.pop()](output.pop(), output.pop()));
        }
        
        return Math.floor(output[0]);
      }
      

  return (
    <div class="calculator">
        <span class="logo">Casio</span>
        <span class="model">fx-82MS</span>
        <span class="svpam">S-V.P.A.M.</span>
        
        <div class="screen">
            <div class="input">{exp}</div>
            <div class="main-display">{result}</div>
        </div>
        
        <div class="modifiers">
            <button class="shift center-shift" tabindex="1"></button>
            <button class="alpha center-alpha" tabindex="2"></button>
            <button class="on center-shift" tabindex="4"></button>
            <button class="mode" tabindex="3"></button>
        </div>
        
        <div class="replay">Replay</div>
    
        <table class="function-keys">
            <tr>
                <td><button class="reciprocal center-shift">x<span class="sup">-1</span></button></td>
                <td><button class="combin center-shift">nCr</button></td>
                <td></td>
                <td></td>
                <td><button class="pol">Pol(</button></td>
                <td><button class="cube center-shift">x<span class="sup">3</span></button></td>
            </tr>
            <tr>
                <td><button class="frac center-shift">a<span class="sup">b</span>/<span class="xxs">c</span></button></td>
                <td><button>&radic;</button></td>
                <td><button class="square">x<span class="sup">2</span></button></td>
                <td><button class="pow center-shift">^</button></td>
                <td><button class="log center-shift">log</button></td>
                <td><button class="ln">ln</button></td>
            </tr>
            <tr>
                <td><button class="minus">(&minus;)</button></td>
                <td><button class="deg">&deg;&prime;&Prime;</button></td>
                <td><button class="hyp">hyp</button></td>
                <td><button class="sin">sin</button></td>
                <td><button class="cos">cos</button></td>
                <td><button class="tan">tan</button></td>
            </tr>
            <tr>
                <td><button class="rcl center-shift">RCL</button></td>
                <td><button class="eng center-shift">ENG</button></td>
                <td><button class="open-paren">(</button></td>
                <td><button class="close-paren">)</button></td>
                <td><button class="comma">,</button></td>
                <td><button class="mem-plus">M+</button></td>
            </tr>
        </table>
        
        <table class="basic-keys">
            <tr>
                <td><button onClick={()=>{setExp(exp +'7')}}>7</button></td>
                <td><button onClick={()=>{setExp(exp +'8')}}>8</button></td>
                <td><button onClick={()=>{setExp(exp +'9')}}>9</button></td>
                <td><button class="pink del center-shift">DEL</button></td>
                <td><button onClick={()=>{setExp('');setResult('')}} class="pink ac center-shift">AC</button></td>
            </tr>
            <tr>
                <td><button onClick={()=>{setExp(exp +'4')}}>4</button></td>
                <td><button onClick={()=>{setExp(exp +'5')}}>5</button></td>
                <td><button onClick={()=>{setExp(exp +'6')}}>6</button></td>
                <td><button onClick={()=>{setExp(exp +'*')}}>*</button></td>
                <td><button onClick={()=>{setExp(exp +'/')}}>&divide;</button></td>
            </tr>
            <tr>
                <td><button onClick={()=>{setExp(exp +'1')}} class="one center-shift">1</button></td>
                <td><button onClick={()=>{setExp(exp +'2')}} class="two center-shift">2</button></td>
                <td><button onClick={()=>{setExp(exp +'3')}}>3</button></td>
                <td><button onClick={()=>{setExp(exp +'+')}}>+</button></td>
                <td><button onClick={()=>{setExp(exp +'-')}}>-</button></td>
            </tr>
            <tr>
                <td><button onClick={()=>{setExp(exp +'0')}} class="zero center-shift">0</button></td>
                <td><button onClick={()=>{setExp(exp +'.')}} class="period center-shift">.</button></td>
                <td><button class="exp center-shift">EXP</button></td>
                <td><button class="ans center-shift">Ans</button></td>
                <td><button onClick={()=>{setResult(evaluateExpression(exp))}}  class="equals center-shift">=</button></td>
            </tr>
        </table>
    </div>
  );
}

export default Calculator;
