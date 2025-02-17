/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import * as todoService from './api/todos';
import TodosList from './components/TodosList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusTodo, setStatusTodo] = useState(true);
  const [filterTerm, setFilterTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  function loadTodos() {
    setIsLoading(true);
    todoService
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => setIsLoading(false));
  }

  // eslint-disable-next-line no-console
  console.log('FilterItem:', filterTerm);

  const filteredTodos = useMemo(() => {
    switch (filterTerm) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filterTerm]);

  function addTodo({ title, userId, completed }: Todo) {
    todoService
      .createTodo({ title, userId, completed })
      .then(newTodo => {
        setTodos(currentTodos => [...currentTodos, newTodo]);
      })
      .catch(() => {
        setErrorMessage('Unable to add todos');
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => {
        setTodoTitle('');
      });
  }

  function deleteTodo(todoId: number) {
    todoService
      .deleteTodo(todoId)
      .then(() => {
        setTodos(currentTodo => currentTodo.filter(todo => todo.id !== todoId));
      })
      .catch(() => {
        setErrorMessage('Unable to delete todos');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }

  function updateTodo(todoId: number) {
    setIsLoading(true);

    todoService
      .updateTodo(todoId, statusTodo)
      .then(updatedTodo => {
        setTodos(currentTodos => {
          return currentTodos.map(todo =>
            todo.id === todoId ? updatedTodo : todo,
          );
        });
      })
      .catch(() => {
        setErrorMessage('Unable to update todo');
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => setIsLoading(false));
  }

  // eslint-disable-next-line no-console
  // console.log('UpdatedTodo:', updatedTodo);

  useEffect(() => {
    loadTodos();
  }, []);

  // useEffect(() => {
  //   updateTodo(todoId);
  // }, []);

  //#region handler

  function handleCloseErrorMessage() {
    setErrorMessage('');
  }

  function handlerAddTodo(event: React.FormEvent) {
    event.preventDefault();
    const newTodo = {
      title: todoTitle,
      userId: USER_ID,
      completed: false,
    };

    addTodo(newTodo);
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTodoTitle(event.target.value);
  }

  function handleDeleteTodo(id?: number) {
    if (id === undefined) {
      return;
    }

    deleteTodo(id);
  }

  function handleChangeStatus(
    todoId: number | undefined,
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    if (!todoId) {
      return;
    }

    setStatusTodo(event.target.checked);
    updateTodo(todoId);
  }

  function handleFiltered(filter: string) {
    setFilterTerm(filter);
  }

  //#endregion handler

  if (!USER_ID) {
    return <UserWarning />;
  }

  // eslint-disable-next-line no-console
  // console.log('ObjectFromAPI:', todos);

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
          <form onSubmit={handlerAddTodo}>
            <input
              data-cy="NewTodoField"
              value={todoTitle}
              onChange={handleTitleChange}
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <TodosList
              isLoading={isLoading}
              todos={filteredTodos}
              handleChangeStatus={handleChangeStatus}
              handleDeleteTodo={handleDeleteTodo}
            />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {todos.length} items left
              </span>

              {/* Active link should have the 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={classNames('filter__link', {
                    selected: filterTerm === '',
                  })}
                  data-cy="FilterLinkAll"
                  onClick={() => handleFiltered('')}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={classNames('filter__link', {
                    selected: filterTerm === 'active',
                  })}
                  data-cy="FilterLinkActive"
                  onClick={() => handleFiltered('active')}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={classNames('filter__link', {
                    selected: filterTerm === 'completed',
                  })}
                  data-cy="FilterLinkCompleted"
                  onClick={() => handleFiltered('completed')}
                >
                  Completed
                </a>
              </nav>

              {/* this button should be disabled if there are no completed todos */}
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                onClick={() => handleFiltered('')}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        // className="notification is-danger is-light has-text-weight-normal"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleCloseErrorMessage}
        />
        {/* show only one message at a time */}
        {errorMessage}
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
