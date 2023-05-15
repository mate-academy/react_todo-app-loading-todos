/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Notification } from './components/Notification';
import { SortTypes } from './types/SortTypes';
import { TodoError } from './types/TodoError';

const USER_ID = 10320;

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState<SortTypes>(SortTypes.All);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsloading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isEditedTodo, setIsEditet] = useState(false);

  const handleError = () => {
    setErrorMessage(TodoError.LOAD);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const loadTodos = useCallback(async () => {
    try {
      setIsloading(true);
      const response = await getTodos(USER_ID);

      setTodos(response);
      setIsloading(false);
    } catch (error: unknown) {
      handleError();
    }
  }, []);

  const vissibleTodos = todos.filter((todo) => {
    switch (activeFilter) {
      case SortTypes.Active:
      case SortTypes.AllCompleted:
        return !todo.completed;

      case SortTypes.Completed:
        return todo.completed;

      default: return true;
    }
  });

  useEffect(() => {
    loadTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header />
        <TodoList
          todos={vissibleTodos}
          isLoading={isLoading}
          isEdited={isEditedTodo}
        />

        <Footer
          todos={vissibleTodos}
          onChangeFilter={setActiveFilter}
          activeFilter={activeFilter}
        />
      </div>

      {errorMessage && (
        <Notification
          message={errorMessage}
        />
      )}

    </div>
  );
};
