/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { showError } from './helpers/helpers';
import { Error } from './components/Error';
import { Footer } from './components/Footer';
import { Todos } from './components/Todos';
import { Header } from './components/Header';

const USER_ID = 10881;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => (showError('Failed to get list of todos', setError)));
  }, []);

  let visibleTodos = todos;

  if (searchQuery) {
    visibleTodos = visibleTodos
      .filter(todo => (
        todo.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ));
  }

  switch (filter) {
    case 'completed':
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;

    case 'active':
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;

    default:
      break;
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={visibleTodos}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />

        <Todos todos={visibleTodos} />

        {todos.length > 0 && (
          <Footer todos={visibleTodos} filter={filter} setFilter={setFilter} />
        )}

      </div>
      <Error error={error} setError={setError} />
    </div>
  );
};
