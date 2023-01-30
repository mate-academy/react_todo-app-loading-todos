import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorNotification }
  from './components/ErrorNotification/ErrorNotification';
import { getFilteredTodos } from './components/helper/filterTodo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterType, setFilterType] = useState(FilterType.All);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const showError = useCallback((message: string) => {
    setErrorMessage(message);

    setTimeout(() => setErrorMessage(''), 3000);
  }, []);

  const closeErrorMessage = useCallback(() => {
    setErrorMessage('');
  }, []);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => showError('Todos are not loaded'));
    }
  }, [user]);

  const hasCompletedTodo = useMemo(() => (
    todos.some(todo => todo.completed)
  ), [todos]);

  const amountOfActiveTodo = useMemo(
    () => todos.filter(todo => todo.completed).length,
    [todos],
  );

  const visibleTodos = useMemo(() => {
    return getFilteredTodos(todos, filterType);
  }, [todos, filterType]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              activeTodosAmount={amountOfActiveTodo}
              hasCompletedTodos={hasCompletedTodo}
              filterType={filterType}
              setFilterType={setFilterType}
            />
          </>
        )}
      </div>

      {errorMessage && (
        <ErrorNotification
          message={errorMessage}
          close={closeErrorMessage}
        />
      )}
    </div>
  );
};
