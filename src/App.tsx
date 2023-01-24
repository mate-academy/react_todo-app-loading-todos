/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterType, setFilterType] = useState(FilterType.All);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const handleError = () => {
    setTimeout(() => setErrorMessage(''), 3000);
  };

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => {
          setErrorMessage('Todos are not loaded');
          handleError();
        });
    }
  }, []);

  const hasCompletedTodo = useMemo(() => todos.some(todo => todo.completed),
    [todos]);

  const amountOfActiveTodo = useMemo(
    () => todos.filter(todo => todo.completed).length,
    [todos],
  );

  const getFilterTodos = (arrTodos: Todo[], isCompleted: FilterType) => {
    return arrTodos.filter(todo => {
      switch (isCompleted) {
        case FilterType.Completed:
          return todo.completed;

        case FilterType.Active:
          return !todo.completed;

        default:
          return todo;
      }
    });
  };

  const filterTodos = useMemo(() => {
    return getFilterTodos(todos, filterType);
  }, [todos, filterType]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList todos={filterTodos} />

            <Footer
              activeTodosAmount={amountOfActiveTodo}
              hasCompletedTodos={hasCompletedTodo}
              filterType={filterType}
              onChangeFilterType={setFilterType}
            />
          </>
        )}
      </div>

      {errorMessage && (
        <ErrorNotification
          error={errorMessage}
          closeErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};
