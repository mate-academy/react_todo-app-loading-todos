import React,
{
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { FilterType } from './types/Filter';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';

export const App: React.FC = () => {
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [fileterType, setFileterType] = React.useState(FilterType.All);
  const user = useContext(AuthContext);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    const getTodosFromServer = async (userId: number) => {
      try {
        const receivedTodos = await getTodos(userId);

        setTodos(receivedTodos);
      } catch (errorFromServer) {
        setErrorMessage(`${errorFromServer}`);
      }
    };

    if (!user) {
      return;
    }

    getTodosFromServer(user.id);
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (fileterType) {
        case FilterType.Active:
          return !todo.completed;
        case FilterType.Completed:
          return todo.completed;
        default:
          return true;
      }
    });
  }, [todos, fileterType]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoField={newTodoField}
          isActiveTodo={todos.some(todo => !todo.completed)}
        />
        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />
            <Footer
              filterType={fileterType}
              todos={todos}
              handleFilterType={setFileterType}
            />
          </>
        )}
      </div>
      {errorMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};
