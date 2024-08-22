/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Header } from './components/header';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Error } from './components/Error';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filter === 'active') {
        return !todo.completed;
      }

      if (filter === 'completed') {
        return todo.completed;
      }

      return true;
    });
  }, [todos, filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />
        <TodoList todos={filteredTodos} />

        {!!todos.length && (
          <Footer todos={todos} onFilter={setFilter} filter={filter} />
        )}
      </div>
      <Error errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    </div>
  );
};
