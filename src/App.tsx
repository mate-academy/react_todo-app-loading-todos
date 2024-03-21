import React from 'react';
import { TodosContextProvider } from './components/TodosContext/TodosContext';
import { TodoApp } from './components/TodoApp/TodoApp';

export const App: React.FC = () => (
  <TodosContextProvider>
    <TodoApp />
  </TodosContextProvider>
);
