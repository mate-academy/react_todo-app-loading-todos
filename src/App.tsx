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
import { FilterMethods } from './types/filterMethods';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterMethod, setFilterMethod]
  = useState<FilterMethods>(FilterMethods.ALL);

  const getTodosFromsServer = useCallback(async () => {
    if (!user) {
      return;
    }

    try {
      const todosFromServer = await getTodos(user.id);

      setTodos(todosFromServer);
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
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodosFromsServer();
  }, []);

  const filteredTodos = todos.filter(({ completed }) => {
    switch (filterMethod) {
      case FilterMethods.COMPLETED:
        return completed;

      case FilterMethods.ACTIVE:
        return !completed;

      default:
        return true;
    }
  });

  const todosLeft = () => {
    const filterActiveTodos = todos.filter((todo) => (
      !todo.completed
    ));

    return filterActiveTodos.length;
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoField={newTodoField}
          todos={filteredTodos}
        />

        {!!todos.length && (
          <>
            <TodoList todos={filteredTodos} />

            <Footer
              filterMethod={filterMethod}
              setFilterMethod={setFilterMethod}
              todosLeft={todosLeft()}
            />
          </>
        )}
      </div>

      {hasError && (
        <Errors
          setHasError={setHasError}
          errorMessage={errorMessage}
        />
      )}

    </div>
  );
};
