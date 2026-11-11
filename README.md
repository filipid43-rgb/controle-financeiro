# Controle Financeiro

Aplicação web para controlar renda e gastos da família, com dashboard de gráficos e orçamento por categoria. Feita para uso no celular.

> Reescrita em **React** do projeto original em JavaScript puro ([Gastos-Familia](https://github.com/filipid43-rgb/Gastos-Familia)).

## Funcionalidades

- **Lançar** gastos e rendas (data, valor, categoria, forma de pagamento, descrição)
- **Histórico** agrupado por dia, com filtros: hoje, semana, mês e todos
- **Dashboard** com renda x gastos do mês, comparação dos últimos 6 meses e gastos por categoria
- **Orçamento** mensal por categoria, com alerta de atenção e limite excedido
- Dados salvos no próprio navegador (localStorage)

## Tecnologias

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) para as páginas
- [Recharts](https://recharts.org/) para os gráficos
- Context API para o estado global

## Como rodar

```bash
git clone https://github.com/filipid43-rgb/controle-financeiro.git
cd controle-financeiro
npm install
npm run dev
```

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Versão de produção |
| `npm run preview` | Visualiza a versão de produção |
| `npm run lint` | Verifica o código |

## Estrutura

```
src/
├── components/   # Header, Navegação, formulários, item de gasto
├── context/      # Estado global (gastos, rendas, orçamento)
├── pages/        # Lançar, Histórico, Dashboard, Orçamento
└── utils/        # Constantes, formatação, cálculos, hook de localStorage
```

## Roadmap

- [x] **Fase 1:** front-end em React com dashboard
- [ ] **Fase 2:** API em Node.js + banco de dados
- [ ] **Fase 3:** login do casal e publicação online

## Autor

**Filipi** — [GitHub](https://github.com/filipid43-rgb)
