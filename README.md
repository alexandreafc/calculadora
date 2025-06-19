# Calculadora React

Uma calculadora moderna desenvolvida com React, TypeScript e Tailwind CSS.

## Funcionalidades

- ✅ Operações básicas (adição, subtração, multiplicação, divisão)
- ✅ Interface moderna e responsiva
- ✅ Histórico de cálculos
- ✅ Suporte a tema claro/escuro
- ✅ Componentes reutilizáveis com shadcn/ui

## Tecnologias Utilizadas

- React 18
- TypeScript
- Tailwind CSS
- Vite
- shadcn/ui
- Lucide React (ícones)

## Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/alexandreafc/calculadora.git
cd calculadora
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm run dev
```

4. Abra o navegador em `http://localhost:5173`

## Estrutura do Projeto

```
src/
├── components/
│   ├── Calculator.tsx    # Componente principal da calculadora
│   └── ui/              # Componentes de UI reutilizáveis
├── lib/
│   └── utils.ts         # Utilitários
├── globals.css          # Estilos globais
└── main.tsx            # Ponto de entrada da aplicação
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linter

## Licença

MIT