/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Header } from './Components/Header';
import { Main } from './Components/Main';
import { Footer } from './Components/Footer';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

const USER_ID = 10307;

type Errors = {
  loading?: boolean;
  posting?: boolean;
  editing?: boolean;
  deleting?: boolean;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [errors, setErrors] = useState<Errors | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  useEffect(() => {
    getTodos(USER_ID)
      .then((todosList) => {
        setTodos(todosList);
      })
      .catch(() => {
        setErrors({ loading: true });
      });
  }, []);

  const filterTodos = todos?.filter((todo) => {
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

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos?.length && <Main filteredTodos={filterTodos} />}

        {todos?.length && <Footer filter={filter} setFilter={setFilter} />}
      </div>

      {errors && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button
            type="button"
            onClick={() => setErrors(null)}
            className="delete"
          />
          {errors?.loading && 'Unable to load todos'}
          {errors?.posting && 'Unable to add a todo'}
          {errors?.editing && 'Unable to update a todo'}
          {errors?.deleting && 'Unable to delete a todo'}
        </div>
      )}
    </div>
  );
};
