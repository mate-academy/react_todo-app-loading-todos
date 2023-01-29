/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header/Header';
import { Filters, Footer } from './components/Footer/Footer';
import { Errors } from './components/Error/Error';
import { TodoList } from './components/TodoList/TodoList';
import { filteredTodos } from './helpers/helpers';

// email to check jklajsdf@adsf.com

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState(Filters.all);

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

  const activeTodosCount = useMemo(() => (
    todos.filter(todo => !todo.completed).length
  ), [todos]);

  const visibleTodos = useMemo(() => (
    filteredTodos(todos, filterStatus)
  ), [todos, filterStatus]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoField={newTodoField}
        />
        {todos.length > 0 && (
          <>
            <TodoList
              todos={visibleTodos}
            />
            <Footer
              activeTodos={activeTodosCount}
              filter={filterStatus}
              onChange={setFilterStatus}
            />
          </>
        )}
      </div>

      {errorMessage && (
        <Errors
          message={errorMessage}
          onHideError={setError}
        />
      )}
    </div>
  );
};
