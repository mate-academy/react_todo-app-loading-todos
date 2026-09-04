/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useMemo,
  useEffect,
  useCallback,
  useState,
  useRef,
} from 'react';
import { TodoItem } from './components/TodoItem/TodoItem';
import classNames from 'classnames';
import * as api from './api/todos';
import { Todo } from './types/Todo';

enum FilterOption {
  COMPLETED = 'completed',
  ACTIVE = 'active',
  ALL = 'all',
}

enum ErrorType {
  'ServerError' = 'Unable to load todos',
  'EmptyTitle' = 'Title should not be empty',
  'UnableToAdd' = 'Unable to add a todo',
  'UnableToDelete' = 'Unable to delete a todo',
  'UnableToUpdate' = 'Unable to update a todo',
}

export const App: React.FC = () => {
  const [ErrorMsg, setErrorMsg] = useState<ErrorType | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterOption>(FilterOption.ALL);
  const [isLoadingIds, setIsLoadingIds] = useState<number[]>([]);
  const [field, setField] = useState<string>('');

  const timerId = useRef<ReturnType<typeof setTimeout>>();

  const handleError = useCallback((msg: ErrorType) => {
    setErrorMsg(msg);

    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    timerId.current = setTimeout(() => {
      setErrorMsg(null);
    }, 2999);
  }, []);

  useEffect(() => {
    api
      .getTodos()
      .then(response => {
        setTodos(response);
      })
      .catch(() => {
        handleError(ErrorType.ServerError);
      });
  }, [handleError]);

  const visibleTodos = useMemo(() => {
    if (!todos) {
      return [];
    }

    return todos.filter(t => {
      switch (filter) {
        case FilterOption.COMPLETED:
          return t.completed;
        case FilterOption.ACTIVE:
          return !t.completed;
        default:
          return true;
      }
    });
  }, [todos, filter]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fieldVal = field.trim();

    if (fieldVal.length === 0) {
      handleError(ErrorType.EmptyTitle);

      return;
    }

    api
      .addTodo(field)
      .then(addedTodo => {
        setTodos(prevTodos => [...prevTodos, addedTodo]);
        setField('');
      })
      .catch(() => {
        handleError(ErrorType.UnableToAdd);
      });
  };

  const handleEdit = (id: number, title: string) => {
    if (!title.trim().length) {
      handleError(ErrorType.EmptyTitle);

      return;
    }

    setIsLoadingIds(prev => [...prev, id]);

    api
      .updateTodo(id, { title: title.trim() })
      .catch(() => {
        handleError(ErrorType.UnableToUpdate);
      })
      .finally(() => {
        setIsLoadingIds(prev => prev.filter(item => item !== id));
      });
  };

  const handleComplete = (id: number, completed: boolean) => {
    setIsLoadingIds(prev => [...prev, id]);

    api
      .updateTodo(id, { completed: completed })
      .then(() => {
        setTodos(prev => {
          return prev.map(item => {
            if (item.id === id) {
              return {
                ...item,
                completed: completed,
              };
            } else {
              return item;
            }
          });
        });
      })
      .catch(() => {
        handleError(ErrorType.UnableToUpdate);
      })
      .finally(() => {
        setIsLoadingIds(prev => prev.filter(item => item !== id));
      });
  };

  const handleDelete = (id: number) => {
    setIsLoadingIds(prev => [...prev, id]);

    api
      .deleteTodo(id)
      .then(() => {
        setTodos(prev => {
          return prev.filter(item => item.id !== id);
        });
      })
      .catch(() => {
        handleError(ErrorType.UnableToDelete);
      })
      .finally(() => {
        setIsLoadingIds(prev => prev.filter(item => item !== id));
      });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">Todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: todos.every(todo => todo.completed),
            })}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form onSubmit={e => handleSubmit(e)}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={field}
              onChange={e => setField(e.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos?.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isLoading={Boolean(isLoadingIds.find(id => id === todo.id))}
              onComplete={handleComplete}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filter === FilterOption.ALL,
                })}
                data-cy="FilterLinkAll"
                onClick={() => {
                  setFilter(FilterOption.ALL);
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filter === FilterOption.ACTIVE,
                })}
                data-cy="FilterLinkActive"
                onClick={() => {
                  setFilter(FilterOption.ACTIVE);
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filter === FilterOption.COMPLETED,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => {
                  setFilter(FilterOption.COMPLETED);
                }}
              >
                Completed
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

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !ErrorMsg },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => {
            if (timerId.current) {
              clearTimeout(timerId.current);
            }

            setErrorMsg(null);
          }}
        />
        {ErrorMsg}
      </div>
    </div>
  );
};
