/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { Header } from './Components/Header';
import { Main } from './Components/Main';
import { Footer } from './Components/Footer';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

const USER_ID = 10307;

enum Errors {
  Loading = 'Unable to load todos',
  Posting = 'Unable to add a todo',
  Editing = 'Unable to update a todo',
  Deleting = 'Unable to delete a todo',
  None = '',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<Errors>(Errors.None);
  const [filter, setFilter] = useState(Filter.All);

  const filterTodos = useMemo(() => {
    return todos?.filter((todo) => {
      switch (filter) {
        case Filter.All:
          return todo;

        case Filter.Active:
          return !todo.completed;

        case Filter.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  }, [todos, filter]);

  useEffect(() => {
    getTodos(USER_ID)
      .then((todosList) => {
        setTodos(todosList);
      })
      .catch(() => {
        setError(Errors.Loading);
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && <Main todos={filterTodos} />}

        {todos.length > 0 && <Footer filter={filter} onSelect={setFilter} />}
      </div>

      {error && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button
            type="button"
            onClick={() => setError(Errors.None)}
            className="delete"
          />

          {error}
        </div>
      )}
    </div>
  );
};
