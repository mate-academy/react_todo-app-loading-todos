/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';

import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Error } from './components/Error/Error';

import { Todo } from './types/Todo';
import { TypeError } from './types/TypeError';
import { FilterType } from './types/FilterType';
import { NewTodoField } from './components/NewTodoField/NewTodoField';
import { getTodos } from './api/todos';
import { User } from './types/User';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const [hasError, setHasError] = useState(false);
  const [errorType, setErrorType] = useState<TypeError>(TypeError.NONE);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  async function LoadTodos(utilizer: User) {
    try {
      const reponse = await getTodos(utilizer.id);

      setTodos(reponse);
    } catch {
      setHasError(true);
    }
  }

  useEffect(() => {
    if (user) {
      LoadTodos(user);
    }
  }, []);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const activeTodosLength = todos.filter(todo => !todo.completed).length;

  const onInputChange = (str: string) => {
    setQuery(str);
  };

  const onFormSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (query.trim()) {
        const newTodo: Todo = {
          id: +new Date(),
          userId: user?.id || +new Date(),
          title: query.trim(),
          completed: false,
        };

        setTodos((prevTodos) => [...prevTodos, newTodo]);
      }

      setQuery('');
    }, [query, user],
  );

  const onDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const onDeleteCompletedTodos = () => {
    setTodos(todos.filter(todo => todo.completed !== true));
  };

  const removeErrorHandler = () => {
    setHasError(false);
    setErrorType(TypeError.NONE);
  };

  if (hasError) {
    setTimeout(() => setHasError(false), 3000);
  }

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterType) {
        case FilterType.Active:
          return todo.completed === false;

        case FilterType.Completed:
          return todo.completed === true;

        default:
          return todo;
      }
    });
  }, [filterType, todos]);

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
            newTodoField={newTodoField}
            query={query}
            onInputChange={onInputChange}
            onFormSubmit={onFormSubmit}
          />
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} onDeleteTodo={onDeleteTodo} />

            <Footer
              onDeleteCompletedTodos={onDeleteCompletedTodos}
              todosLeft={activeTodosLength}
              setFilterType={setFilterType}
              filterType={filterType}
            />
          </>
        )}
      </div>

      {hasError && (
        <Error
          errorType={errorType}
          onRemoveErrorHandler={removeErrorHandler}
        />
      )}
    </div>
  );
};
