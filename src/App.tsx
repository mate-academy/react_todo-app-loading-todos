/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  FC,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { getTodos } from './api/todos';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { FilterBy } from './types/TodosFilter';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';

const USER_ID = 10353;

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(FilterBy.ALL);
  const [hasError, setHasError] = useState(false);

  const loadTodos = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
      setHasError(true);
      setTimeout(() => {
        setHasError(false);
      }, 3000);
    }
  };

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case FilterBy.ALL:
          return true;

        case FilterBy.COMPLETED:
          return todo.completed;

        case FilterBy.ACTIVE:
          return !todo.completed;

        default:
          return true;
      }
    });
  }, [todos, filter]);

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

        <Header todos={todos} />

        {todos.length > 0 && (
          <TodoList todos={visibleTodos} />
        )}

        {todos.length > 0 && (
          <Footer
            todos={todos}
            filter={filter}
            onSetFilter={setFilter}
          />
        )}
      </div>

      {hasError && (
        <Notification />
      )}
    </div>
  );
};
