# Stock Manager (Client) 🚀

Cliente front-end em React para gerenciar inventário. Desenvolvido para evoluir minhas habilidades em front-end e consumindo uma API separada: **stock-manager-api** (repositório à parte).

---

## ✨ O que este projeto faz
- Listar, visualizar, criar, atualizar e excluir itens.
- Dashboard com métricas (total, diversidade por categoria, itens recentes, itens com pouco estoque).
- Tabelas com paginação (TableIndex), listagem de itens recentes e itens com pouco estoque.
- Formulários para criar/editar itens (ItemForm).
- Formatação de datas e valores (dayjs, currency.js).
- Comunicação com backend via camada em src/lib/* (itemsLib, categoriesLib, stockLib).

---

## 🧰 Tecnologias realmente usadas
- React 19 (componentes funcionais)
- Vite (dev server / build)
- react-router-dom (rotas entre páginas)
- Context API + hook customizado (src/contexts/StockContext.jsx e src/hooks/useStock.js)
- React hooks: useState, useEffect, useContext (e hooks customizados)
- dayjs — formatação de datas
- currency.js — formatação de valores monetários
- Camada de controllers em src/lib para chamadas HTTP

Arquitetura do código: componentização (src/components), pages (src/pages, src/pages/items), contexto para injeção de controllers e roteamento (router.jsx).

---

## 📁 Estrutura importante
- src/
  - components/ — ItemsTable, RecentItemsTable, RunningOutItemsTable, ItemForm, TableIndex
  - hooks/ — useStock.js
  - lib/ — itemsLib.js, categoriesLib.js, stockLib.js
  - contexts/ — StockContext.jsx
  - pages/ — Home.jsx, items/ (ListItems, ShowItem, CreateItem, UpdateItem)
  - router.jsx, main.jsx, App.jsx

---

## ⚙️ Requisitos
- Node.js >= 14
- NPM ou Yarn
- Backend rodando (stock-manager-api) — garanta que a API esteja disponível localmente ou em um endpoint acessível

---

## 🔗 Integração com stock-manager-api
O cliente consome a API do repositório separado **stock-manager-api**.

---

## ✅ O que aprendi / por que fiz
Projeto para praticar React moderno: componentização, hooks (incl. custom hooks), Context API, roteamento e integração com uma API real — focando em UX e gerenciamento de estado simples (paginação, refetch, atualizações após mutações).
