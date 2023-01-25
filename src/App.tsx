/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterType } from './types/FilterType';
import { ErrorNotification } from
  './components/ErrorNotification/ErrorNotification';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodo, setFilterTodo] = useState(FilterType.all);
  const [error, setError] = useState('');

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => setError('Unable to load a todos'));
    }
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filterTodo) {
      case FilterType.active:
        return todos.filter(todo => !todo.completed);

      case FilterType.completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [todos, filterTodo]);

  const activeTodosQuantity = useMemo(() => (
    todos.filter(todo => !todo.completed).length
  ), [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />

            <Footer
              activeTodosQuantity={activeTodosQuantity}
              filterType={filterTodo}
              handleFilterChange={setFilterTodo}
            />

          </>
        )}
      </div>

      {error && (
        <ErrorNotification
          error={error}
          onChangeErrorMessage={setError}
        />
      )}
    </div>
  );
};
