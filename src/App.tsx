import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { AuthContext } from './components/Auth/AuthContext';
import { FilterBy, TodoFilter } from './components/TodoFilter';
import { TodoField } from './components/TodoField';
import { TodoList } from './components/TodoList';
import { LoadingError } from './components/LoadingError';

import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(FilterBy.All);
  const [loadingError, setLoadingError] = useState(false);
  const [closingError, setClosingError] = useState(false);

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    const loadTodos = async () => {
      try {
        const loadedTodos = await getTodos(user?.id || 0);

        setTodos(loadedTodos);
      } catch (error) {
        setLoadingError(true);
      }
    };

    loadTodos();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <TodoField ref={newTodoField} todos={todos} />
        </header>

        {todos.length > 0 && (
          <>
            <TodoList
              todos={todos}
              filterType={filter}
            />
            <footer
              className="todoapp__footer"
              data-cy="Footer"
            >
              <TodoFilter
                todos={todos}
                filterType={filter}
                setFilterType={setFilter}
              />
            </footer>
          </>
        )}
      </div>

      {loadingError && (
        <LoadingError
          error={closingError}
          closeError={setClosingError}
        />
      )}
    </div>
  );
};
