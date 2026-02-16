import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { FooterTodo } from './components/FooterTodo';
import { Errors } from './components/Errors';
import { HeaderTodo } from './components/HeaderTodo';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [sorted, setSorted] = useState('all');

  const todoInputRef = React.useRef<HTMLInputElement>(null);
  const activeTodos = todos.filter(t => !t.completed).length;

  const sortedTodoes = todos.filter(todo => {
    if (sorted === 'active') {
      return !todo.completed;
    }

    if (sorted === 'completed') {
      return todo.completed;
    }

    return true;
  });

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  useEffect(() => {
    if (todoInputRef.current) {
      todoInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <HeaderTodo todos={todos} todoInputRef={todoInputRef} />

        <TodoList sortedTodoes={sortedTodoes} />

        {todos.length && (
          <FooterTodo
            activeTodos={activeTodos}
            sorted={sorted}
            setSorted={setSorted}
            todos={todos}
          />
        )}
      </div>

      <Errors errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    </div>
  );
};
