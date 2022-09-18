import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Notification } from './components/Notification/Notification';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { FilterOption } from './types/FilterOption';
import { Todo } from './types/Todo';
import { NotificationType } from './types/NotificationType';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [notification, setNotification]
    = useState<NotificationType>(NotificationType.null);
  const [errorText, setErrorText] = useState<string>('');
  const [filterOption, setFilterOption]
    = useState<FilterOption>(FilterOption.all);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (user) {
          const loadedTodos = await getTodos(user.id);

          setTodos(loadedTodos);
        }
      } catch {
        setNotification(NotificationType.error);
        setErrorText('load');
      }
    };

    loadData();

    // focus the element with `ref={newTodoField}`

    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const filterTodos = () => {
    switch (filterOption) {
      case FilterOption.active:
        return todos.filter(todo => !todo.completed);

      case FilterOption.completed:
        return todos.filter(todo => todo.completed);

      case FilterOption.all:
        return todos;

      default:
        return todos;
    }
  };

  const filteredTodos = useMemo(filterTodos, [todos, filterOption]);

  const closeNotification = () => {
    setErrorText('');
    setNotification(NotificationType.null);
  };

  if (notification) {
    setTimeout(closeNotification, 3000);
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoField={newTodoField}
          todos={todos}
        />

        <TodoList
          todos={filteredTodos}
        />

        <Footer
          todos={todos}
          filterTodos={event => setFilterOption(event)}
          filterOption={filterOption}
        />
      </div>

      <Notification
        notification={notification}
        errorText={errorText}
        closeNotification={closeNotification}
      />
    </div>
  );
};
