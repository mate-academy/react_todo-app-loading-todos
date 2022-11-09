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
import { ErrorMessages } from './components/ErrorMessages';
import { TodosFilter } from './components/TodosFilter/TodosFilter';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodosList } from './components/TodosList/TodosList';

import { FilterStatus } from './types/FilterStatus';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [filterBy, setFilterBy] = useState<FilterStatus>(FilterStatus.ALL);
  const [hasError, setHasError] = useState(false);

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const loadUserTodos = useCallback(async () => {
    if (user) {
      try {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      } catch {
        setHasError(true);
      }
    }
  }, []);

  const handleFilterStatus = useCallback((filterType: FilterStatus) => {
    setFilterBy(filterType);
  }, []);

  const handleHasError = useCallback(() => {
    setHasError(false);
  }, []);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    loadUserTodos();
  }, []);

  useEffect(() => {
    const filteredTodos = todos.filter(todo => {
      switch (filterBy) {
        case FilterStatus.ALL:
          return todo;

        case FilterStatus.ACTIVE:
          return !todo.completed;

        case FilterStatus.COMPLETED:
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
            <TodosList todos={visibleTodos} />
            <TodosFilter
              todos={todos}
              filterBy={filterBy}
              onFilterSelect={handleFilterStatus}
            />
          </>
        )}
      </div>

      <ErrorMessages
        hasError={hasError}
        onCloseError={handleHasError}
      />
    </div>
  );
};
