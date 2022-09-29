import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoFilter } from './components/TodoFilter';
import { TodoField } from './components/TodoField';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { LoadingError } from './components/LoadingError';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('All');
  const [loadingError, setLoadingError] = useState(false);
  const [errorClose, setErrorClosing] = useState(false);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    try {
      getTodos(user?.id || 0)
        .then((todoList) => {
          setTodos(todoList);
        });
    } catch (error) {
      setLoadingError(true);
    }
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
          error={errorClose}
          closeError={setErrorClosing}
        />
      )}
    </div>
  );
};
