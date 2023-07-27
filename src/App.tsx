/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

type Field = 'all' | 'active' | 'completed';

const USER_ID = 11140;

export const App: React.FC = () => {
  // if (!USER_ID) {
  //   return <UserWarning />;
  // }
  const [todos, setTodos] = useState([] as Todo[]);
  const [initialTodos, setInitialTodos] = useState([] as Todo[]);
  const [errorMessage, setMessage] = useState('');
  const [selectedField, setSelectedField] = useState<Field>('all');
  const [isErrorUnnount, setIsErrorUnnount] = useState(false);
  const [isDblClick, setIsDblClick] = useState(false);

  const timer = () => {
    setTimeout(() => {
      setIsErrorUnnount(true);
    }, 3000);
  };

  timer();

  useEffect(() => {
    getTodos(USER_ID)
      .then(someTodos => {
        setTodos(someTodos);
        setInitialTodos(someTodos);
      })
      .catch(() => setMessage('Incorrect URL'));
    // .finally(() => setTimeout(() => setMessage(false), 3000));
  }, []);

  let preparedTodos = [...todos];

  useMemo(() => {
    switch (selectedField) {
      case 'active':
        preparedTodos = preparedTodos.filter(todo => !todo.completed);
        break;

      case 'completed':
        preparedTodos = preparedTodos.filter(todo => todo.completed);
        break;

      default:
        preparedTodos = [...todos];
    }
  }, [todos, selectedField]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            onClick={() => {
              setTodos(someTodos => {
                const newTodos = [...someTodos]
                  .map(todo => {
                    const isSomeComplited = [...someTodos]
                      .filter(someTodo => someTodo.completed).length !== someTodos.length;

                    if (isSomeComplited) {
                      return { ...todo, completed: true };
                    }

                    return { ...todo, completed: false };
                  });

                return newTodos;
              });
            }}
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {preparedTodos && (
          <section className="todoapp__main">
            {/* This is a completed todo */}
            {preparedTodos.map(todo => (
              <div className={classNames('todo',
                { completed: todo.completed })}
              >
                <label className="todo__status-label">
                  <input
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    onClick={() => {
                      setTodos(someTodos => {
                        const newTodos = [...someTodos];
                        // eslint-disable-next-line max-len
                        const index = someTodos.findIndex(t => t.id === todo.id);
                        const newTodo = { ...todo, completed: !todo.completed };

                        newTodos.splice(index, 1, newTodo);

                        return newTodos;
                      });
                    }}
                  />
                </label>
                {isDblClick
                  ? (
                    <form>
                      <input
                        type="text"
                        className="todo__title-field"
                        placeholder="Empty todo will be deleted"
                        value={todo.title}
                        onBlur={() => setIsDblClick(prev => !prev)}
                      />
                    </form>
                  ) : (
                    <span
                      className="todo__title"
                      // onDoubleClick={() => setIsDblClick(prev => !prev)}
                    >
                      {todo.title}
                    </span>

                  )}
                {/* Remove button appears only on hover */}
                <button
                  type="button"
                  className="todo__remove"
                  onClick={() => {
                    setTodos(someTodos => {
                      const filteredTodos = [...someTodos].filter(t => t.id !== todo.id);

                      return filteredTodos;
                    });
                  }}
                >
                  ×
                </button>

                {/* overlay will cover the todo while it is being updated */}
                <div className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Hide the footer if there are no todos */}
        {preparedTodos && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${initialTodos.length - todos
                .filter(t => t.completed).length}
                items left`}
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: selectedField === 'all',
                })}
                onClick={() => setSelectedField('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: selectedField === 'active',
                })}
                onClick={() => setSelectedField('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: selectedField === 'completed',
                })}
                onClick={() => setSelectedField('completed')}
              >
                Completed
              </a>
            </nav>

            {/* don't show this button if there are no completed todos */}
            <button
              type="button"
              className={classNames('todoapp__clear-completed', {
                'is-invisible': todos.filter(t => t.completed).length === 0,
              })}
              onClick={() => {
                setTodos(someTodos => {
                  const newTodos = [...someTodos].filter(todo => !todo.completed);

                  return newTodos;
                });
              }}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {todos.length === 0 && !isErrorUnnount && (
        <div
        // eslint-disable-next-line max-len
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button
            type="button"
            className="delete"
            onClick={() => setIsErrorUnnount(true)}
          />
          Incorrect URL
          {/* show only one message at a time
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo */}
        </div>
      ) }
    </div>
  );
};
