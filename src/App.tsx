/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getTodos, removeTodo } from './api/todos';
import { Footer } from './components/Footer';
import { Form } from './components/Form';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const USER_ID = 6101;

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completed] = useState(false);

  useEffect(() => {
    getTodos(USER_ID).then((data) => setTodos(data));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const newTodo = {
    title,
    id: Math.max(...todos.map(item => item.id)) + 1,
    status: completed,
  };

  const addTodo = () => {
    return [...todos, newTodo];
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames(
              'todoapp__toggle-all',
              { active: todos.some((todo) => !todo.completed) },
            )}
          />
          <Form
            title={title}
            onSubmit={addTodo}
            setTitle={setTitle}
          />
        </header>
        {todos.length !== 0 && (
          <>
            <TodoList
              todos={todos}
              // onSetCompleted={setCompleted}
              onRemoveTodo={removeTodo}
              userId={USER_ID}
            />
            <Footer
              todos={todos}
            />
          </>
        )}

        <section className="todoapp__main">
          {/* This todo is being edited */}
          <div className="todo">
            {/* This form is shown instead of the title and remove button */}
            <form>
              <input
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </form>
          </div>

          {/* This todo is in loadind state */}
          <div className="todo">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
              />
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
