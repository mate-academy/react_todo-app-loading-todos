/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodosList } from './components/TodosList';
import { FilterType } from './types/FilterType';
import { Footer } from './components/Footer';
import classNames from 'classnames';

enum ErrorType {
  EmptyTitle,
  UnableToLoad,
  UnableToDelete,
  UnableToUpdate,
}

export const App: React.FC = () => {
  const [error, setError] = useState<ErrorType | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<FilterType>(FilterType.All);

  const downloadTodos = async () => {
    try {
      const tmp = await getTodos();

      setTodos(tmp);
      setFilteredTodos(tmp);
    } catch {
      setError(ErrorType.UnableToLoad);
    }
  };

  useEffect(() => {
    downloadTodos();
  }, []);

  useEffect(() => {
    if (todos) {
      switch (query) {
        case FilterType.Active:
          setFilteredTodos(todos.filter(todo => !todo.completed));
          break;
        case FilterType.Complited:
          setFilteredTodos(todos.filter(todo => todo.completed));
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    }
  }, [todos, query]);

  const returnError = () => {
    switch (error) {
      case ErrorType.EmptyTitle:
        return 'Title should not be empty';
      case ErrorType.UnableToDelete:
        return 'Unable to delete todos';
      case ErrorType.UnableToLoad:
        return 'Unable to load todos';
      case ErrorType.UnableToUpdate:
        return 'Unable to update todos';
      default:
        return null;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const timeout = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    });
  }, [error]);

  const returnLeftNumber = () => {
    return todos.filter(todo => todo.completed != true).length;
  };

  const handleSetQuery = (passedQuery: FilterType) => {
    setQuery(passedQuery);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {filteredTodos && filteredTodos.length > 0 && (
          <TodosList todos={filteredTodos} />
        )}

        {/* Hide the footer if there are no todos */}
        {todos && todos.length > 0 && (
          <Footer
            onSetQuery={handleSetQuery}
            query={query}
            left={returnLeftNumber}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: error === null },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError(null)}
        />
        {returnError()}
      </div>
    </div>
  );
};
