/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Form } from './components/Form';
import { TodoList } from './components/Todolist';
import { Footer } from './components/Footer';
import { getTodos } from './api/todos';

const USER_ID = 6910;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>('');
  const [completed] = useState<boolean>(false);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then(data => {
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

  const newTodo = {
    title,
    id: Math.max(...todos.map(todo => todo.id)) + 1,
    completed,
  };

  const addTodo = () => {
    return [...todos, newTodo];
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames(
              'todoapp__toggle-all',
              { active: todos.some(todo => !todo.completed) },
            )}
          />
          <Form
            title={title}
            onSubmit={addTodo}
            setTitle={setTitle}
            className="todoapp__new-todo"
            placeholder="What needs to be done"
          />
        </header>

        {todos.length !== 0 && (
          <>
            <TodoList
              title={title}
              setTitle={setTitle}
              todos={visibleTodos}
            />
            <Footer
              todos={todos}
              filter={filter}
              onSetFilter={setFilter}
            />
          </>
        )}
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
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
