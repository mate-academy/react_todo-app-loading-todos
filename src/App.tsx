/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import * as todosService from './api/todos';
import { Todo } from './types/Todo';

const USER_ID = 11105;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [isSelected, setIsSelected] = useState('');

  const getAllTodo = () => {
    return (
      todosService.getTodos(USER_ID).then(serverTodo => {
        setTodos(serverTodo);
      })
    );
  };

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo = {
      userId: USER_ID,
      title: newTitle.trim(),
      completed: false,
    };

    todosService.createTodo(newTodo).then(getAllTodo);
    setNewTitle('');
  };

  const removeTodo = (id: number) => {
    todosService.deleteTodo(id);
    setTodos(curentTodos => curentTodos.filter(todo => todo.id !== id));
  };

  const handleCheck = ({
    id,
    title,
    userId,
    completed,
  }: Todo) => {
    todosService.patchTodo({
      id,
      title,
      userId,
      completed,
    });
  };

  const handleTodos = (value: string) => {
    switch (value) {
      case 'All':
        getAllTodo();
        break;
      case 'Active':
        getAllTodo()
          .then(() => setTodos(todos.filter(todo => !todo.completed)));
        break;
      case 'Completed':
        getAllTodo()
          .then(() => setTodos(todos.filter(todo => todo.completed)));
        break;
      case 'CompletedClear':
        todos.forEach(todo => {
          if (todo.completed) {
            removeTodo(todo.id);
          }
        });
        getAllTodo();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getAllTodo();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form onSubmit={(e) => addTodo(e)}>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main">
          { todos && (
            todos.map(({
              title,
              id,
              completed,
              userId,
            }) => {
              return (
                <div className="todo" key={id}>
                  <label className="todo__status-label">
                    <input
                      type="checkbox"
                      className="todo__status"
                      checked
                      onChange={() => {
                        handleCheck({
                          id,
                          title,
                          userId,
                          completed,
                        });
                      }}
                    />
                  </label>

                  <span className="todo__title">
                    {title}
                  </span>

                  {/* Remove button appears only on hover */}
                  <button
                    type="button"
                    className="todo__remove"
                    onClick={() => removeTodo(id)}
                  >
                    ×
                  </button>

                  {/* overlay will cover the todo while it is being updated */}
                  <div className="modal overlay">
                    <div
                      className="modal-background has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </div>
              );
            }))}
        </section>

        {/* Hide the footer if there are no todos */}
        { todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              { todos.length }
              items left
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter">
              <a
                href="#/"
                className={classNames('filter__link',
                  { selected: isSelected === 'All' })}
                onClick={() => {
                  setIsSelected('All');
                  handleTodos('All');
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link',
                  { selected: isSelected === 'Active' })}
                onClick={() => {
                  setIsSelected('Active');
                  handleTodos('Active');
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link',
                  { selected: isSelected === 'Completed' })}
                onClick={() => {
                  setIsSelected('Completed');
                  handleTodos('Completed');
                }}
              >
                Completed
              </a>
            </nav>

            {/* don't show this button if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              onClick={() => handleTodos('CompletedClear')}
            >
              Clear completed
            </button>
          </footer>
        )}

      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div className="notification is-danger is-light has-text-weight-normal">
        <button type="button" className="delete" />

        {/* show only one message at a time */}
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
