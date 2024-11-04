/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { FilterStatus } from '../src/types/FilterStatus';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { getTodos } from './api/todos';
import classNames from 'classnames';
import { ErrorNotification } from './types/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);
  const [errorNotification, setErrorNotification] = useState<string | null>(
    null,
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorNotification(ErrorNotification.loadingError);
        setTimeout(() => setErrorNotification(null), 3000);
      });
  }, []);

  const filterTodosByStatus = useCallback(() => {
    let filtered;

    switch (filter) {
      case FilterStatus.Active:
        filtered = todos.filter(todo => !todo.completed);
        break;
      case FilterStatus.Completed:
        filtered = todos.filter(todo => todo.completed);
        break;
      default:
        filtered = todos;
    }

    setFilteredTodos(filtered);
  }, [todos, filter]);

  useEffect(() => {
    filterTodosByStatus();
  }, [todos, filter, filterTodosByStatus]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <Footer filter={filter} setFilter={setFilter} todos={todos} />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !errorNotification },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorNotification('')}
        />
        {errorNotification}
      </div>
    </div>
  );
};
