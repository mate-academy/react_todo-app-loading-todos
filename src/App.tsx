/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useState, useEffect, useMemo } from 'react';
import { getTodos } from './api/todos';
import { ErrorNotification } from './components/TodoError';
import { TodoFilter } from './components/TodoFilter';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Error } from './types/Error';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { getVisibleTodos } from './utils/getVisibleTodos';

const USER_ID = 11135;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<Error>(Error.none);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const visibleTodos = useMemo(() => (
    getVisibleTodos(todos, filter)
  ), [todos, filter]);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage(Error.load));
  }, []);

  const numberOfTodos = useMemo(() => visibleTodos.length, [visibleTodos]);

  const hasActiveTodos = useMemo(() => (
    visibleTodos.some(todo => !todo.completed)
  ), [visibleTodos]);

  const isTodoCompleted = useMemo(() => (
    visibleTodos.some(todo => todo.completed)
  ), [visibleTodos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {numberOfTodos > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: hasActiveTodos,
              })}
            />
          )}

          {/* Add a todo on form submit */}
          <TodoForm />
        </header>

        {numberOfTodos > 0 && (
          <TodoList todos={visibleTodos} />
        )}

        {numberOfTodos > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {numberOfTodos === 1 ? (
                `${numberOfTodos} item left`
              ) : (
                `${numberOfTodos} items left`
              )}
            </span>

            <TodoFilter
              filter={filter}
              setFilter={setFilter}
            />

            <button type="button" className="todoapp__clear-completed">
              {isTodoCompleted && (
                'Clear completed'
              )}
            </button>

          </footer>
        )}
      </div>

      {errorMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};
