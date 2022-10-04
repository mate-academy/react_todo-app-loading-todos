import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorNotification';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorStatus, setErrorStatus] = useState<boolean>(false);
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.ALL);
  const [errorText] = useState<string>('');

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  if (errorStatus) {
    setTimeout(() => {
      setErrorStatus(false);
    }, 3000);
  }

  const filteredTodos = todos.filter(todo => {
    switch (filterBy) {
      case FilterType.ACTIVE:
        return !todo.completed;

      case FilterType.COMPLETED:
        return todo.completed;

      default:
        return todo;
    }
  });

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    const getTodoData = async () => {
      try {
        if (user) {
          const receivedTodos = await getTodos(user.id);

          setTodos(receivedTodos);
        }
      } catch (error) {
        setErrorStatus(true);
      }
    };

    getTodoData();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />
            <Footer
              todos={filteredTodos}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
            />
          </>
        )}
      </div>

      <ErrorNotification
        error={errorStatus}
        setError={setErrorStatus}
        errorText={errorText}
      />
    </div>
  );
};
