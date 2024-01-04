/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { TodoList } from './Components/TodoList';
import {
  Actions,
  DispatchContext,
  Keys,
  StateContext,
} from './Components/Store';

enum TodosType {
  all = 'All',
  active = 'Active',
  completed = 'Completed',
}

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const [todoTitle, setTodoTitle] = useState('');
  const [USER_ID] = useState(12123);
  const {
    allTodos,
    loadingError,
  } = useContext(StateContext);
  const activeTodos = allTodos?.filter(todo => !todo.completed) || [];
  const completedTodos = allTodos?.filter(todo => todo.completed) || [];
  const [visibleTodosType, setVisibleTodosType] = useState(TodosType.all);
  const [errorMessage, setErrorMessage] = useState(loadingError);

  useEffect(() => {
    dispatch({
      type: Actions.setNewUserId,
      userId: USER_ID,
    });
  }, [USER_ID, dispatch]);

  let visibleTodos = allTodos;

  if (visibleTodosType === TodosType.all) {
    visibleTodos = allTodos;
  } else if (visibleTodosType === TodosType.active) {
    visibleTodos = activeTodos;
  } else {
    visibleTodos = completedTodos;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleBlur = () => {
    if (todoTitle.trim()) {
      dispatch({
        type: Actions.addNew,
        todo: {
          userId: USER_ID,
          id: +new Date(),
          title: todoTitle,
          completed: false,
        },
      });
      setTodoTitle('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!todoTitle.trim() && e.key === Keys.Enter) {
      setErrorMessage('Title should not be empty');
    }

    if (e.key === Keys.Enter) {
      e.preventDefault();

      if (todoTitle.trim()) {
        dispatch({
          type: Actions.addNew,
          todo: {
            id: +new Date(),
            title: todoTitle,
            completed: false,
            userId: USER_ID,
          },
        });
        setTodoTitle('');
      } else {
        setErrorMessage('Title should not be empty');
      }
    }

    return 0;
  };

  const setAllTodosVisible = () => {
    visibleTodos = allTodos;
    setVisibleTodosType(TodosType.all);
  };

  const setActiveTodosVisible = () => {
    visibleTodos = activeTodos;
    setVisibleTodosType(TodosType.active);
  };

  const setComplitedTodosVisible = () => {
    visibleTodos = completedTodos;
    setVisibleTodosType(TodosType.completed);
  };

  const handleToogleAll = () => {
    dispatch({ type: Actions.markAll });
  };

  const destroyCompletedTodos = () => {
    dispatch({ type: Actions.destroyCompleted });
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
          {!!activeTodos.length && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: !allTodos.length,
              })}
              data-cy="ToggleAllButton"
              disabled={!allTodos.length}
              onClick={handleToogleAll}
            />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todoTitle}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
            />
          </form>
        </header>

        <TodoList todos={visibleTodos} />

        {/* Hide the footer if there are no todos */}
        {!!allTodos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="todosCounter">
              {activeTodos.length === 1
                ? `${activeTodos.length} item left`
                : `${activeTodos.length} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                data-cy="FilterLinkAll"
                className={cn('filter__link', {
                  selected: visibleTodosType === TodosType.all,
                })}
                onClick={setAllTodosVisible}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: visibleTodosType === TodosType.active,
                })}
                data-cy="FilterLinkActive"
                onClick={setActiveTodosVisible}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: visibleTodosType === TodosType.completed,
                })}
                onClick={setComplitedTodosVisible}
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            {!!completedTodos.length && (
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                onClick={destroyCompletedTodos}
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorMessage && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button data-cy="HideErrorButton" type="button" className="delete" />
          {/* show only one message at a time */}
          <p>{errorMessage}</p>
          {/* Title should not be empty */}
          {/* Unable to add a todo */}
          {/* Unable to delete a todo */}
          {/* Unable to update a todo */}
        </div>
      )}
    </div>
  );
};
