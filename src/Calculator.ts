// Este arquivo parece ser um arquivo TypeScript adicional
// Baseado na estrutura do projeto, este pode ser um arquivo de tipos ou utilitários
// Como não temos o conteúdo específico, vou criar um arquivo básico

export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: string | null;
  waitingForOperand: boolean;
}

export type CalculatorOperation = '+' | '-' | '×' | '÷';

export interface CalculationHistory {
  expression: string;
  result: number;
  timestamp: Date;
}