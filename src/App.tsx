/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';

const USER_ID = 11564;

type Filters = 'All' | 'Active' | 'Completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isVisibleErrorMessage, setIsVisibleErrorMessage]
  = useState<boolean>(false);
  const [filterTodos, setFilterTodos] = useState<Filters>('All');

  const itemsLeft = (): number => {
    const activeTasks = todos.filter((task) => !task.completed);

    return activeTasks.length;
  };

  const handleFilterTodos
  = (todosArray: Todo[], option: Filters): Todo[] => {
    return todosArray.filter((todo) => {
      if (option === 'Active') {
        return !todo.completed;
      }

      if (option === 'Completed') {
        return todo.completed;
      }

      return true;
    });
  };

  const TodoList = () => {
    return handleFilterTodos(todos, filterTodos);
  };

  const handleTodoStatusChange = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const fadeErrorMessage = () => {
    setTimeout(() => {
      setIsVisibleErrorMessage(false);
    }, 3000);
  };

  useEffect(() => {
    setIsVisibleErrorMessage(false);
    client.get<Todo[]>(`/todos?userId=${USER_ID}`)
      .then((data) => setTodos(data))
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setIsVisibleErrorMessage(true);
        fadeErrorMessage();
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {todos.some((todo) => !todo.completed) && (
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

        <section className="todoapp__main" data-cy="TodoList">
          {TodoList().map((todo) => {
            return (
              <div
                data-cy="Todo"
                className={
                  classNames(['todo'], { completed: todo.completed })
                }
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    onChange={() => {
                      handleTodoStatusChange(todo.id);
                    }}
                    checked={todo.completed}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>

                {/* Remove button appears only on hover */}
                {todo.completed && (
                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                  >
                    ×
                  </button>
                )}

                {/* overlay will cover the todo while it is being updated */}
                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            );
          })}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${itemsLeft()} items left`}
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={
                  classNames(
                    ['filter__link'],
                    { selected: filterTodos === 'All' },
                  )
                }
                data-cy="FilterLinkAll"
                onClick={() => setFilterTodos('All')}
              >
                All
              </a>

              <a
                href="#/active"
                className={
                  classNames(
                    ['filter__link'],
                    { selected: filterTodos === 'Active' },
                  )
                }
                data-cy="FilterLinkActive"
                onClick={() => setFilterTodos('Active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={
                  classNames(
                    ['filter__link'],
                    { selected: filterTodos === 'Completed' },
                  )
                }
                data-cy="FilterLinkCompleted"
                onClick={() => setFilterTodos('Completed')}
              >
                Completed
              </a>
            </nav>

            {/* don't show this button if there are no completed todos */}
            {todos.some((todo) => todo.completed) && (
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={
          classNames(
            ['notification is-danger is-light has-text-weight-normal'],
            { hidden: !isVisibleErrorMessage },
          )
        }
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setIsVisibleErrorMessage(false)}
        />
        {/* show only one message at a time */}
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
