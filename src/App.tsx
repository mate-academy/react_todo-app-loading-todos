/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Filter } from './components/Filter';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/TodoList';

import { getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterLink';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('All');

  useEffect(() => {
    if (user) {
      getTodos(user.id)
        .then(setTodosFromServer)
        .catch(() => {
          setIsError(true);
          setErrorMessage('Can\'t load todos');
        });
    }
  }, []);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const handleClickCloseErrorMessage = () => {
    setIsError(false);
  };

  const handleClickSetFilterStatus = (status: FilterStatus) => {
    setFilterStatus(status);
  };

  const todos = todosFromServer.filter(todo => {
    switch (filterStatus) {
      case 'Active':
        return !todo.completed;

      case 'Completed':
        return todo.completed;

      default:
        return true;
    }
  });

  const amountOfTodosToComplete = todosFromServer.filter(
    todo => !todo.completed,
  ).length;

  if (isError) {
    setTimeout(() => setIsError(false), 3000);
  }

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
            />
          </form>
        </header>

        <TodoList todos={todos} />

        {todosFromServer.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${amountOfTodosToComplete} items left`}
            </span>

            <Filter onSetFilterStatus={handleClickSetFilterStatus} />

            <button
              data-cy="ClearCompletedButton"
              type="button"
              className="todoapp__clear-completed"
              disabled={amountOfTodosToComplete === todosFromServer.length}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <ErrorNotification
        isError={isError}
        onCloseErrorMessage={handleClickCloseErrorMessage}
        errorMessage={errorMessage}
      />
    </div>
  );
};
