/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  getTodos, postTodos, deleteTodo, patchTodo,
} from './api/todos';
import { Todo } from './types/Todo';
import { TodoFilter } from './components/FilterTodos';

const USER_ID = 10327;

export const App: React.FC = () => {
  const [todoItem, setTodoItem] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = () => getTodos(USER_ID).then(setTodos);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const clearTodoField = () => setTodoItem('');

  const createTodo = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo = {
      userId: USER_ID,
      title: todoItem,
      completed: false,
    };

    await postTodos(USER_ID, newTodo);
    fetchTodos();
    clearTodoField();
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const handleChangeTodo = async (id: number, isCompleted: boolean) => {
    await patchTodo(id, { completed: !isCompleted });
    fetchTodos();
  };

  console.log(todos);

  const activeFilter = () => {
    setTodos(todos.filter((todo) => todo.completed === false));
  };

  const completedFilter = () => {
    setTodos(todos.filter((todo) => todo.completed === true));
  };

  const deleteFilter = () => {
    fetchTodos();
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form
            onSubmit={createTodo}
          >
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todoItem}
              onChange={event => setTodoItem(event.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={classNames('todo', {
                completed: todo.completed,
              })}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onClick={() => handleChangeTodo(todo.id, todo.completed)}
                />
              </label>

              <span className="todo__title">{todo.title}</span>

              <button
                type="button"
                className="todo__remove"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                ×
              </button>
            </div>
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer">
          <span className="todo-count">
            3 items left
          </span>

          <TodoFilter
            onAll={deleteFilter}
            onActive={activeFilter}
            onCompleted={completedFilter}
          />

          {/* Active filter should have a 'selected' class */}
          {/* <nav className="filter">
            <a
              href="#/"
              className="filter__link selected"
              onClick={}
            >
              All
            </a>

            <a
              href="#/active"
              className="filter__link"
              onClick={}
            >
              Active
            </a>

            <a
              href="#/completed"
              className="filter__link"
              onClick={}
            >
              Completed
            </a>
          </nav> */}

          {/* don't show this button if there are no completed todos */}
          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        </footer>
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
