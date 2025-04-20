/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { ErrorMessage, FilteredStatus, Todo } from './types/Todo';
import { TodoItem } from './components/TododItem';
import cn from 'classnames';
import { FormAddTodo } from './components/FormAddTodo';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [unableErrorMessage, setUnableErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.DEFAULT,
  );
  const [count, setCount] = useState<number>(0);
  const [filterValue, setFilterValue] = useState<FilteredStatus>(
    FilteredStatus.ALL,
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log('Помилки під час отримання завдань:');
        setUnableErrorMessage(ErrorMessage.LOAD);
        setTimeout(() => {
          setUnableErrorMessage(ErrorMessage.DEFAULT);
        }, 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const onHandler = () => {
    setUnableErrorMessage(ErrorMessage.DEFAULT);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setUnableErrorMessage(ErrorMessage.DEFAULT);
  };

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
          <FormAddTodo onSubmit={handleSubmit} />
        </header>

        <TodoItem todos={todos} setCount={setCount} filterValue={filterValue} />

        {/* Hide the footer if there are no todos */}

        {todos.length > 0 && (
          <Footer
            count={count}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !unableErrorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => onHandler()}
        />
        {/* show only one message at a time */}
        {unableErrorMessage}
      </div>
    </div>
  );
};
