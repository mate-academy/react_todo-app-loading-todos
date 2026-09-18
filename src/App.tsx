/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
// import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import cn from 'classnames';
import { Filter } from './Components/Filter/Filter';
import { DefaultFilter } from './types/DefaultFilter';
import { TodoList } from './Components/TodoList/TodoList';
import { NewTodo } from './Components/NewTodo.tsx/NewTodo';
import { UserWarning } from './UserWarning';

const errorMessageOptions = {
  loadTodos: 'Unable to load todos',
  emptyTitle: 'Title should not be empty',
  newTodo: 'Unable to add a todo',
  deleteTodo: 'Unable to delete a todo',
  updateTodo: 'Unable to update a todo',
};

function getVisibleTodos(selectedFilter: DefaultFilter, todos: Todo[]) {
  if (selectedFilter === DefaultFilter.All) {
    return todos;
  }

  if (selectedFilter === DefaultFilter.Active) {
    return todos.filter(todo => todo.completed === false);
  }

  return todos.filter(todo => todo.completed === true);
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const timerId = useRef<ReturnType<typeof setTimeout>>();
  const [selectedFilter, setSelectedFilter] = useState<DefaultFilter>(
    DefaultFilter.All,
  );

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(errorMessageOptions.loadTodos));
  }, []);

  const handleErrorMessageRemoval = () => {
    setErrorMessage('');
  };

  useEffect(() => {
    if (errorMessage !== '') {
      timerId.current = setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }, [errorMessage]);

  const filteredTodos = useMemo(
    () => getVisibleTodos(selectedFilter, todos),
    [selectedFilter, todos],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

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
          <NewTodo />
        </header>
        {todos.length > 0 && <TodoList todos={filteredTodos} />}

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <Filter
              filterValue={selectedFilter}
              onSelectFilter={setSelectedFilter}
            />

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

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: errorMessage === '' },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleErrorMessageRemoval}
        />
        {errorMessage}
      </div>
    </div>
  );
};
