import React from 'react';
import { TodoApp } from './components/TodoApp/TodoApp';
import { TodosContextProvider } from './components/TodosContext/TodosContext';

export const App: React.FC = () => (
  <TodosContextProvider>
    <TodoApp />
  </TodosContextProvider>
);
