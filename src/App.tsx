import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/errorNotification';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { TodoList } from './components/todoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState(Boolean);

  const newTodoField = useRef<HTMLInputElement>(null);

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

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => todo.completed === filterStatus);
  }, [todos, filterStatus]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              onChangeAll={() => setFilterStatus(Boolean)}
              onChangeCompleted={() => setFilterStatus(true)}
              onChangeActive={() => setFilterStatus(false)}
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
