/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';

import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { FilterBy } from './types/FilterBy';
import { ErrorNotification } from './components/ErrorNotifications';
import { TodoFooter } from './components/TodoFooter';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);
  const [hasError, setHasError] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getTodosFromServer = async () => {
    if (user) {
      try {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      } catch {
        setHasError(true);
        setErrorMessage('Can not load todos from server');

        setTimeout(() => {
          setHasError(false);
        }, 3000);
      }
    }
  };

  const deleteErrors = useCallback(() => {
    return setHasError(false);
  }, []);

  const visibleTodos = useMemo(() => (
    todos.filter(todo => {
      switch (filterBy) {
        case FilterBy.Completed:
          return todo.completed;
        case FilterBy.Active:
          return !todo.completed;
        case FilterBy.All:
        default:
          return todo;
      }
    })
  ), [todos, filterBy]);

  const handleFilter = useCallback((filter: FilterBy) => {
    setFilterBy(filter);
  }, []);

  useEffect(() => {
    getTodosFromServer();

    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const itemsLeft = useMemo(() => (
    todos.filter(todo => !todo.completed).length
  ), [todos]);

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

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todoTitle}
              onChange={(event) => (setTodoTitle(event.target.value))}
            />
          </form>
        </header>
        {todos.length > 0 && (
          <>
            <TodoList
              todos={visibleTodos}
            />
            <TodoFooter
              filterBy={filterBy}
              handleFilter={handleFilter}
              itemsLeft={itemsLeft}
            />
          </>
        )}

      </div>
      {hasError && (
        <ErrorNotification
          deleteErrors={deleteErrors}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};
