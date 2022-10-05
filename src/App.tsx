/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { ErrorMessage } from './components/ErrorMessage';
import { AuthContext } from './components/Auth/AuthContext';

import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterOption, setFilterOption] = useState('all');

  if (error !== '') {
    setTimeout(() => {
      setError('');
    }, 3000);
  }

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(response => {
          setTodos(response);
        })
        .catch(() => setError('Unable to load todos'));
    }
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterOption) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    });
  }, [todos, filterOption]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoField={newTodoField}
        />

        {todos.length > 0
          && (
            <>
              <TodoList todos={filteredTodos} />

              <Footer
                todos={filteredTodos}
                filterOption={filterOption}
                setFilterOption={setFilterOption}
              />
            </>
          )}

        {error !== ''
          && (
            <ErrorMessage
              error={error}
              setError={setError}
            />
          )}
      </div>
    </div>
  );
};
