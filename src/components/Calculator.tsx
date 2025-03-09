
import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [currentOperand, setCurrentOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState<number>(0);

  const clearAll = () => {
    setDisplay('0');
    setCurrentOperand(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const appendDigit = (digit: string) => {
    if (display === '0' || waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display + digit);
    }
  };

  const appendDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay((-value).toString());
  };

  const percentage = () => {
    const value = parseFloat(display);
    setDisplay((value / 100).toString());
  };

  const performOperation = (nextOperator: string | null) => {
    const inputValue = parseFloat(display);

    if (currentOperand === null) {
      setCurrentOperand(inputValue);
    } else if (operator) {
      const result = calculate(currentOperand, inputValue, operator);
      setDisplay(String(result));
      setCurrentOperand(result);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand: number, secondOperand: number, op: string): number => {
    switch (op) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return secondOperand !== 0 ? firstOperand / secondOperand : NaN;
      case 'sqrt':
        return Math.sqrt(firstOperand);
      default:
        return secondOperand;
    }
  };

  const handleMemoryRecall = () => {
    setDisplay(memory.toString());
    setWaitingForOperand(true);
  };

  const handleMemoryClear = () => {
    setMemory(0);
  };

  const handleMemoryAdd = () => {
    setMemory(memory + parseFloat(display));
  };

  const handleMemorySubtract = () => {
    setMemory(memory - parseFloat(display));
  };

  const handleSquareRoot = () => {
    const inputValue = parseFloat(display);
    const result = Math.sqrt(inputValue);
    setDisplay(String(result));
    setCurrentOperand(result);
    setWaitingForOperand(true);
  };

  const handleBackspace = () => {
    if (display.length > 1 && display !== '0') {
      setDisplay(display.substring(0, display.length - 1));
    } else {
      setDisplay('0');
    }
  };

  return (
    <div className="p-2 h-full flex flex-col">
      <div className="win95-inset mb-2 p-2 bg-white text-right font-mono overflow-hidden">
        {display}
      </div>
      
      <div className="grid grid-cols-5 gap-1">
        <button className="win95-button py-1" onClick={handleMemoryClear}>MC</button>
        <button className="win95-button py-1" onClick={handleMemoryRecall}>MR</button>
        <button className="win95-button py-1" onClick={handleMemoryAdd}>M+</button>
        <button className="win95-button py-1" onClick={handleMemorySubtract}>M-</button>
        <button className="win95-button py-1" onClick={handleBackspace}>←</button>
        
        <button className="win95-button py-1" onClick={clearEntry}>CE</button>
        <button className="win95-button py-1" onClick={clearAll}>C</button>
        <button className="win95-button py-1" onClick={toggleSign}>±</button>
        <button className="win95-button py-1" onClick={handleSquareRoot}>√</button>
        <button className="win95-button py-1" onClick={() => performOperation('/')}>÷</button>
        
        <button className="win95-button py-1" onClick={() => appendDigit('7')}>7</button>
        <button className="win95-button py-1" onClick={() => appendDigit('8')}>8</button>
        <button className="win95-button py-1" onClick={() => appendDigit('9')}>9</button>
        <button className="win95-button py-1" onClick={() => performOperation('*')}>×</button>
        <button className="win95-button py-1" onClick={percentage}>%</button>
        
        <button className="win95-button py-1" onClick={() => appendDigit('4')}>4</button>
        <button className="win95-button py-1" onClick={() => appendDigit('5')}>5</button>
        <button className="win95-button py-1" onClick={() => appendDigit('6')}>6</button>
        <button className="win95-button py-1" onClick={() => performOperation('-')}>-</button>
        <button className="win95-button py-1" onClick={() => appendDigit('0')}>0</button>
        
        <button className="win95-button py-1" onClick={() => appendDigit('1')}>1</button>
        <button className="win95-button py-1" onClick={() => appendDigit('2')}>2</button>
        <button className="win95-button py-1" onClick={() => appendDigit('3')}>3</button>
        <button className="win95-button py-1" onClick={() => performOperation('+')}>+</button>
        <button className="win95-button py-1" onClick={appendDecimal}>.</button>
        
        <button className="win95-button py-1 col-span-5" onClick={() => performOperation(null)}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
