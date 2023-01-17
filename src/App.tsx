/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';

import { TodoList } from './components/TodoList';
import { NewTodoForm } from './components/NewTodoField';
import { Footer } from './components/Footer';
import { Error } from './components/Error';
import { Todo } from './types/Todo';
import { Filters } from './types/Filters';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<string>(Filters.All);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id).then((todosFromServer) => {
        setTodos(todosFromServer);
        setError(false);
      })
        .catch(() => {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 3000);
        });
    }
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (filter) {
        case Filters.All:
          return todo;
        case Filters.Active:
          return !todo.completed;
        case Filters.Completed:
          return todo.completed;
        default:
          return todo;
      }
    });
  }, [todos, filter]);

  const isComponentVisible = visibleTodos.length > 0;

  const handleFilter = (filterValue: string) => {
    setFilter(filterValue);
  };

  const handleErrorClose = () => {
    setError(false);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
          />

          <NewTodoForm
            newTodoField={newTodoField}
          />
        </header>

        {isComponentVisible && (
          <TodoList
            todos={visibleTodos}
          />
        )}

        {isComponentVisible && (
          <Footer
            todos={visibleTodos}
            filter={filter}
            setFilter={handleFilter}
          />
        )}
      </div>

      {error && (
        <Error
          error={error}
          onClick={handleErrorClose}
        />
      )}
    </div>
  );
};
