import React, { useEffect, useMemo, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { NewTodo } from './components/NewTodo/NewTodo';
import { ToggleAllButton } from './components/ToggleAllButton/ToggleAllButton';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { ErrorNotification } from './components/ErrorNotification';
import * as todoService from './api/todos';
import { FiltersEnum } from './types/enums/FiltersEnum';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentFilter, setCurrentFilter] = useState<FiltersEnum>(
    FiltersEnum.All,
  );
  const [errorMessage, setErrorMessage] = useState('');

  const focusedInput = useRef<HTMLInputElement>(null);

  const AllFilters: Record<FiltersEnum, (td: Todo) => boolean> = useMemo(() => {
    return {
      [FiltersEnum.All]: () => true,
      [FiltersEnum.Active]: td => !td.completed,
      [FiltersEnum.Completed]: td => td.completed,
    };
  }, []);

  useEffect(() => {
    setErrorMessage('');
    if (focusedInput.current) {
      focusedInput.current.focus();
    }

    todoService
      .getTodos()
      .then(setTodos)
      .catch(error => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
        throw error;
      });
  }, []);

  const incompletedTodos = todos.filter(todo => !todo.completed);

  const filteredTodos = useMemo(() => {
    let filtered = [...todos];

    if (currentFilter) {
      filtered = filtered.filter(AllFilters[currentFilter]);
    }

    return filtered;
  }, [todos, AllFilters, currentFilter]);

  const handleCloseError = () => {
    setErrorMessage('');
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && <ToggleAllButton todos={todos} />}

          <NewTodo focusedInput={focusedInput} />
        </header>

        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {incompletedTodos.length || 0} items left
            </span>

            <TodoFilter
              currentFilter={currentFilter}
              onFilterChange={setCurrentFilter}
            />
            <button
              type="button"
              className="todoapp__clear-completed hidden"
              data-cy="ClearCompletedButton"
              disabled={todos.length - incompletedTodos.length === 0}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onClose={handleCloseError}
      />
    </div>
  );
};
