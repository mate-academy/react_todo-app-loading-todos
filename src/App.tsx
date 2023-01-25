/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useContext,
  useEffect,
  useRef,
  useState,
  FC,
  useMemo,
  useCallback,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const onSetFilter = useCallback(
    () => (value: FilterType) => setFilter(value), [],
  );

  const visibleTodos = useMemo(() => (todos.filter(todo => {
    switch (filter) {
      case FilterType.ACTIVE:
        return !todo.completed;

      case FilterType.COMPLETED:
        return todo.completed;

      default:
        return true;
    }
  })), [filter, todos]);

  useEffect(() => {
    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => {
          setErrorMessage('Unable to load todos');
        });
    }

    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoField={newTodoField}
        />
        {todos.length !== 0 && (
          <>
            <TodoList
              todos={visibleTodos}
            />
            <Footer
              todos={todos}
              filter={filter}
              setFilter={onSetFilter}
            />
          </>
        )}

      </div>
      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
