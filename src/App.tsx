/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as todosApi from './api/todos';
import { Todo } from './types/Todo';
import cn from 'classnames';
import { Status } from './types/Status';
import { getFilterTodos } from './utils/getFilterTodos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { wait } from './utils/fetchClient';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [titles, setTitles] = useState('');
  const [errorMessage, setErrorMessage] =
    useState<string>('');
  const [filter, setFilter] = useState<Status>(Status.All);

  useEffect(() => {
    todosApi
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(`Unable to load todos`);
        wait(3000).then(() => {
          setErrorMessage('');
        });
      });
  }, []);

  function addTodo({ title, completed, userId }: Todo) {
    todosApi
      .createTodos({ title, completed, userId })
      .then(newTodo => {
        setTodos(currentTodos => {
          return [...currentTodos, newTodo];
        });
      });
  }

  const visibleTodos = getFilterTodos([...todos], filter);

  const getMaxTodoId = (todo: Todo[]) => {
    const ids = todo.map(item => item.id);

    return Math.max(...ids, 0);
  };

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTitles(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addTodo({
      id: getMaxTodoId(todos) + 1,
      title: titles,
      completed: false,
      userId: getMaxTodoId(todos) + 1,
    });

    setTitles('');
  };

  if (!todosApi.USER_ID) {
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
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={titles}
              onChange={handleTitleChange}
            />
          </form>
        </header>

        <TodoList todos={visibleTodos} />

        {visibleTodos.length > 0 && (
          <Footer
            todos={todos}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
