/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react';
import { getTodos, updateTodos } from './api/todos';
import { Todo } from './types/Todo';

import classNames from 'classnames';
import { TodoList } from './TodoList';
import { getFilteredData } from './helpres/helpers';
import { FilterTypes } from './enum/FilterTypes';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);

  const [todoLoadingStates, setTodoLoadingStates] = React.useState<{
    [key: number]: boolean;
  }>({});
  const [isListLoading, setIsListLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState('');

  const [filter, setFilter] = React.useState<FilterTypes>(FilterTypes.All);

  const inputRef = useRef<HTMLInputElement>(null);

  const displayedTodos = getFilteredData(todos, filter);
  const getNotCompletedTodos = todos.filter(todo => !todo.completed).length;

  const setTodoLoading = (id: number, loading: boolean) => {
    setTodoLoadingStates(prevState => ({ ...prevState, [id]: loading }));
  };

  const onSelectInputChange = async (id: number, completed: boolean) => {
    try {
      setTodoLoading(id, completed);
      setErrorMessage('');

      await updateTodos(id, true);

      setTodos(todosList =>
        todosList.map(todo => (todo.id === id ? { ...todo, completed } : todo)),
      );
    } catch (error) {
      setErrorMessage('Something went wrong');
      throw error;
    } finally {
      setTodoLoading(id, false);
    }
  };

  async function getTodosList() {
    try {
      const todosData = await getTodos();

      setTodos(todosData);
    } catch (error) {
      setErrorMessage('Unable to load todos');
      throw error;
    } finally {
      setIsListLoading(false);
    }
  }

  useEffect(() => {
    getTodosList();

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    let mistakeTimer = 0;

    if (errorMessage) {
      mistakeTimer = window.setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }

    return () => {
      window.clearTimeout(mistakeTimer);
    };
  }, [errorMessage]);

  const isSelectedFilter = (filterType: FilterTypes) =>
    filter === FilterTypes[filterType];

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
              ref={inputRef}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {!isListLoading && (
          <TodoList
            onSelectInputChange={onSelectInputChange}
            todoList={displayedTodos}
            todoLoadingStates={todoLoadingStates}
          />
        )}

        {!isListLoading && todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {getNotCompletedTodos} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: isSelectedFilter(FilterTypes.All),
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilter(FilterTypes.All)}
              >
                {FilterTypes.All}
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: isSelectedFilter(FilterTypes.Active),
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilter(FilterTypes.Active)}
              >
                {FilterTypes.Active}
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: isSelectedFilter(FilterTypes.Completed),
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter(FilterTypes.Completed)}
              >
                {FilterTypes.Completed}
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {/*show only one message at a time
        Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo*/}
        {errorMessage}
      </div>
    </div>
  );
};
