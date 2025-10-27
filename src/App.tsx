/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './components/Filter';
import { Filters } from './constants/filter';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';

const getPreparedTodos = (todos: Todo[], filter: Filters) => {
  const newTodos = [...todos];

  if (filter !== Filters.all) {
    if (filter === Filters.active) {
      return newTodos.filter(todo => todo.completed === false);
    }

    if (filter === Filters.completed) {
      return newTodos.filter(todo => todo.completed === true);
    }
  }

  return newTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<Filters>(Filters.all);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setError('');

    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const preparedTodos: Todo[] = getPreparedTodos(todos, filter);

  const activeTodos = todos.filter(todo => !todo.completed).length;

  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: completedTodos === preparedTodos.length,
            })}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <NewTodo />
        </header>

        <TodoList todos={preparedTodos} isLoading={loading} />

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodos} items left`}
            </span>

            <Filter filter={filter} onSetFilter={setFilter} />

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: error === '' },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {error}
        {/* Unable to load todos */}
        {/* Title should not be empty */}
        {/* Unable to add a todo */}
        {/* Unable to delete a todo */}
        {/* Unable to update a todo */}
      </div>
    </div>
  );
};
