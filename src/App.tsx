/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { createTodo, getTodos, USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [title, setTitle] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState('all');

  const inputRef = useRef<HTMLInputElement | null>(null);
  const completedTodos = todos.filter(todo => todo.completed);
  const notCompletedTodos = todos.filter(todo => !todo.completed);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  function filterTodos(todos: Todo[], filter: string) {
    const todosCopy = [...todos];

    return todosCopy.filter(todo => {
      switch (filter) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    });
  }

  useEffect(() => {
    setFilteredTodos(() => filterTodos(todos, filter));
  }, [filter, todos]);

  useEffect(() => {
    setErrorMessage('');
    setLoading(true);

    if (inputRef.current) {
      inputRef.current.focus();
    }

    getTodos()
      .then(setTodos)
      .catch(error => {
        setErrorMessage('Unable to load todos');

        throw error;
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim().length === 0) {
      setErrorMessage('Title should not be empty');

      return;
    }

    if (title.trim().length !== 0) {
      createTodo({ title, completed: false })
        .then(newTodo => {
          setTodos(currentTodos => [...currentTodos, newTodo]);
        })
        .catch(error => {
          setErrorMessage('Unable to add a todo');
          throw error;
        })
        .finally(() => setTitle(''));
    }
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: completedTodos.length === todos.length,
            })}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={handleChange}
              ref={inputRef}
            />
          </form>
        </header>

        {todos.length !== 0 && <TodoList todos={filteredTodos} />}

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <Footer
            filter={filter}
            setFilter={setFilter}
            completedTodos={completedTodos}
            notCompletedTodos={notCompletedTodos}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !errorMessage,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
        {/* Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
