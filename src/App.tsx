/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos, USER_ID } from './api/todos';
import { TodoForm } from './Components/TodoForm/TodoForm';
import { Footer } from './Components/Footer/Footer';
import { Filter } from './types/Filter';
import { TodoList } from './Components/TodoList/TodoList';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const activeTodos = todos.filter(todo => !todo.completed);
  const hasCompletedTodos = todos.some(todo => todo.completed);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(null), 3000);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);
      case Filter.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const visibleTodo = filteredTodos.length > 0;
  const noTodosFound = filteredTodos.length === 0;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm />

        {loading && <p>Loading todos...</p>}

        {!loading && visibleTodo && <TodoList todos={filteredTodos} />}

        <Footer
          currentFilter={filter}
          setFilter={setFilter}
          activeTodos={activeTodos.length}
          hasCompletedTodos={hasCompletedTodos}
        />
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(null)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
