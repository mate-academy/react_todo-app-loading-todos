import React, {
  useContext,
  useEffect,
  useMemo,
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

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterBy) {
        case FilterType.ACTIVE:
          return !todo.completed;

        case FilterType.COMPLETED:
          return todo.completed;

        default:
          return todo;
      }
    });
  }, [todos, filterBy]);

  useEffect(() => {
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
        <Header />

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />
            <Footer
              filteredTodos={filteredTodos}
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
