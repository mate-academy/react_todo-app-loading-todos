/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { getTodos, addTodo } from './api/todos';
import { Login } from './Login';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';

// import { client } from './utils/fetchClient';

const USER_ID = 6698;

export const App: React.FC = () => {
  // we will get todoId based on todoLength(default will be 0)

  const [task, setTask] = useState('');

  const [todos, setTodos] = useState<Todo[]>([]);

  const handleTodoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const loadTodos = async () => {
    await getTodos(USER_ID).then(res => setTodos(res));
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (task) {
      addTodo({
        id: 0,
        userId: USER_ID,
        title: task,
        completed: false,
      });
    }

    setTask('');

    setTimeout(() => loadTodos(), 300);
  };

  useEffect(() => {
    loadTodos();
  }, [localStorage.getItem('email')]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  if (!localStorage.getItem('email')) {
    return <Login />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title is-1">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onChange={handleTodoChange}
              value={task}
            />
          </form>
        </header>

        <section className="todoapp__main">
          {
            todos.map(todo => (
              <div className="todo" data-cy="todo" key={todo.id}>
                <div className="todo__status-label">
                  <input type="checkbox" className="todo__status" />
                </div>

                <span className="todo__title">{todo.title}</span>
              </div>
            ))
          }
        </section>

        {
          todos.length > 0
          && (
            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${todos.length} items left`}
              </span>

              {/* Active filter should have a 'selected' class */}
              <nav className="filter">
                <a href="#/" className="filter__link selected">
                  All
                </a>

                <a href="#/active" className="filter__link">
                  Active
                </a>

                <a href="#/completed" className="filter__link">
                  Completed
                </a>
              </nav>

              {/* don't show this button if there are no completed todos */}
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            </footer>
          )
        }
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
