/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorNotification } from './components/ErrorNotif/ErrorNotif';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';
import { Error } from './types/Error';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const [hasError, setHasError] = useState(false);
  const [errorType, setErrorType] = useState<Error>();

  const loadTodos = async () => {
    try {
      if (user) {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
        setVisibleTodos(todosFromServer);
      }
    } catch (error) {
      setHasError(true);
      setErrorType(Error.LOAD);

      setTimeout(() => {
        setHasError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    loadTodos();
  }, []);

  useEffect(() => {
    const filteredTodos = todos.filter(({ completed }) => {
      switch (filter) {
        case Filter.COMPLETED:
          return completed;
        case Filter.ACTIVE:
          return !completed;

        default:
          return true;
      }
    });

    setVisibleTodos(filteredTodos);
  }, [todos, filter]);

  const OnCloseNotif = () => setHasError(false);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />
        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer todos={todos} filter={filter} setFilter={setFilter} />
          </>
        )}
      </div>

      {hasError && (
        <ErrorNotification
          errorType={errorType}
          OnCloseNotif={OnCloseNotif}
        />
      )}
    </div>
  );
};
