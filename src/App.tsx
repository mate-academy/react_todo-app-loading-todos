/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { getTodos, updateTodos } from './api/todos';
import { Todo } from './types/Todo';

import classNames from 'classnames';
import { TodoList } from './TodoList';
import { getFilteredData } from './helpres/helpers';
import { FilterTypes } from './enum/FilterTypes';
import { Provider } from './context/context';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);

  const [todoLoadingStates, setTodoLoadingStates] = React.useState<{
    [key: number]: boolean;
  }>({});
  const [isListLoading, setIsListLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState('');

  const [filter, setFilter] = React.useState<FilterTypes>(FilterTypes.All);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [todoCompleted, setTodoCompleted] = useState<boolean | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const displayedTodos = getFilteredData(todos, filter);
  const getNotCompletedTodos = todos.filter(todo => !todo.completed).length;
  const getCompletedTodos = todos.filter(todo => todo.completed).length;

  const setTodoLoading = (id: number, loading: boolean) => {
    setTodoLoadingStates(prevState => ({ ...prevState, [id]: loading }));
  };

  const onSelectInputChange = (id: number, completed: boolean) => {
    setSelectedTodoId(id);
    setTodoCompleted(!completed);
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

  useEffect(() => {
    if (selectedTodoId !== null && todoCompleted !== null) {
      const updateTodo = async () => {
        try {
          setTodoLoading(selectedTodoId, true);
          setErrorMessage('');
          await updateTodos(selectedTodoId, todoCompleted);
          setTodos(prevTodos =>
            prevTodos.map(todo =>
              todo.id === selectedTodoId
                ? { ...todo, completed: todoCompleted }
                : todo,
            ),
          );
        } catch (error) {
          setErrorMessage('Something went wrong');
        } finally {
          setTodoLoading(selectedTodoId, false);
        }
      };

      updateTodo();
    }
  }, [selectedTodoId, todoCompleted]);

  const isSelectedFilter = (filterType: FilterTypes) =>
    filter === FilterTypes[filterType];

  const contextValue = {
    onSelectInputChange,
    todoLoadingStates,
  };

  return (
    <Provider value={contextValue}>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <header className="todoapp__header">
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: getCompletedTodos === todos.length,
              })}
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

          {!isListLoading && <TodoList todoList={displayedTodos} />}

          {!isListLoading && todos.length > 0 && (
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {getNotCompletedTodos} items left
              </span>

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

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={getNotCompletedTodos === todos.length}
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
          {errorMessage}
        </div>
      </div>
    </Provider>
  );
};
