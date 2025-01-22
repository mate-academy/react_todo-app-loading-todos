/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getPreparedTodos } from './utils/todoFilter';
import * as todoService from './api/todos';

import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

import { Notification } from './components/Error';
import { Footer } from './components/Footer';
import { TodoForm } from './components/Header';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filterBy, setFilterBy] = useState(Filter.All);

  const preparedTodos = getPreparedTodos(todos, filterBy);
  const completedTodos = todos.filter(todo => todo.completed);
  const todoCount = todos.length - completedTodos.length;

  const loadTodos = () => {
    setErrorMessage('');
    todoService
      .getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'))
      .then(() => {
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  };

  useEffect(loadTodos, []);

  if (!todoService) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <TodoForm todos={todos} />
        </header>

        <TodoList preparedTodos={preparedTodos} errorMessage={errorMessage} />

        {!errorMessage && (
          <Footer
            todos={todos}
            errorMessage={errorMessage}
            setFilterBy={setFilterBy}
            filterBy={filterBy}
            todoCount={todoCount}
          />
        )}
      </div>

      <Notification
        errorMessage={errorMessage}
        onClose={() => setErrorMessage('')}
      />
    </div>
  );
};
