import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';
import { addTodo, deleteTodo, updateTodo } from './api/api';
import { Filter } from './types/types';

const USER_ID = 10917;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);

  const [todoTitle, setTodoTitle] = useState<string>('');
  const [filter, setFilter] = useState<string | null>('');
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get(`/todos?userId=${USER_ID}`);

        setVisibleTodos(response as Todo[]);
        setTodos(response as Todo[]);
      } catch (error) {
        throw new Error('Data not found');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setVisibleTodos(todos.filter((todo) => {
      switch (filter) {
        case Filter.Active:
          return !todo.completed;
        case Filter.Completed:
          return todo.completed;
        default:
          return true;
      }
    }));
  }, [filter, todos]);

  const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const clearForm = () => {
    setTodoTitle('');
  };

  const submitHandler = async () => {
    if (!todoTitle) {
      return;
    }

    setIsLoading(true);

    await addTodo(todoTitle, setTodos, setErrorMessage);

    setIsLoading(false);

    clearForm();
  };

  const clearCompletedHandler = async () => {
    try {
      const completedTodos = todos.filter(todo => todo.completed);
      const deletedTodos = completedTodos
        .map(todo => deleteTodo(todo.id, setTodos, setErrorMessage));

      await Promise.all(deletedTodos);
    } catch (error) {
      setErrorMessage('Unable to delete completed todos');
      throw new Error('Error');
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.some(todo => !todo.completed)}
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              submitHandler();
            }}
          >
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todoTitle}
              onChange={changeTitleHandler}
            />
          </form>
        </header>

        <section className="todoapp__main">
          {isLoading && (
            <div className="todo">
              <label className="todo__status-label">
                <input type="checkbox" className="todo__status" />
              </label>

              <span className="todo__title">Todo is being saved now</span>
              <button type="button" className="todo__remove">×</button>

              {/* 'is-active' class puts this modal on top of the todo */}
              <div className="modal overlay is-active">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          )}
          {visibleTodos.map(todo => (
            todo.completed
              ? (
                <div className="todo completed">
                  <label className="todo__status-label">
                    <input
                      type="checkbox"
                      className="todo__status"
                      value={todoTitle}
                      onClick={() => updateTodo(
                        todo.id,
                        { completed: false },
                        setTodos,
                        setErrorMessage,
                      )}
                      checked
                    />
                  </label>

                  <span className="todo__title">{todo.title}</span>

                  {/* Remove button appears only on hover */}
                  <button
                    type="button"
                    className="todo__remove"
                    onClick={() => deleteTodo(
                      todo.id,
                      setTodos,
                      setErrorMessage,
                    )}
                  >
                    ×
                  </button>

                  {/* overlay will cover the todo while it is being updated */}
                  <div className="modal overlay">
                    <div
                      className="modal-background
                      has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </div>
              )
              : (
                <div className="todo">
                  <label className="todo__status-label">
                    <input
                      type="checkbox"
                      className="todo__status"
                      onClick={() => updateTodo(
                        todo.id,
                        { completed: true },
                        setTodos,
                        setErrorMessage,
                      )}
                    />
                  </label>

                  <span className="todo__title">{todo.title}</span>
                  <button
                    type="button"
                    className="todo__remove"
                    onClick={() => deleteTodo(
                      todo.id,
                      setTodos,
                      setErrorMessage,
                    )}
                  >
                    ×
                  </button>

                  <div className="modal overlay">
                    <div
                      className="modal-background
                      has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </div>
              )
          ))}
          {/* This todo is being edited */}
          <div className="todo">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
              />
            </label>

            {/* This form is shown instead of the title and remove button */}
            <form>
              <input
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>

            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        </section>

        {todos.length !== 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${todos.filter(todo => !todo.completed).length} items left`}
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter">
              <a
                href="#/"
                className={classNames(
                  'filter__link',
                  { selected: filter === '' },
                )}
                onClick={() => setFilter('')}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames(
                  'filter__link',
                  { selected: filter === 'Active' },
                )}
                onClick={() => setFilter('Active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames(
                  'filter__link',
                  { selected: filter === 'Completed' },
                )}
                onClick={() => setFilter('Completed')}
              >
                Completed
              </a>
            </nav>

            {/* don't show this button if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              onClick={clearCompletedHandler}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorMessage && (
        <div
          className="
          notification
          is-danger
          is-light
          has-text-weight-normal
          hidden"
        >
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button type="button" className="delete" />
          <br />
          {errorMessage}
          <br />
        </div>
      )}
    </div>
  );
};
