/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

import { AuthContext } from './components/Auth/AuthContext';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { ErrorNotice } from './components/ErrorNotice';

import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);
  const [hasError, setHasError] = useState(false);

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const getTodosFromServer = useCallback(
    async () => {
      try {
        if (user) {
          const todosFromServer = await getTodos(user.id);

          setTodos(todosFromServer);
        }
      } catch (error) {
        setHasError(true);
      }
    }, [],
  );

  const filtredTodos = useMemo(() => (
    todos.filter(({ completed }) => {
      switch (filterType) {
        case FilterType.ACTIVE:
          return !completed;

        case FilterType.COMPLETED:
          return completed;

        default:
          return todos;
      }
    })
  ), [todos, filterType]);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodosFromServer();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">
        todos
      </h1>

      <div className="todoapp__content">
        <NewTodo newTodoField={newTodoField} />

        {todos.length !== 0 && (
          <>
            <TodoList filtredTodos={filtredTodos} />

            <TodoFilter
              todos={todos}
              filterType={filterType}
              setFilterType={setFilterType}
            />
          </>
        )}
      </div>

      {hasError && (
        <ErrorNotice
          hasError={hasError}
          setHasError={setHasError}
        />
      )}
    </div>
  );
};
