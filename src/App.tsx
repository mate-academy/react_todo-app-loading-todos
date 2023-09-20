/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { FilterTodos } from './components/FilterTodos/FilterTodos';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';

const USER_ID = 11547;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter]
  = useState<Filter>(Filter.All);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setIsError(true);
        setTimeout(() => setIsError(false), 3000);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSelectedFilter = (filter: Filter) => {
    setActiveFilter(filter);
  };

  const filteredTodos = todos.filter(todo => {
    if (activeFilter === Filter.Active) {
      return !todo.completed;
    }

    if (activeFilter === Filter.Completed) {
      return todo.completed;
    }

    return todo;
  });

  const countActiveTodos = todos.filter(todo => !todo.completed).length;

  const toggleCompleted = (id: number) => {
    const selectedTodo = todos.find(todo => todo.id === id);
    let updatedTodos;

    if (selectedTodo) {
      updatedTodos = todos.map(todo => (
        todo === selectedTodo
          ? { ...todo, completed: !todo.completed }
          : todo
      ));

      setTodos(updatedTodos);
    }
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {todos.filter(todo => !todo.completed).length !== 0
          && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          )}

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

        <TodoList todos={filteredTodos} toggleCompleted={toggleCompleted} />

        {/* Hide the footer if there are no todos */}
        {!isLoading && todos.length > 0
        && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${countActiveTodos} items left`}
            </span>

            {/* Active filter should have a 'selected' class */}
            <FilterTodos
              activeFilter={activeFilter}
              handleSelectedFilter={handleSelectedFilter}
            />

            {/* don't show this button if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        ) }
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !isError,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setIsError(false)}
        />
        {/* show only one message at a time */}
        {todos.length === 0 && 'Unable to load todos'}
        {/* <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>

    </div>
  );
};
