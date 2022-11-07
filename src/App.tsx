/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { getTodos } from './api/todos';

import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotifications } from './components/ErrorNotifications';
import { Filters } from './components/Filters';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList';

import { FilterType } from './types/FilterType';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.ALL);
  const [hasError, setHasError] = useState(false);

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const loadTodos = useCallback(async () => {
    if (user) {
      try {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      } catch {
        setHasError(true);
      }
    }
  }, []);

  const handleFilterSelect = useCallback((filterType: FilterType) => {
    setFilterBy(filterType);
  }, []);

  const handleCloseError = useCallback(() => {
    setHasError(false);
  }, []);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    loadTodos();
  }, []);

  useEffect(() => {
    const filteredTodos = todos.filter(todo => {
      switch (filterBy) {
        case FilterType.ALL:
          return todo;

        case FilterType.ACTIVE:
          return !todo.completed;

        case FilterType.COMPLETED:
          return todo.completed;

        default:
          return true;
      }
    });

    setVisibleTodos(filteredTodos);
  }, [filterBy, todos]);

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

          <NewTodo newTodoField={newTodoField} />
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Filters
              todos={todos}
              filterBy={filterBy}
              onFilterSelect={handleFilterSelect}
            />
          </>
        )}
      </div>

      <ErrorNotifications
        hasError={hasError}
        onCloseError={handleCloseError}
      />
    </div>
  );
};
