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
  const [title, setTitle] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completed] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getTodos(USER_ID)
      .then((data) => setTodos(data))
      .catch(() => { });
  }, []);

  const visibleTodos = todos
    .filter((todo) => {
      switch (filter) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    });

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
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
          />
        </header>
        {todos.length !== 0 && (
          <>
            <TodoList
              title={title}
              setTitle={setTitle}
              todos={visibleTodos}
              // onSetCompleted={setCompleted}
              onRemoveTodo={removeTodo}
              userId={USER_ID}
            />
            <Footer
              todos={todos}
              filter={filter}
              onSetFilter={setFilter}
            />
          </>
        )}

        {/* This form is shown instead of the title and remove button */}
        <Form
          title={title}
          onSubmit={addTodo}
          setTitle={setTitle}
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
        />

        {/* This todo is in loadind state */}
        <div className="todo">
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
            />
          </label>

          <span className="todo__title">Todo is being saved now</span>
          <button
            type="button"
            className="todo__remove"
          >
            ×
          </button>
        </div>
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div className="notification is-danger is-light has-text-weight-normal">
        <button
          type="button"
          className="delete"
        />

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
