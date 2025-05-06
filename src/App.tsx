/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  createTodo,
  deleteTodo,
  getTodos,
  statusCompletedUpdate,
  titleUpdate,
  USER_ID,
} from './api/todos';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const TIME = 3000;

type ErrorWithId = {
  id: number;
  message: string;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState<number[]>([]);
  const [inEdition, setInEdition] = useState<number | null>(null);
  const [newTodo, setNewTodo] = useState<string>('');
  const [editingTitle, setEditingTitle] = useState<string>('');
  const [disableForm, setDisableForm] = useState<boolean>(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [error, setError] = useState<ErrorWithId[]>([]);

  const setErrorHandle = useCallback((message: string) => {
    const id = Date.now();
    const newError: ErrorWithId = {
      id,
      message,
    };

    setError(erros => [...erros, newError]);
    setTimeout(
      () => setError(erros => erros.filter(erro => erro.id !== id)),
      TIME,
    );
  }, []);

  const keyPressHandler = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        const todo = newTodo.trim();

        event.preventDefault();
        if (todo !== '') {
          setDisableForm(true);
          createTodo(todo)
            .then(res => {
              const allTodos: Todo[] = todos;

              allTodos.push(res);

              setTodos(allTodos);
              setNewTodo('');
            })
            .catch(() => setErrorHandle('Unable to add a todo'))
            .finally(() => {
              setDisableForm(false);
              event.currentTarget.focus();
            });
        }
      }
    },
    [newTodo, todos, setErrorHandle],
  );

  const onChangeHandler = useCallback(
    (id: number) => {
      setLoader(nums => [...nums, id]);
      statusCompletedUpdate(id, !todos.find(todo => todo.id === id)?.completed)
        .then(() => {
          setTodos(prevTodos =>
            prevTodos.map(todo =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo,
            ),
          );
        })
        .catch(() => setErrorHandle('Unable to update a todo'))
        .finally(() => {
          setTimeout(() => {
            setLoader(ids => ids.filter(num => num !== id));
          }, 200);
        });
    },
    [todos, setErrorHandle],
  );

  const getEditionKeyDownHandler = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        event.currentTarget.blur();
      }
    },
    [],
  );

  const filteredTodos: Todo[] = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const getDeleteHandler = useCallback(
    (id: number) => {
      setLoader(nums => [...nums, id]);
      deleteTodo(id)
        .then(() => {
          setTodos(toDos => toDos.filter(todo => todo.id !== id));
        })
        .catch(() => setErrorHandle('Unable to delete a todo'))
        .finally(() => setLoader(ids => ids.filter(num => num !== id)));
    },
    [todos, setErrorHandle],
  );

  const getEditionTitleHandler = useCallback(
    (id: number) => {
      const title = editingTitle.trim();

      if (title === '') {
        setErrorHandle('Title should not be empty');
        getDeleteHandler(id);

        return;
      }

      if (title !== todos.find(todo => todo.id === id)?.title) {
        setLoader(prev => [...prev, id]);
        titleUpdate(id, title)
          .then(() => {
            setTodos(prev =>
              prev.map(todo => (todo.id === id ? { ...todo, title } : todo)),
            );
          })
          .catch(() => setErrorHandle('Unable to update a todo'))
          .finally(() => {
            setLoader(prev => prev.filter(num => num !== id));
            setInEdition(null);
            setEditingTitle('');
          });
      } else {
        setInEdition(null);
        setEditingTitle('');
      }
    },
    [todos, editingTitle, setErrorHandle, getDeleteHandler],
  );

  const getTodosHandler = useCallback(() => {
    getTodos()
      .then(res => setTodos(res))
      .catch(() => setErrorHandle('Unable to load todos'));
  }, [setErrorHandle]);

  const clearCompleted = useCallback(() => {
    const completedTodos = todos.filter(todo => todo.completed);
    const completedIds = completedTodos.map(todo => todo.id);

    setLoader(completedIds);

    Promise.all(completedTodos.map(todo => deleteTodo(todo.id)))
      .then(() => {
        setTodos(prev => prev.filter(todo => !todo.completed));
      })
      .catch(() => setErrorHandle('Unable to delete completed todos'))
      .finally(() => {
        setLoader(prev => prev.filter(id => !completedIds.includes(id)));
      });
  }, [todos, setErrorHandle]);

  useEffect(() => {
    getTodosHandler();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onChange={event => setNewTodo(event.target.value)}
              onKeyDown={keyPressHandler}
              disabled={disableForm}
              value={newTodo}
              autoFocus
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <div
              data-cy="Todo"
              className={`todo ${todo.completed && 'completed'}`}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() => {
                    onChangeHandler(todo.id);
                  }}
                />
              </label>

              {inEdition !== todo.id ? (
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={() => {
                    setInEdition(todo.id);
                  }}
                >
                  {todo.title}
                </span>
              ) : (
                <form>
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value={editingTitle}
                    onChange={e => setEditingTitle(e.target.value)}
                    onKeyDown={getEditionKeyDownHandler}
                    onFocus={() => setEditingTitle(todo.title)}
                    onBlur={() => getEditionTitleHandler(todo.id)}
                    autoFocus
                  />
                </form>
              )}
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => getDeleteHandler(todo.id)}
              >
                ×
              </button>

              <div
                data-cy="TodoLoader"
                className={`modal overlay ${loader.find(num => num === todo.id) !== undefined && 'is-active'}`}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === 'all' && 'selected'}`}
                data-cy="FilterLinkAll"
                onClick={() => setFilter('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${filter === 'active' && 'selected'}`}
                data-cy="FilterLinkActive"
                onClick={() => setFilter('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${filter === 'completed' && 'selected'}`}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter('completed')}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${
          error.length === 0 ? 'hidden' : ''
        }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError([])}
        />
        {error.map((err, index) => (
          <React.Fragment key={err.id}>
            {err.message}
            {index < error.length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
