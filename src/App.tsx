import {
  useContext,
  useEffect,
  useRef,
} from 'react';

import classNames from 'classnames';
import { DispatchContext, StateContext } from './providers/StateContext';

import { AuthForm } from './components/AuthForm/AuthForm';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';

import { getTodos, patchTodo } from './api/todos';
import { ActionTypes } from './types/ActionTypes';

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, user } = useContext(StateContext);

  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    getTodos(user.id)
      .then(dataFromServer => {
        dispatch({
          type: ActionTypes.SET_TODOS,
          todos: dataFromServer,
        });
      })
      .catch(() => {
        dispatch({
          type: ActionTypes.SET_ERROR,
          error: {
            message: 'Unable to load todos',
            show: true,
          },
        });
      })
      .finally(() => {
        if (newTodoField.current) {
          newTodoField.current.focus();
        }
      });
  }, [user]);

  const handleToggleAll = (newCompletedState: boolean) => {
    const fetchBatch = todos.map(todo => {
      if (todo.completed === newCompletedState) {
        return Promise.resolve(todo);
      }

      dispatch({
        type: ActionTypes.SET_LOADER,
        loader: {
          id: todo.id,
          on: true,
        },
      });

      return patchTodo(todo.id, {
        completed: newCompletedState,
      });
    });

    // eslint-disable-next-line no-console
    console.log(fetchBatch);

    Promise.all(fetchBatch)
      .then(dataFromServer => {
        // eslint-disable-next-line no-console
        console.log(dataFromServer);
        dispatch({
          type: ActionTypes.SET_TODOS,
          todos: dataFromServer,
        });
      })
      .finally(() => {
        dispatch({
          type: ActionTypes.OFF_ALL_LOADERS,
        });
      });
  };

  if (!user) {
    return <AuthForm />;
  }

  const countIncompleted = todos.filter(todo => !todo.completed).length;

  // eslint-disable-next-line no-console
  console.log('App re-render', countIncompleted);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              data-cy="ToggleAllButton"
              type="button"
              aria-label="Toggle all"
              className={classNames(
                'todoapp__toggle-all',
                {
                  active: !countIncompleted,
                },
              )}
              onClick={() => handleToggleAll(!!countIncompleted)}
            />
          )}

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

        {todos.length > 0 && (
          <>
            <TodoList />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="todosCounter">
                {`${countIncompleted} items left`}
              </span>

              <nav className="filter" data-cy="Filter">
                <a
                  data-cy="FilterLinkAll"
                  href="#/"
                  className="filter__link selected"
                >
                  All
                </a>

                <a
                  data-cy="FilterLinkActive"
                  href="#/active"
                  className="filter__link"
                >
                  Active
                </a>
                <a
                  data-cy="FilterLinkCompleted"
                  href="#/completed"
                  className="filter__link"
                >
                  Completed
                </a>
              </nav>

              <button
                data-cy="ClearCompletedButton"
                type="button"
                className="todoapp__clear-completed"
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <ErrorMessage />
    </div>
  );
};
