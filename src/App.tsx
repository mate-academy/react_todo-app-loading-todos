/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { TodoList } from './Components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { Footer } from './Components/Footer/Footer';
import { StatesOfFilter } from './types/StatesOfFilter';

function getFilteredTodos(todos: Todo[], filterOption: StatesOfFilter): Todo[] {
  let filteredTodos = [...todos];

  if (filterOption !== StatesOfFilter.All) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (filterOption) {
        case StatesOfFilter.Active:
          return !todo.completed;

        case StatesOfFilter.Competed:
          return todo.completed;

        default:
          return;
      }
    });
  }

  return filteredTodos;
}

function getCountOfActiveTodos(todos: Todo[]): number {
  const countOfActiveTodos = todos.reduce((acc, todo) => {
    if (!todo.completed) {
      return acc + 1;
    }

    return acc;
  }, 0);

  return countOfActiveTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<StatesOfFilter>(StatesOfFilter.All);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handlerSetFilter = (filterSet: StatesOfFilter): void => {
    setFilterBy(filterSet);
  };

  const visibleTodos = getFilteredTodos(todos, filterBy);
  const counterTodos = getCountOfActiveTodos(todos);

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

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList currentTodos={visibleTodos} />
        </section>

        {/* This todo is being edited */}
        {/* This form is shown instead of the title and remove button */}
        {/* <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}

        {/* This todo is in loadind state */}
        {/* 'is-active' class puts this modal on top of the todo */}
        {/* <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Todo is being saved now
            </span>

            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}

        {!!todos.length && (
          <Footer
            onSetFilter={handlerSetFilter}
            countOfTodos={counterTodos}
            selectedFilter={filterBy}
          ></Footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
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
