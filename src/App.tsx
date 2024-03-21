/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoApp } from './components/TodoApp';
import { TodosContextProvider } from './components/TodosContext';

export const App: React.FC = () => {
  return (
    <TodosContextProvider>
      <TodoApp />
    </TodosContextProvider>
  );
};
