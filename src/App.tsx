/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useRef } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos, postTodos } from './api/todos';
import { Action, DispatchContext, StateContext } from './store/store';
import cn from 'classnames';
import classNames from 'classnames';

const downloadAllTodos = async (dispatch: React.Dispatch<Action>) => {
  try {
    const allTodos = await getTodos();

    dispatch({ type: 'setAllTodos', todos: allTodos });
  } catch (error) {
    // eslint-disable-next-line no-console
    dispatch({ type: 'setError', error: 'Unable to load todos' });
  }
};

export const App: React.FC = () => {
  // #region
  const dispatch = useContext(DispatchContext);
  const {
    todos,
    newTodo,
    focusNewTodo,
    useTodos,
    changerId,
    idTodoSubmitting,
    errorsInTodo,
  } = useContext(StateContext);

  useEffect(() => {
    downloadAllTodos(dispatch);
  }, [dispatch]);

  const todosLeft = todos.filter(todo => !todo.completed).length;

  const allTodosComplete = todos.reduce((prev, todo) => {
    return prev && todo.completed;
  }, true);

  const inputRef = useRef<HTMLInputElement>(null);

  const todosFilter = todos.filter(todo => {
    if (useTodos === 'Active') {
      return !todo.completed;
    }

    if (useTodos === 'Completed') {
      return todo.completed;
    }

    return true;
  });

  const addNewTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputRef.current?.blur();

    if (newTodo.trim() && !idTodoSubmitting) {
      dispatch({ type: 'add' });

      postTodos({
        title: newTodo.trim(),
        completed: false,
        userId: USER_ID,
      })
        .then(() => {
          dispatch({
            type: 'changeTodo',
            text: '',
          });
          dispatch({ type: 'setFocudNewTodo' });
        })
        .catch(() => {
          dispatch({ type: 'setError', error: 'Unable to add a todo' });
          dispatch({ type: 'remove', id: 0 });
        })
        .finally(() => {
          dispatch({ type: 'setIdTodoSelection', id: 0 });
          inputRef.current?.focus();
        });
    } else if (!newTodo.trim()) {
      dispatch({ type: 'setError', error: 'Title should not be empty' });
      inputRef.current?.focus();
      dispatch({
        type: 'changeTodo',
        text: '',
      });
    }
  };

  useEffect(() => {
    if (focusNewTodo) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [focusNewTodo]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  if (errorsInTodo) {
    setTimeout(() => {
      dispatch({ type: 'setError', error: '' });
    }, 3000);
  }

  // #endregion

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: allTodosComplete,
              })}
              data-cy="ToggleAllButton"
              onClick={() =>
                dispatch({ type: 'setAllCompleate', use: allTodosComplete })
              }
            />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={addNewTodo}>
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              disabled={idTodoSubmitting !== 0}
              value={newTodo}
              onClick={() => dispatch({ type: 'setFocudNewTodo' })}
              onBlur={() => dispatch({ type: 'setFocudNewTodo' })}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch({
                  type: 'changeTodo',
                  text: e.target.value.toString(),
                })
              }
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {todosFilter.map(todo => (
            <div
              data-cy="Todo"
              className={cn('todo', { completed: todo.completed })}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() => dispatch({ type: 'checked', id: todo.id })}
                />
              </label>

              {todo.id !== changerId && (
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={() =>
                    dispatch({ type: 'setChanged', id: todo.id })
                  }
                >
                  {todo.title}
                </span>
              )}

              {todo.id === changerId && (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    dispatch({ type: 'setChanged', id: 0 });
                  }}
                >
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value={todo.title}
                    onKeyUp={e => {
                      if (e.key === 'Escape') {
                        dispatch({ type: 'escapeChangedText', id: todo.id });
                        dispatch({ type: 'setChanged', id: 0 });
                      }
                    }}
                    autoFocus
                    onChange={e =>
                      dispatch({
                        type: 'changed',
                        id: todo.id,
                        text: e.target.value,
                      })
                    }
                    onBlur={() => dispatch({ type: 'setChanged', id: 0 })}
                  />
                </form>
              )}

              {/* Remove button appears only on hover */}
              {todo.id !== changerId && (
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => dispatch({ type: 'remove', id: todo.id })}
                >
                  ×
                </button>
              )}

              <div
                data-cy="TodoLoader"
                className={classNames('modal overlay', {
                  'is-active': idTodoSubmitting === todo.id,
                })}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todosLeft} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', { selected: useTodos === 'All' })}
                data-cy="FilterLinkAll"
                onClick={() => dispatch({ type: 'setUseTodos', name: 'All' })}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: useTodos === 'Active',
                })}
                data-cy="FilterLinkActive"
                onClick={() =>
                  dispatch({ type: 'setUseTodos', name: 'Active' })
                }
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: useTodos === 'Completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() =>
                  dispatch({ type: 'setUseTodos', name: 'Completed' })
                }
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={() => dispatch({ type: 'clearAll' })}
              disabled={todosLeft === todos.length}
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
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorsInTodo },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {errorsInTodo && (
          <>
            {errorsInTodo}
            <br />
          </>
        )}
        {/* Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
