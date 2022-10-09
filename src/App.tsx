/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const getOurTodos = async () => {
    try {
      setTodos(await getTodos(user?.id || 0));
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getOurTodos();
  }, []);

  const closeNotification = () => {
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  if (error === true) {
    closeNotification();
  }

  const filterTodos = todos.filter(todo => {
    switch (filter) {
      case 'all':
        return todo;
      case 'active':
        return todo.completed;
      case 'completed':
        return !todo.completed;

      default:
        return todo;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          newTodoField={newTodoField}
          query={query}
          onSetQuery={setQuery}
          onSetError={setError}
        />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={filterTodos}
            />

            <TodoFooter
              todos={todos}
              filter={filter}
              onSetFilter={setFilter}
            />
          </>
        )}
      </div>

      <ErrorNotification
        error={error}
        onSetError={setError}
      />
    </div>
  );
};
