/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Header } from './components/Auth/Header';
import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/Auth/TodoList';
import { Footer } from './components/Auth/Footer';
import { ErrorMessage } from './components/Auth/ErrorMessage';
import { FilterType } from './utils/enums/FilterType';
import { ErrorType } from './utils/enums/ErrorType';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);
  const [errorType] = useState<ErrorType>(ErrorType.None);

  const loadTodos = useCallback(async () => {
    try {
      const userId = user
        ? user.id
        : 0;

      const loadedTodos = await getTodos(userId);

      const filteredTodos = loadedTodos.filter(todo => {
        switch (filterType) {
          case FilterType.Active:
            return !todo.completed;

          case FilterType.Completed:
            return todo.completed;

          default: return true;
        }
      });

      setTodos(loadedTodos);
      setVisibleTodos(filteredTodos);
    } catch {
      setIsError(true);

      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  }, [filterType]);

  useEffect(() => {
    loadTodos();

    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              filterType={filterType}
              todos={visibleTodos}
              onFilter={setFilterType}
            />
          </>
        )}
      </div>

      <ErrorMessage
        onClose={setIsError}
        isError={isError}
        errorType={errorType}
      />
    </div>
  );
};
