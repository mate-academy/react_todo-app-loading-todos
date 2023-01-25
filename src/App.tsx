import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { FilterStatus } from './types/Filterstatus';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState(FilterStatus.All);

  const newTodoField = useRef<HTMLInputElement>(null);

  const completedTodos = todos.filter(todo => todo.completed === true);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    const setErrorDelay = (message: string) => {
      setErrorMessage(message);
      setTimeout(() => {
        setErrorDelay('');
      }, 3000);
    };

    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => setErrorDelay('Unable to load todos'));
    }
  }, []);

  const visibleTodos = useMemo(() => todos
    .filter(todo => {
      switch (filterStatus) {
        case FilterStatus.Active:
          return !todo.completed;
        case FilterStatus.Completed:
          return todo.completed;
        default:
          return todo;
      }
    }), [todos, filterStatus]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              completedTodos={completedTodos}
              onStatusChange={setFilterStatus}
            />
          </>
        )}
      </div>
      <ErrorNotification
        errorMessage={errorMessage}
        onCloseErrorButton={() => setErrorMessage('')}
      />
    </div>
  );
};
