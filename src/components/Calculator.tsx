import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { History, Trash2 } from 'lucide-react';

/**
 * Componente principal da calculadora
 * Gerencia o estado da calculadora, histórico e operações matemáticas
 */
const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  /**
   * Atualiza o display da calculadora
   * @param value - Valor a ser exibido
   */
  const updateDisplay = (value: string) => {
    setDisplay(value);
  };

  /**
   * Manipula a entrada de números
   * @param num - Número digitado
   */
  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      updateDisplay(num);
      setWaitingForOperand(false);
    } else {
      updateDisplay(display === '0' ? num : display + num);
    }
  };

  /**
   * Manipula a entrada de ponto decimal
   */
  const inputDecimal = () => {
    if (waitingForOperand) {
      updateDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      updateDisplay(display + '.');
    }
  };

  /**
   * Limpa a calculadora
   */
  const clear = () => {
    updateDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  /**
   * Executa operações matemáticas
   * @param firstValue - Primeiro valor
   * @param secondValue - Segundo valor
   * @param operation - Operação a ser executada
   * @returns Resultado da operação
   */
  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  /**
   * Manipula operações matemáticas
   * @param nextOperation - Próxima operação
   */
  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      updateDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  /**
   * Manipula o botão de igual
   */
  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      const calculation = `${previousValue} ${operation} ${inputValue} = ${newValue}`;
      
      setHistory(prev => [calculation, ...prev]);
      updateDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  /**
   * Limpa o histórico
   */
  const clearHistory = () => {
    setHistory([]);
  };

  /**
   * Alterna a exibição do histórico
   */
  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="flex gap-4 p-4 max-w-4xl mx-auto">
      {/* Calculadora Principal */}
      <Card className="w-80">
        <CardHeader>
          <CardTitle className="text-center">Calculadora</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Display */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-right text-2xl font-mono min-h-[60px] flex items-center justify-end">
            {display}
          </div>

          {/* Botões */}
          <div className="grid grid-cols-4 gap-2">
            {/* Primeira linha */}
            <Button variant="outline" onClick={clear} className="col-span-2">
              Clear
            </Button>
            <Button variant="outline" onClick={toggleHistory}>
              <History className="w-4 h-4" />
            </Button>
            <Button variant="outline" onClick={() => performOperation('÷')}>
              ÷
            </Button>

            {/* Segunda linha */}
            <Button variant="outline" onClick={() => inputNumber('7')}>
              7
            </Button>
            <Button variant="outline" onClick={() => inputNumber('8')}>
              8
            </Button>
            <Button variant="outline" onClick={() => inputNumber('9')}>
              9
            </Button>
            <Button variant="outline" onClick={() => performOperation('×')}>
              ×
            </Button>

            {/* Terceira linha */}
            <Button variant="outline" onClick={() => inputNumber('4')}>
              4
            </Button>
            <Button variant="outline" onClick={() => inputNumber('5')}>
              5
            </Button>
            <Button variant="outline" onClick={() => inputNumber('6')}>
              6
            </Button>
            <Button variant="outline" onClick={() => performOperation('-')}>
              -
            </Button>

            {/* Quarta linha */}
            <Button variant="outline" onClick={() => inputNumber('1')}>
              1
            </Button>
            <Button variant="outline" onClick={() => inputNumber('2')}>
              2
            </Button>
            <Button variant="outline" onClick={() => inputNumber('3')}>
              3
            </Button>
            <Button variant="outline" onClick={() => performOperation('+')}>
              +
            </Button>

            {/* Quinta linha */}
            <Button variant="outline" onClick={() => inputNumber('0')} className="col-span-2">
              0
            </Button>
            <Button variant="outline" onClick={inputDecimal}>
              .
            </Button>
            <Button variant="default" onClick={handleEquals}>
              =
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Painel de Histórico */}
      {(showHistory || history.length > 0) && (
        <Card className="w-80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Histórico</CardTitle>
            <Button variant="ghost" size="sm" onClick={clearHistory}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              {history.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Nenhum cálculo realizado</p>
              ) : (
                <div className="space-y-2">
                  {history.map((calculation, index) => (
                    <div
                      key={index}
                      className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm font-mono"
                    >
                      {calculation}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Calculator;