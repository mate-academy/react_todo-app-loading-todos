/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoApp } from './components/TodoApp';
import { TodosContextProvider } from './components/store';

export const App: React.FC = () => (
  <TodosContextProvider>
    <TodoApp />
  </TodosContextProvider>
);
