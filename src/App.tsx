/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Status } from './types/Status';
import { TodosFilter } from './components/TodosFilter/TodosFilter';
import cn from 'classnames';
import { Errors } from './types/Errors';

const USER_ID = 7023;

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredType, setFilteredType] = useState(Status.All);
  const [errorMessage, setErrorMessage] = useState<Errors | null>(null);

  const leftToComplete = todos.filter(todo => !todo.completed).length;
  const showClearButton = todos.filter(todo => todo.completed).length > 0;

  useEffect(() => {
    setErrorMessage(null);
    getTodos(USER_ID).then(todo => setTodos(todo)).catch((error) => {
      setErrorMessage(Errors.LOAD_ERROR);
      throw error;
    })
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  }, [errorMessage, setErrorMessage]);

  const filterTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filteredType) {
        case Status.All:
          return true;
        case Status.Completed:
          return todo.completed;
        case Status.Active:
          return !todo.completed;
        default:
          return true;
      }
    });
  }, [filteredType, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={cn('todoapp__toggle-all', { active: todos.length > 0 })}
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

        <TodoList todos={filterTodos} />

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${leftToComplete} items left`}
            </span>


            <TodosFilter filteredType={filteredType} setFilteredType={setFilteredType} />
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              hidden={!showClearButton}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {errorMessage && (
        <div
          data-cy="ErrorNotification"
          className={cn('notification is-danger is-light has-text-weight-normal', { hidden: !errorMessage })}>
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => setErrorMessage(null)}
          />
          {errorMessage}
        </div>
      )}
    </div>
  );
};
