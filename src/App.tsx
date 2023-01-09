/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos } from './api/todos';
import { NewTodoField } from './components/NewTodoField/NewTodoField';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { FilterType } from './types/Filtertype';
import { ErrorType } from './types/ErrorType';
import { Error } from './components/Error/Error';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');

  const [filterType, setFilterType] = useState(FilterType.all);
  const [activeTodoLength, setActiveTodosLength] = useState(0);

  const [hasError, setHasError] = useState(false);
  const [errorType, setErrorType] = useState(ErrorType.none);

  async function loadTodos(userData: User) {
    try {
      const result = await getTodos(userData.id);

      setTodos(result);
    } catch {
      setHasError(true);
      setTimeout(() => {
        setHasError(false);
        setErrorType(ErrorType.none);
      }, 3000);
    }
  }

  useEffect(() => {
    if (user) {
      loadTodos(user);
    }
  }, []);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    setActiveTodosLength(todos.filter(todo => todo.completed !== true).length);
  }, [todos]);

  const onInputChange = (str: string) => {
    setQuery(str);
  };

  const onFormSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (query) {
        const newTodo: Todo = {
          id: +new Date(),
          userId: user?.id || +new Date(),
          title: query,
          completed: false,
        };

        setTodos((prevTodos) => [...prevTodos, newTodo]);
      }

      setQuery('');
    }, [query, user],
  );

  const clearCompleted = () => {
    setTodos(todos.filter(todo => todo.completed !== true));
  };

  const visibleTodos = () => {
    return todos.filter(todo => {
      switch (filterType) {
        case FilterType.completed:
          return todo.completed === true;
        case FilterType.active:
          return todo.completed === false;
        default:
          return todo;
      }
    });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
          />
          <NewTodoField
            query={query}
            newTodoField={newTodoField}
            onFormSubmit={onFormSubmit}
            onInputChange={onInputChange}
          />
        </header>

        { todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              <TodoList
                todos={visibleTodos()}
              />
            </section>

            <Footer
              todoItemLeft={activeTodoLength}
              filterType={filterType}
              setFilterType={setFilterType}
              clearCompleted={clearCompleted}
            />
          </>
        )}
      </div>

      <Error
        errorType={errorType}
        hasError={hasError}
        setHasError={setHasError}
      />

    </div>
  );
};
