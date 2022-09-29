/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  // useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
// import { AuthContext } from './components/Auth/AuthContext';
// eslint-disable-next-line
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [typeOfFilter, setTypeOfFilter] = useState('all');
  const [error, setError] = useState<boolean>(false);
  const [userID] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodos(userID)
      .then(setTodos)
      .catch(() => setError(true));
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (typeOfFilter) {
      case FilterType.Active:
        return !todo.completed;
      case FilterType.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoField={newTodoField}
        />
        {(todos.length > 0) && (
          <TodoList
            todos={filteredTodos}
          />
        )}
        <Footer
          typeOfFilter={typeOfFilter}
          setTypeOfFilter={setTypeOfFilter}
          todos={todos}

        />
      </div>

      {error && (
        <ErrorNotification
          error={error}
          setError={setError}
        />
      )}
    </div>
  );
};
