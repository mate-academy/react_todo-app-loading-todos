/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { TodoItem } from './components/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [fetchedTodos, setFetchedTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isHidden, setIsHidden] = useState(true);
  const [filterBy, setFilterBy] = useState<'all' | 'active' | 'completed'>(
    'all',
  );

  const hasCompleted = fetchedTodos.find(todo => todo.completed)?.completed;

  const todoCounter: number | string = fetchedTodos.filter(todo =>
    filterBy === 'active' ? todo.completed : !todo.completed,
  ).length;

  const todoCounterTitle =
    (todoCounter > 1 ? `${todoCounter} items` : `${todoCounter} item`) +
    ' left';

  const errorMessageHandler = (er: Error) => {
    setIsHidden(false);
    setErrorMessage(er.message);
    setTimeout(() => {
      setIsHidden(true);
    }, 3000);
  };
  //
  // <br />
  // Title should not be empty
  // <br />
  // Unable to add a todo
  // <br />
  // Unable to delete a todo
  // <br />
  // Unable to update a todo

  useEffect(() => {
    setErrorMessage('');

    getTodos()
      .then(serverTodos => {
        setTodos(serverTodos);
        setFetchedTodos(serverTodos);
      })
      .catch(errorMessageHandler);
  }, []);

  useEffect(() => {
    let filteredTodos = [...todos];

    if (filterBy !== 'all') {
      filteredTodos = filteredTodos.filter(todo =>
        filterBy === 'active' ? !todo.completed : todo.completed,
      );
    }

    setFetchedTodos(filteredTodos);
  }, [filterBy, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {!!todos.length && (
            <button
              type="button"
              className="todoapp__toggle-all"
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

        {!!todos.length && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {fetchedTodos.map(({ id, title, completed }) => (
                <TodoItem title={title} status={completed} key={id} />
              ))}

              {/*/!* This todo is being edited *!/*/}
              {/*<div data-cy="Todo.tsx" className="todo">*/}
              {/*  <label className="todo__status-label">*/}
              {/*    <input*/}
              {/*      data-cy="TodoStatus"*/}
              {/*      type="checkbox"*/}
              {/*      className="todo__status"*/}
              {/*    />*/}
              {/*  </label>*/}

              {/*  /!* This form is shown instead of the title and remove button *!/*/}
              {/*  <form>*/}
              {/*    <input*/}
              {/*      data-cy="TodoTitleField"*/}
              {/*      type="text"*/}
              {/*      className="todo__title-field"*/}
              {/*      placeholder="Empty todo will be deleted"*/}
              {/*      value="Todo.tsx is being edited now"*/}
              {/*    />*/}
              {/*  </form>*/}

              {/*  <div data-cy="TodoLoader" className="modal overlay">*/}
              {/*    <div className="modal-background has-background-white-ter" />*/}
              {/*    <div className="loader" />*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/* This todo is in loadind state */}
              {/*<div data-cy="Todo" className="todo">*/}
              {/*  <label className="todo__status-label">*/}
              {/*    <input*/}
              {/*      data-cy="TodoStatus"*/}
              {/*      type="checkbox"*/}
              {/*      className="todo__status"*/}
              {/*    />*/}
              {/*  </label>*/}

              {/*  <span data-cy="TodoTitle" className="todo__title">*/}
              {/*    Todo is being saved now*/}
              {/*  </span>*/}

              {/*  <button*/}
              {/*    type="button"*/}
              {/*    className="todo__remove"*/}
              {/*    data-cy="TodoDelete"*/}
              {/*  >*/}
              {/*    ×*/}
              {/*  </button>*/}

              {/*  /!* 'is-active' class puts this modal on top of the todo *!/*/}
              {/*  <div data-cy="TodoLoader" className="modal overlay is-active">*/}
              {/*    <div className="modal-background has-background-white-ter" />*/}
              {/*    <div className="loader" />*/}
              {/*  </div>*/}
              {/*</div>*/}
            </section>

            {/* Hide the footer if there are no todos */}
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {todoCounterTitle}
              </span>

              {/* Active link should have the 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={classNames('filter__link', {
                    selected: filterBy === 'all',
                  })}
                  data-cy="FilterLinkAll"
                  onClick={() => setFilterBy('all')}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={classNames('filter__link', {
                    selected: filterBy === 'active',
                  })}
                  data-cy="FilterLinkActive"
                  onClick={() => setFilterBy('active')}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={classNames('filter__link', {
                    selected: filterBy === 'completed',
                  })}
                  data-cy="FilterLinkCompleted"
                  onClick={() => setFilterBy('completed')}
                >
                  Completed
                </a>
              </nav>

              {/*this button should be disabled if there are no completed todos*/}

              {hasCompleted && (
                <button
                  type="button"
                  className="todoapp__clear-completed"
                  data-cy="ClearCompletedButton"
                >
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: isHidden },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setIsHidden(true)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
