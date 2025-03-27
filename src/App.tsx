/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

import { Header } from './components/Header';
import { ErrorInfo } from './components/ErrorInfo';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';

const getFilteredTodos = (todos: Todo[], filter: FilterType) => {
  const filteredTodos = [...todos];

  switch (filter) {
    case 'all':
      return filteredTodos;
    case 'active':
      return filteredTodos.filter(todo => !todo.completed);
    case 'completed':
      return filteredTodos.filter(todo => todo.completed);
    default:
      return filteredTodos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [error, setError] = useState('');
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getTodos()
      .then(response => {
        setTodos(response);
      })
      .catch(() => setError('Unable to load todos'))
      .finally(() => setLoad(false));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = getFilteredTodos(todos, filter);

  const counter = todos.filter(todo => !todo.completed).length;

  const isAllCompleted = todos.every(todo => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header isAllCompleted={isAllCompleted} />

        <TodoList todos={filteredTodos} load={load} />

        {todos.length > 0 && (
          <Footer filter={filter} onFilter={setFilter} counter={counter} />
        )}
      </div>

      <ErrorInfo errorMessage={error} setError={setError} />
    </div>
  );
};
