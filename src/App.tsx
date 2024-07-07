/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { SelectedStatus, Todo } from './types/Todo';
import cn from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodos, setSelectedTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(SelectedStatus.all);

  const filterSelectedTodos = (status: SelectedStatus) => {
    if (status === SelectedStatus.active) {
      return todos.filter(todo => !todo.completed) || [];
    }

    if (status === SelectedStatus.completed) {
      return todos.filter(todo => todo.completed) || [];
    }

    return todos;
  };

  const handleSetStatus = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    switch (target.textContent) {
      case SelectedStatus.all:
        setSelectedStatus(SelectedStatus.all);
        setSelectedTodos(filterSelectedTodos(SelectedStatus.all));
        break;
      case SelectedStatus.active:
        setSelectedStatus(SelectedStatus.active);
        setSelectedTodos(filterSelectedTodos(SelectedStatus.active));
        break;
      case SelectedStatus.completed:
        setSelectedStatus(SelectedStatus.completed);
        setSelectedTodos(filterSelectedTodos(SelectedStatus.completed));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getTodos()
      .then(todoData => {
        setTodos(todoData);
        setSelectedTodos(todoData);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

  const handleChangeTodo = (todoId: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
    setSelectedTodos(filterSelectedTodos(selectedStatus));
  };

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
            className={cn('todoapp__toggle-all', {
              active: false,
            })}
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

        {selectedTodos.length !== 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {selectedTodos.map(todo => {
              const { id, completed, title } = todo;

              return (
                <div
                  key={id}
                  data-cy="Todo"
                  className={cn('todo', { completed: completed })}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      value={title}
                      checked={completed}
                      onChange={() => handleChangeTodo(id)}
                    />
                  </label>

                  <span data-cy="TodoTitle" className="todo__title">
                    {title}
                  </span>

                  {/* Remove button appears only on hover */}
                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                  >
                    ×
                  </button>

                  {/* overlay will cover the todo while it is being deleted or updated */}
                  <div data-cy="TodoLoader" className="modal overlay">
                    <div className="modal-background has-background-white-ter" />
                    <div className="loader" />
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.reduce(
                (count, todo) => count + (todo.completed ? 0 : 1),
                0,
              )}{' '}
              items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: selectedStatus === SelectedStatus.all,
                })}
                data-cy="FilterLinkAll"
                onClick={handleSetStatus}
              >
                {SelectedStatus.all}
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: selectedStatus === SelectedStatus.active,
                })}
                data-cy="FilterLinkActive"
                onClick={handleSetStatus}
              >
                {SelectedStatus.active}
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: selectedStatus === SelectedStatus.completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={handleSetStatus}
              >
                {SelectedStatus.completed}
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

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
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
        {/* show only one message at a time */}
        {/* Unable to load todos
        <br />
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

<>
  {/* This is a completed todo */}
  <div data-cy="Todo" className="todo completed">
    <label className="todo__status-label">
      <input
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        checked
      />
    </label>

    <span data-cy="TodoTitle" className="todo__title">
      Completed Todo
    </span>

    {/* Remove button appears only on hover */}
    <button type="button" className="todo__remove" data-cy="TodoDelete">
      ×
    </button>

    {/* overlay will cover the todo while it is being deleted or updated */}
    <div data-cy="TodoLoader" className="modal overlay">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>

  {/* This todo is an active todo */}
  <div data-cy="Todo" className="todo">
    <label className="todo__status-label">
      <input data-cy="TodoStatus" type="checkbox" className="todo__status" />
    </label>

    <span data-cy="TodoTitle" className="todo__title">
      Not Completed Todo
    </span>
    <button type="button" className="todo__remove" data-cy="TodoDelete">
      ×
    </button>

    <div data-cy="TodoLoader" className="modal overlay">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>

  {/* This todo is being edited */}
  <div data-cy="Todo" className="todo">
    <label className="todo__status-label">
      <input data-cy="TodoStatus" type="checkbox" className="todo__status" />
    </label>

    {/* This form is shown instead of the title and remove button */}
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
  </div>

  {/* This todo is in loadind state */}
  <div data-cy="Todo" className="todo">
    <label className="todo__status-label">
      <input data-cy="TodoStatus" type="checkbox" className="todo__status" />
    </label>

    <span data-cy="TodoTitle" className="todo__title">
      Todo is being saved now
    </span>

    <button type="button" className="todo__remove" data-cy="TodoDelete">
      ×
    </button>

    {/* 'is-active' class puts this modal on top of the todo */}
    <div data-cy="TodoLoader" className="modal overlay is-active">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
</>;
