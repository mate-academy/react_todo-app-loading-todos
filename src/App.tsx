/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList';
import { FilterType } from './types/FilterType';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [todos, setTodos] = useState<Todo[]>([]);
  const user = useContext(AuthContext);
  const [filterType, setFilterType] = useState('all');
  const [error, setError] = useState<boolean>(false);
  const newTodoField = useRef<HTMLInputElement>(null);

  const userId = user ? user.id : 0;

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodos(userId)
      .then(setTodos)
      .catch(() => setError(true));
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (filterType) {
      case FilterType.All:
        return todo;

      case FilterType.Active:
        return !todo.completed;

      case FilterType.Completed:
        return todo.completed;

      default:
        return null;
    }
  });

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

        {todos.length > 0 && (
          <TodoList
            todos={filteredTodos}
          />
        )}

        <Footer
          todos={todos}
          filterType={filterType}
          handleFilterChange={setFilterType}
        />
      </div>

      <ErrorNotification
        error={error}
      />
    </div>
  );
};
