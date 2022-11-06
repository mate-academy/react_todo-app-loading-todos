/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
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
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.ALL);
  const [hasError, setHasError] = useState(false);

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const loadTodos = async () => {
    if (user) {
      try {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      } catch {
        setHasError(true);
      }
    }
  };

  const handleFilterAll = () => {
    setFilterBy(FilterType.ALL);
  };

  const handleFilterActive = () => {
    setFilterBy(FilterType.ACTIVE);
  };

  const handleFilterCompleted = () => {
    setFilterBy(FilterType.COMPLETED);
  };

  const handleCloseError = () => {
    setHasError(false);
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    loadTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (filterBy) {
      case FilterType.ALL:
        return todo;

      case FilterType.ACTIVE:
        return !todo.completed;

      case FilterType.COMPLETED:
        return todo.completed;

      default:
        return todo;
    }
  });

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
            <TodoList todos={filteredTodos} />
            <Filters
              todos={todos}
              filterBy={filterBy}
              onFilterAll={handleFilterAll}
              onFilterActive={handleFilterActive}
              onFilterCompleted={handleFilterCompleted}
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
