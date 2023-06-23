/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

enum FilterType {
  NONE,
  ACTIVE,
  COMPLETED,
}

enum ErrorType {
  NONE,
  LOAD,
  ADD,
  REMOVE,
  UPDATE,
}

const filter = (type: FilterType, todos: Todo[]) => {
  if (type === FilterType.ACTIVE) {
    return todos.filter((todo) => !todo.completed);
  }

  if (type === FilterType.COMPLETED) {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
};

const USER_ID = 10378;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState(FilterType.NONE);
  const [errorType, setErrorType] = useState<ErrorType>(ErrorType.NONE);
  const [todoisLoading, setTodoisLoading] = useState(false);

  const [editableTodoId, setEditableTodoId] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');
  const filteredTodos = filter(filterType, todos);

  useEffect(() => {
    getTodos(USER_ID)
      .then(res => setTodos(res.slice(0)))
      .catch(() => setErrorType(ErrorType.LOAD));

    setTimeout(() => {
      setErrorType(ErrorType.NONE);
    }, 3000);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const changeCheckTodo = async (todo: Todo) => {
    setTodoisLoading(true);

    try {
      await setTodos(prevTodos => {
        const updatedTodos = [...prevTodos];
        const todoIndex = updatedTodos.findIndex(item => item.id === todo.id);

        updatedTodos[todoIndex] = {
          ...updatedTodos[todoIndex],
          completed: !updatedTodos[todoIndex].completed,
        };

        return updatedTodos;
      });
    } catch {
      setErrorType(ErrorType.UPDATE);
    }

    setTodoisLoading(false);
  };

  const toggleActiveTodos = async () => {
    setTodoisLoading(true);

    try {
      await setTodos(prevTodos => {
        let updatedTodos = [...prevTodos];

        if (prevTodos.some((todo) => !todo.completed)) {
          updatedTodos = prevTodos.map((todo) => {
            return {
              ...todo,
              completed: true,
            };
          });
        } else {
          updatedTodos = prevTodos.map((todo) => {
            return {
              ...todo,
              completed: false,
            };
          });
        }

        return updatedTodos;
      });
    } catch {
      setErrorType(ErrorType.UPDATE);
    }

    setTodoisLoading(false);
  };

  const removeTodo = async (todo: Todo) => {
    setTodoisLoading(true);

    try {
      await setTodos(prevTodos => {
        const updatedTodos = [...prevTodos];
        const index = updatedTodos.findIndex((item) => item.id === todo.id);

        if (index !== -1) {
          updatedTodos.splice(index, 1);
        }

        return updatedTodos;
      });
    } catch {
      setErrorType(ErrorType.REMOVE);
    }

    setTodoisLoading(false);
  };

  const removeCompleted = () => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.filter((todo) => !todo.completed);

      return updatedTodos;
    });
  };

  const changeTitle = async (todo: Todo) => {
    setTodoisLoading(true);

    try {
      await setTodos(prevTodos => {
        const updatedTodos = [...prevTodos];
        const todoIndex = updatedTodos.findIndex(item => item.id === todo.id);

        if (inputValue.trim().length > 0) {
          updatedTodos[todoIndex] = {
            ...updatedTodos[todoIndex],
            title: inputValue,
          };
        } else {
          updatedTodos.splice(todoIndex, 1);
        }

        return updatedTodos;
      });
    } catch {
      setErrorType(ErrorType.UPDATE);
    }

    setTodoisLoading(false);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          { todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: todos.every((todo) => todo.completed),
              })}
              onClick={toggleActiveTodos}
            />
          )}

          <form>
            <input
              name="title"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {filteredTodos.map((todo: Todo) => {
            if (todo.id === editableTodoId) {
              return (
                <>
                  <div className="todo" key={todo.id}>
                    <label className="todo__status-label">
                      <input
                        type="checkbox"
                        className="todo__status"
                      />
                    </label>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      changeTitle(todo);
                    }}
                    >
                      <input
                        type="text"
                        className="todo__title-field"
                        placeholder="Empty todo will be deleted"
                        defaultValue={todo.title}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={() => setEditableTodoId(null)}
                      />
                    </form>

                    <div className="modal overlay">
                      <div
                        className="modal-background has-background-white-ter"
                      />
                      <div className="loader" />
                    </div>
                  </div>
                </>
              );
            }

            if (todoisLoading) {
              return (
                <div className="todo" key={todo.id}>
                  <label className="todo__status-label">
                    <input type="checkbox" className="todo__status" />
                  </label>

                  <span className="todo__title">{todo.title}</span>
                  <button type="button" className="todo__remove">×</button>

                  <div className="modal overlay is-active">
                    <div
                      className="modal-background has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </div>
              );
            }

            return (
              <div
                className={classNames('todo', { completed: todo.completed })}
                key={todo.id}
                onDoubleClick={() => setEditableTodoId(todo.id)}
              >
                <label className="todo__status-label">
                  <input
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    onChange={() => changeCheckTodo(todo)}
                  />
                </label>
                <span className="todo__title">{todo.title}</span>

                <button
                  type="button"
                  className="todo__remove"
                  onClick={() => removeTodo(todo)}
                >
                  ×
                </button>

                <div className="modal overlay">
                  <div
                    className="modal-background has-background-white-ter"
                  />
                  <div className="loader" />
                </div>
              </div>
            );
          })}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${todos.filter((todo) => !todo.completed).length} items left`}
            </span>

            <nav className="filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filterType === FilterType.NONE,
                })}
                onClick={(e) => {
                  e.preventDefault();
                  setFilterType(FilterType.NONE);
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filterType === FilterType.ACTIVE,
                })}
                onClick={(e) => {
                  e.preventDefault();
                  setFilterType(FilterType.ACTIVE);
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filterType === FilterType.COMPLETED,
                })}
                onClick={(e) => {
                  e.preventDefault();
                  setFilterType(FilterType.COMPLETED);
                }}
              >
                Completed
              </a>
            </nav>

            {todos.some((todo) => todo.completed) && (
              <button
                type="button"
                className="todoapp__clear-completed"
                onClick={removeCompleted}
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
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorType },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setErrorType(ErrorType.NONE)}
        />
        Unable to load todos

        {/* show only one message at a time */}
        {/* Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
