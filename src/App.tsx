/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Errors } from './components/Errors';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterMethod, setFilterMethod] = useState('all');

  const getTodosFromsServer = useCallback(async () => {
    try {
      if (user) {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      }
    } catch (Error) {
      setHasError(true);
      setErrorMessage('Loading error!');

      setTimeout(() => {
        setHasError(false);
        setErrorMessage('');
      }, 3000);
    }
  }, []);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodosFromsServer();
  }, []);

  const filteredTodos = () => {
    const toFilter = todos.filter(todo => {
      switch (filterMethod) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return todos;
      }
    });

    return toFilter;
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoField={newTodoField}
          todos={filteredTodos()}
        />

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos()} />

            <Footer
              filterMethod={filterMethod}
              setFilterMethod={setFilterMethod}
            />
          </>
        )}
      </div>

      <Errors
        hasError={hasError}
        setHasError={setHasError}
        errorMessage={errorMessage}
      />
    </div>
  );
};
