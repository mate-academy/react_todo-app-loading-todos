/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';
import { UpdateTodoData } from './types/types';

const USER_ID = 10917;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [todoTitle, setTodoTitle] = useState('');
  const [status, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let updatedTodos;

    switch (status) {
      case 'Active': {
        updatedTodos = visibleTodos.filter(todo => !todo.completed);
        break;
      }

      case 'Completed': {
        updatedTodos = visibleTodos.filter(todo => todo.completed);
        break;
      }

      default: updatedTodos = visibleTodos;
    }

    setVisibleTodos(updatedTodos);
  }, [todos, setVisibleTodos]);

  const addTodo = useCallback(async (title: string) => {
    try {
      const newTodo: Todo = await client.post(`/todos?userId=${USER_ID}`, {
        userId: USER_ID,
        completed: false,
        title,
      });

      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setErrorMessage('');

      return newTodo;
    } catch (error) {
      setErrorMessage('Unable to add a todo');
      throw new Error('Error');
    }
  }, []);

  const updateTodo = async (todoId: number, data: UpdateTodoData) => {
    try {
      await client.patch(`/todos/${todoId}`, data);

      setTodos((prevTodos: Todo[]) => prevTodos.map((todo: Todo): Todo => {
        return todo;
      }));
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Unable to update a todo');
      throw new Error('Error');
    }
  };

  const deleteTodo = async (todoId: number) => {
    try {
      const updatedTodo = await client.delete(`/todos/${todoId}`);

      setTodos((prevTodos: Todo[]) => prevTodos.map((todo: Todo): Todo => {
        if (todo.id === todoId) {
          return updatedTodo as Todo;
        }

        return todo;
      }));
      setErrorMessage('');

      return updatedTodo;
    } catch (error) {
      setErrorMessage('Unable to delete a todo');
      throw new Error('Error');
    }
  };

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
  }, [todos]);

  const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const clearForm = () => {
    setTodoTitle('');
  };

  const submitHandler = () => {
    if (!todoTitle) {
      return;
    }

    addTodo(todoTitle);

    clearForm();
  };

  const clearCompletedHandler = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);

    setVisibleTodos(updatedTodos);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.some(todo => !todo.completed)}
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
          {visibleTodos.map(todo => (
            todo.completed
              ? (
                <div className="todo completed">
                  <label className="todo__status-label">
                    <input
                      type="checkbox"
                      className="todo__status"
                      value={todoTitle}
                      onClick={() => updateTodo(todo.id, { completed: false })}
                      checked
                    />
                  </label>

                  <span className="todo__title">{todo.title}</span>

                  {/* Remove button appears only on hover */}
                  <button
                    type="button"
                    className="todo__remove"
                    onClick={() => deleteTodo(todo.id)}
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
                      onClick={() => updateTodo(todo.id, { completed: true })}
                    />
                  </label>

                  <span className="todo__title">{todo.title}</span>
                  <button
                    type="button"
                    className="todo__remove"
                    onClick={() => client.delete(`/todos/${todo.id}`)}
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

          {/* This todo is in loadind state */}
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
                  { selected: status === '' },
                )}
                onClick={() => setStatus('')}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames(
                  'filter__link',
                  { selected: status === 'Active' },
                )}
                onClick={() => setStatus('Active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames(
                  'filter__link',
                  { selected: status === 'Completed' },
                )}
                onClick={() => setStatus('Completed')}
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
          <button type="button" className="delete" />
          <br />
          {errorMessage}
          <br />
        </div>
      )}
    </div>
  );
};
