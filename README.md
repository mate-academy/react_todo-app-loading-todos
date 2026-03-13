# React Todo App – Load Todos

Aplicação React que consome uma API REST para carregar, exibir e filtrar tarefas (todos) de um usuário específico.
Projeto focado em integração com API, controle de estado, tratamento de erros e boas práticas de UX.

## 🔗 Demo

[DEMO LINK](https://Igor-hrm.github.io/react_todo-app-loading-todos/)

## 🛠 Tecnologias

- React
- TypeScript
- REST API
- CSS (Bulma)
- Cypress (testes E2E)

---

## 🚀 Funcionalidades implementadas

### ✅ Load Todos

- Carregamento automático dos todos ao iniciar a aplicação
- Integração com API utilizando `userId`
- Delay simulado nas requisições (100–200ms)
- Lista e footer ocultos quando não há tarefas

---

### ⚠️ Tratamento de Erros

- Exibição de notificação em caso de erro na API
- Botão para fechar manualmente
- Auto-hide após 3 segundos
- Erro é resetado antes de novas requisições
- Uso de classe `hidden` (sem conditional rendering)

---

### 🔎 Filtro por Status

- Filtro por:
  - All
  - Active
  - Completed
- Link selecionado recebe classe `selected`
- Atualização dinâmica da lista sem nova requisição

---

### ⏳ UX Improvements

- Loader exibido durante carregamento
- `TodoLoader` presente no DOM conforme esperado pelos testes
- Interface bloqueada durante requisições
- Atualização apenas após sucesso da API

---

## 🧠 Aprendizados

- Uso correto de `useEffect` para requisições assíncronas
- Controle de estado global no `App`
- Manipulação de erros com `try/catch`
- Boas práticas para passar nos testes automatizados
- Organização de componentes e separação de responsabilidades

---

## 📦 Próxima etapa

Este projeto faz parte de uma sequência:

1. ✅ Load Todos (este repositório)
2. ➡ Add and Delete
3. ➡ Toggle and Rename

---

## 📌 Autor

Desenvolvido por **Igor Rocha**
