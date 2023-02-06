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
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then((data) => {
        setTodos(data);
        setError('');
      })
      .catch(() => {
        setShowError(true);
        setError('Unable to load todos');

        setTimeout(() => {
          setShowError(false);
        }, 3000);
      });
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
    completed,
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
        {/* Notification is shown in case of any error */}
        {/* Add the 'hidden' class to hide the message smoothly */}
        {showError && (
          <div
            className={classNames(
              'notification is-danger is-light has-text-weight-normal',
              { hidden: !showError },
            )}
          >
            <button
              type="button"
              className="delete"
              onClick={() => {
                setShowError(false);
              }}
            />

            {/* show only one message at a time */}
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
