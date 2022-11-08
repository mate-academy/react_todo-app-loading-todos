/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import {
  ErrorNotification,
} from './components/ErrorNotification/ErrorNotification';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { GroupBy } from './types/GroupBy';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [groupBy, setGroupBy] = useState<GroupBy>(GroupBy.ALL);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadTodos = async () => {
    try {
      if (user) {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
        setVisibleTodos(todosFromServer);
      }
    } catch (error) {
      setHasError(true);
      setErrorMessage('Something is wrong, try to update the page!');

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
      switch (groupBy) {
        case GroupBy.COMPLETED:
          return completed;

        case GroupBy.ACTIVE:
          return !completed;

        default:
          return true;
      }
    });

    setVisibleTodos(filteredTodos);
  }, [todos, groupBy]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoField={newTodoField}
        />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={visibleTodos}
            />

            <Footer
              groupBy={groupBy}
              setGroupBy={setGroupBy}
              todos={todos}
            />
          </>
        )}
      </div>

      <ErrorNotification
        hasError={hasError}
        onClose={() => setHasError(false)}
        errorMessage={errorMessage}
      />
    </div>
  );
};
