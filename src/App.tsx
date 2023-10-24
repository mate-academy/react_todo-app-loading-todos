import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { getTodos } from './api/todos';

const USER_ID = 11706;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.All);
  const [errorMessege, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  const filteredTodos: Todo[] = useMemo(() => {
    let preparedTodos = [...todos];

    if (filter !== Filter.All) {
      preparedTodos = preparedTodos.filter(todo => {
        switch (filter) {
          case Filter.Active:
            return !todo.completed;

          case Filter.Completed:
            return todo.completed;

          default:
            return true;
        }
      });
    }

    return preparedTodos;
  }, [todos, filter]);

  const activeTodos = todos.filter(todo => !todo.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {activeTodos > 0 && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
              aria-label="Toggle All"
            />
          )}

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {filteredTodos.length > 0 && (
          <TodoList todos={filteredTodos} />
        )}

        {todos.length > 0 && (
          <Footer
            todos={todos}
            setTodos={setTodos}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessege },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
          aria-label="Toggle All"
        />
        {errorMessege}
      </div>
    </div>
  );
};
