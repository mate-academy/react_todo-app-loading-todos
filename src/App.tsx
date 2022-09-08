import {
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import classNames from 'classnames';
import { DispatchContext, StateContext } from './providers/StateContext';

import { AuthForm } from './components/AuthForm/AuthForm';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';

import {
  addTodo,
  AddTodoData,
  deleteTodo,
  getTodos,
  patchTodo,
} from './api/todos';

import { EAction } from './types/Action.enum';
import { EFilterBy } from './types/FilterBy.enum';

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, user, filterBy } = useContext(StateContext);
  const [newTodoText, setNewTodoText] = useState('');

  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    getTodos(user.id)
      .then(dataFromServer => {
        dispatch({
          type: EAction.SET_TODOS,
          todos: dataFromServer,
        });
      })
      .catch(() => {
        dispatch({
          type: EAction.SET_ERROR,
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

  if (!user) {
    return <AuthForm />;
  }

  const handleToggleAll = (newCompletedState: boolean) => {
    const fetchBatch = todos.map(todo => {
      if (todo.completed === newCompletedState) {
        return Promise.resolve(todo);
      }

      dispatch({
        type: EAction.SET_LOADER,
        loader: {
          id: todo.id,
          on: true,
        },
      });

      return patchTodo(todo.id, {
        completed: newCompletedState,
      });
    });

    Promise.all(fetchBatch)
      .then(dataFromServer => {
        dispatch({
          type: EAction.SET_TODOS,
          todos: dataFromServer,
        });
      })
      .finally(() => {
        dispatch({
          type: EAction.OFF_ALL_LOADERS,
        });
      });
  };

  const handleFilterClick = (newFilter: EFilterBy) => {
    dispatch({
      type: EAction.SET_FILTER,
      filterBy: newFilter,
    });
  };

  const handleAddTodo = (event: FormEvent) => {
    event.preventDefault();

    if (!newTodoText) {
      dispatch({
        type: EAction.SET_ERROR,
        error: {
          message: 'Title can\'t be empty',
          show: true,
        },
      });

      return;
    }

    const dataToAdd: AddTodoData = {
      userId: user.id,
      title: newTodoText,
      completed: false,
    };

    addTodo(dataToAdd)
      .then(newTodo => {
        dispatch({
          type: EAction.ADD_TODO,
          todo: newTodo,
        });
      })
      .catch(() => {
        dispatch({
          type: EAction.SET_ERROR,
          error: {
            message: 'Unable to add a todo',
            show: true,
          },
        });
      })
      .finally(() => setNewTodoText(''));
  };

  const handleClearCompleted = () => {
    const todosToDelete = todos.filter(todo => todo.completed);

    if (!todosToDelete.length) {
      return;
    }

    const fetchBatch = todosToDelete.map(todo => {
      dispatch({
        type: EAction.SET_LOADER,
        loader: {
          id: todo.id,
          on: true,
        },
      });

      return deleteTodo(todo.id);
    });

    Promise.all(fetchBatch)
      .then(() => {
        todosToDelete.forEach(entry => {
          dispatch({
            type: EAction.DELETE_TODO,
            deleteId: entry.id,
          });
        });
      })
      .catch(() => {
        dispatch({
          type: EAction.SET_ERROR,
          error: {
            message: 'Unable to delete a todo',
            show: true,
          },
        });
      });
  };

  const countIncompleted = todos.filter(todo => !todo.completed).length;
  const countCompleted = todos.length - countIncompleted;

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

          <form onSubmit={handleAddTodo}>
            <input
              data-cy="NewTodoField"
              className="todoapp__new-todo"
              type="text"
              name="newTodoText"
              ref={newTodoField}
              value={newTodoText}
              onChange={event => setNewTodoText(event.target.value)}
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
                  className={classNames(
                    'filter__link',
                    {
                      selected: filterBy === EFilterBy.ALL,
                    },
                  )}
                  onClick={(event) => {
                    event.preventDefault();
                    handleFilterClick(EFilterBy.ALL);
                  }}
                >
                  All
                </a>

                <a
                  data-cy="FilterLinkActive"
                  href="#/active"
                  className={classNames(
                    'filter__link',
                    {
                      selected: filterBy === EFilterBy.ACTIVE,
                    },
                  )}
                  onClick={(event) => {
                    event.preventDefault();
                    handleFilterClick(EFilterBy.ACTIVE);
                  }}
                >
                  Active
                </a>
                <a
                  data-cy="FilterLinkCompleted"
                  href="#/completed"
                  className={classNames(
                    'filter__link',
                    {
                      selected: filterBy === EFilterBy.COMPLETED,
                    },
                  )}
                  onClick={(event) => {
                    event.preventDefault();
                    handleFilterClick(EFilterBy.COMPLETED);
                  }}
                >
                  Completed
                </a>
              </nav>

              {countCompleted > 0 && (
                <button
                  data-cy="ClearCompletedButton"
                  type="button"
                  className="todoapp__clear-completed"
                  onClick={handleClearCompleted}
                >
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}
      </div>

      <ErrorMessage />
    </div>
  );
};
