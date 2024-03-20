/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';

import * as todoService from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { TodoList } from './components/TodoList';
import { NotificationHandler } from './components/NotificationHandler';
import { getFilteredTodos } from './services/filteredTodos';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.ALL);
  const [errorMessage, setErrorMessage] = useState('');

  const reset = () => setErrorMessage('');

  useEffect(() => {
    reset();

    todoService
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        const timer = window.setTimeout(reset, 3000);

        return () => clearTimeout(timer);
      });
  }, []);

  const filteredTodos = getFilteredTodos(todos, filter);
  const activeTodos = todos.filter(({ completed }) => !completed);
  const hasEveryCompletedTodo = todos.every(({ completed }) => completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header hasEveryCompletedTodo={hasEveryCompletedTodo} />

        <TodoList todos={filteredTodos} />

        {!!todos.length && (
          <Footer
            activeTodos={activeTodos}
            currentFilter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      <NotificationHandler errorMessage={errorMessage} />
    </div>
  );
};
