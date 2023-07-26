import React from 'react';
import { TodoApp } from './components/TodoApp/TodoApp';
import { TodoProvider } from './components/TodoContext/TodoContext';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};
