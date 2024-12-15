/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import * as todosServices from '../src/api/todos';
import { Todo } from './types/Todo';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';
import Error from './components/Error/Error';
import { FilterType } from './types/FilterType';
import cn from 'classnames';

enum ErrorMessages {
  loadTodos = 'Unable to load todos',
  emptyTitle = 'Title should not be empty',
  addTodo = 'Unable to add a todo',
  deleteTodo = 'Unable to delete a todo',
  updateTodo = 'Unable to update a todo',
}

const getFilteredTodos = (todos: Todo[], filterBy: FilterType): Todo[] => {
  switch (filterBy) {
    case FilterType.active:
      return todos.filter(todo => !todo.completed);
    case FilterType.completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<ErrorMessages | null>(null);
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.all);
  const [todosCounter, setTodosCounter] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    todosServices
      .getTodos()
      .then(data => setTodos(data))
      .catch(() => {
        setError(ErrorMessages.loadTodos);

        window.setTimeout(() => {
          setError(null);
        }, 3000);
      });
  }, []);

  useEffect(() => {
    const notCompletedTodos = todos.filter(todo => !todo.completed).length;
    setTodosCounter(notCompletedTodos);
  }, [todos]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit(e);
      }
    },
    [handleSubmit],
  );

  const handleSetFilter = useCallback((filter: FilterType) => {
    setFilterBy(filter);
  }, []);

  if (!USER_ID) {
    return (
      <div className="todoapp">
        <UserWarning />
      </div>
    );
  }

  const filteredTodos = getFilteredTodos(todos, filterBy);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: todos.every(todo => todo.completed),
              })}
              data-cy="ToggleAllButton"
            />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              ref={inputRef}
            />
          </form>
        </header>

        <TodoList todos={filteredTodos} />
        {!!todos.length && (
          <Footer
            filterBy={filterBy}
            todosCounter={todosCounter}
            handleSetFilter={handleSetFilter}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Error error={error} />
    </div>
  );
};
