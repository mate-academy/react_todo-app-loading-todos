import React, {
  useState,
  useEffect,
  useRef,
} from 'react';

import { getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { SortTypes } from './types/SortTypes';

import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorNotification } from
  './components/ErrorNotification/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortType, setSortType] = useState<string>(SortTypes.All);
  const [error, setError] = useState(false);
  const newTodoField = useRef<HTMLInputElement>(null);

  if (!error) {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }

  const closeError = (boolean: boolean) => {
    setError(boolean);
  };

  useEffect(() => {
    getTodos(5).then(response => {
      setTodos(response);
    }).catch(() => setError(true));
  }, []);

  const handleSortType = (type: string) => {
    setSortType(type);
  };

  const filteredTodos = todos.filter(todo => {
    switch (sortType) {
      case SortTypes.All:
        return todo;

      case SortTypes.Active:
        return !todo.completed && SortTypes.Active;

      case SortTypes.Completed:
        return todo.completed && SortTypes.Completed;

      default:
        return null;
    }
  });

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            aria-label="make all todos active or vice versa"
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
          />

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

        <TodoList filteredTodos={filteredTodos} />
        <Footer
          todos={todos}
          handleSortType={handleSortType}
          sortType={sortType}
        />

      </div>

      <ErrorNotification
        closeError={closeError}
        error={error}
      />
    </div>
  );
};
