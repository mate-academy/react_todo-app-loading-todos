/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';

import { TodoList } from './components/Todo/TodoList';
import { ErrorNotification } from './components/Todo/ErrorNotification';

import { Todo } from './types/Todo';
import { TodoFilter } from './types/TodoFilter';
import { Error } from './types/Errors';
import { Footer } from './components/Todo/Footer';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState('all');

  const filteredList = todos.filter(todo => {
    switch (filter) {
      case TodoFilter.All:
        return todo;
      case TodoFilter.Active:
        return !todo.completed;
      case TodoFilter.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  let userId = 0;

  if (user?.id) {
    userId = user.id;
  }

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 3000);
  }

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    getTodos(userId)
      .then(setTodos)
      .catch(() => setError(Error.Loading));
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0
          && (
            <button
              data-cy="ToggleAllButton"
              type="button"
              className="todoapp__toggle-all active"
            />
          )}

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        {todos.length > 0
        && (
          <>
            <TodoList
              todos={filteredList}
            />
            <Footer
              setFilter={setFilter}
              filter={filter}
            />
          </>
        )}
      </div>
      <ErrorNotification
        error={error}
        onErrorChange={setError}
      />

    </div>
  );
};
