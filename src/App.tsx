/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { deleteTodo, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { addTodo, getTodos, updateTodo } from './api/todos';
// import { title } from 'process';
// import { event } from 'cypress/types/jquery';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inpValue, setInpValue] = useState('');
  const [todoLoadingId, setTodoLoadingId] = useState<number | null>(null);
  const [todoCompletedIds, setTodoCompletedIds] = useState<number[] | []>([]);
  const inpFocus = useRef<HTMLInputElement>(null);
  const [notificationText, setNotificationText] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<number>(0);
  const [editingInpValue, setEditingInpValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    inpFocus.current?.focus();

    getTodos()
      .then(res => {
        setTodos(res);
        const completedIds = res.filter(t => t.completed).map(t => t.id);
        setTodoCompletedIds(completedIds);
      })
      .catch(() => {
        setNotificationText('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    if (!notificationText) {
      return;
    }

    const timer = setTimeout(() => {
      setNotificationText('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [notificationText]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = todos.filter(todo => {
    const isCompleted = todoCompletedIds.includes(todo.id);
    if (filter === 'active') return !isCompleted;
    if (filter === 'completed') return isCompleted;
    return true;
  });

  const activeTodosCount = todos.filter(
    todo => !todoCompletedIds.includes(todo.id),
  ).length;

  const hasCompletedTodos = todoCompletedIds.length > 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 && (
            <button
              onClick={() => {
                setTodoCompletedIds([]);

                if (todos.length !== todoCompletedIds.length) {
                  setTodoCompletedIds(todos.map(task => task.id));
                }
              }}
              type="button"
              className={`todoapp__toggle-all ${todos.length === todoCompletedIds.length && 'active'}`}
              data-cy="ToggleAllButton"
            />
          )}

          {/* Add a todo on form submit */}
          <form
            onSubmit={event => {
              event.preventDefault();
              if (!inpValue.trim().length) {
                return setNotificationText('Title should not be empty');
              }

              const newTodo = {
                title: inpValue,
                userId: USER_ID,
                completed: false,
              };

              addTodo(newTodo)
                .then((res: Todo) => {
                  setTodos(prev => [...prev, res]);
                  setInpValue('');
                })
                .finally(() => {
                  inpFocus.current?.focus();
                });
            }}
          >
            <input
              ref={inpFocus}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={inpValue}
              onChange={event => setInpValue(event.target.value)}
            />
            {/* <div
              data-cy="ErrorNotification"
              className="notification is-danger is-light has-text-weight-normal"
            >
              <button
                data-cy="HideErrorButton"
                type="button"
                className="delete"
              />
              Title should not be empty
            </div> */}
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {/* This is a completed todo */}
          {/* <div data-cy="Todo" className="todo completed">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Completed Todo
            </span> */}

          {/* Remove button appears only on hover */}
          {/* <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button> */}

          {/* overlay will cover the todo while it is being deleted or updated */}
          {/* <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}

          {/* This todo is an active todo */}
          {/* <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Not Completed Todo
            </span>
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}
          <ul>
            {filteredTodos.map(todo => {
              return (
                <li
                  key={todo.id}
                  data-cy="Todo"
                  className={`todo ${todoCompletedIds.includes(todo.id) ? 'completed' : ''}`}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={todoCompletedIds.includes(todo.id)}
                      onChange={() => {
                        setTodoCompletedIds(prev =>
                          prev.includes(todo.id)
                            ? prev.filter(id => id !== todo.id)
                            : [...prev, todo.id],
                        );
                      }}
                    />
                  </label>

                  {editingTodoId === todo.id ? (
                    <form
                      onSubmit={event => {
                        event.preventDefault();

                        const trimmedTitle = editingInpValue.trim();

                        if (!trimmedTitle) {
                          setTodoLoadingId(todo.id);
                          deleteTodo(todo.id)
                            .then(() => {
                              setTodos(prev =>
                                prev.filter(item => item.id !== todo.id),
                              );
                              setTodoCompletedIds(prev =>
                                prev.filter(id => id !== todo.id),
                              );
                              setEditingTodoId(0);
                            })
                            .catch(() =>
                              setNotificationText('Unable to delete a todo'),
                            )
                            .finally(() => setTodoLoadingId(0));

                          return;
                        }

                        if (trimmedTitle === todo.title) {
                          setEditingTodoId(0);

                          return;
                        }

                        const updatedTodo: Todo = {
                          ...todo,
                          title: trimmedTitle,
                        };

                        setTodoLoadingId(todo.id);

                        updateTodo(updatedTodo)
                          .then(resTodo => {
                            setTodos(prev =>
                              prev.map(item =>
                                item.id === resTodo.id ? resTodo : item,
                              ),
                            );
                            setEditingTodoId(0);
                          })
                          .catch(() => {
                            setNotificationText('Unable to update a todo');
                          })
                          .finally(() => {
                            setTodoLoadingId(0);
                          });
                      }}
                    >
                      <input
                        data-cy="TodoTitleField"
                        type="text"
                        className="todo__title-field"
                        placeholder="Empty todo will be deleted"
                        value={editingInpValue}
                        onChange={event =>
                          setEditingInpValue(event.target.value)
                        }
                        autoFocus
                        onKeyUp={event => {
                          if (event.key === 'Escape') {
                            setEditingTodoId(0);
                          }
                        }}
                        onBlur={() => {
                          setEditingTodoId(0);
                        }}
                      />
                    </form>
                  ) : (
                    <>
                      <span
                        data-cy="TodoTitle"
                        className="todo__title"
                        onDoubleClick={() => {
                          setEditingTodoId(todo.id);
                          setEditingInpValue(todo.title);
                        }}
                      >
                        {todo.title}
                      </span>
                      <button
                        type="button"
                        className="todo__remove"
                        data-cy="TodoDelete"
                        onClick={() => {
                          setTodoLoadingId(todo.id);

                          deleteTodo(todo.id)
                            .then(() => {
                              setTodos(prev =>
                                prev.filter(item => item.id !== todo.id),
                              );
                              setTodoCompletedIds(prev =>
                                prev.filter(id => id !== todo.id),
                              );
                            })
                            .catch(() =>
                              setNotificationText('Unable to delete a todo'),
                            )
                            .finally(() => {
                              setTodoLoadingId(0);
                            });
                        }}
                      >
                        ×
                      </button>
                    </>
                  )}

                  <div
                    data-cy="TodoLoader"
                    className={`modal overlay ${todoLoadingId === todo.id ? 'is-active' : ''}`}
                  >
                    <div
                      className="
                    modal-background
                    has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </li>
              );
            })}
          </ul>

          {/* This todo is being edited */}
          {/* <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label> */}

          {/* This form is shown instead of the title and remove button */}
          {/* <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}

          {/* This todo is in loadind state */}
          {/* <div data-cy="Todo" className="todo"> */}
          {/* <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label> */}

          {/* <span data-cy="TodoTitle" className="todo__title">
              Todo is being saved now
            </span> */}

          {/* <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button> */}

          {/* 'is-active' class puts this modal on top of the todo */}
          {/* <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div> */}
          {/* </div> */}
        </section>
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodosCount} item${activeTodosCount !== 1 ? 's' : ''} left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={() => setFilter('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={() => setFilter('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
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
              disabled={!hasCompletedTodos}
              onClick={() => {
                setNotificationText('');
                const completedTasks = todos.filter(todo =>
                  todoCompletedIds.includes(todo.id),
                );

                Promise.all(
                  completedTasks.map(todo => {
                    setTodoLoadingId(todo.id);

                    return deleteTodo(todo.id);
                  }),
                )
                  .then(() => {
                    setTodos(prev =>
                      prev.filter(todo => !todoCompletedIds.includes(todo.id)),
                    );
                    setTodoCompletedIds([]);
                  })
                  .catch(() => {
                    setNotificationText('Unable to delete a todo');
                  })
                  .finally(() => {
                    setTodoLoadingId(null);
                  });
              }}
            >
              Clear completed
            </button>
          </footer>
        )}

        {/* Hide the footer if there are no todos */}
        {/* <footer className="todoapp__footer" data-cy="Footer"> */}
        {/* <span className="todo-count" data-cy="TodosCounter">
            3 items left
          </span> */}

        {/* Active link should have the 'selected' class */}
        {/* <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className="filter__link selected"
              data-cy="FilterLinkAll"
            >
              All
            </a>

            <a
              href="#/active"
              className="filter__link"
              data-cy="FilterLinkActive"
            >
              Active
            </a>

            <a
              href="#/completed"
              className="filter__link"
              data-cy="FilterLinkCompleted"
            >
              Completed
            </a>
          </nav> */}

        {/* this button should be disabled if there are no completed todos */}
        {/* <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
          >
            Clear completed
          </button> */}
        {/* </footer> */}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification
          is-danger
          is-light
          has-text-weight-normal
          ${!notificationText ? 'hidden' : ''}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setNotificationText('')}
        />
        {notificationText}
      </div>
      {/* <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal hidden"
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {notificationText} */}
      {/* show only one message at a time */}
      {/* Unable to load todos
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      {/* </div> */}
    </div>
  );
};
