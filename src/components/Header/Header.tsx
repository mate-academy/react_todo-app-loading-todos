import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { Errors } from '../../types/Errors';
import { NotificationContext } from '../../context/NotificationContext';

type Props = {
  activeTodosCount: number,
};

export const Header: React.FC<Props> = ({ activeTodosCount }) => {
  const [query, setQuery] = useState('');
  const {
    setErrorMessage,
    setIsHiddenNotification,
  } = useContext(NotificationContext);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setIsHiddenNotification(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const preparedQuery = query.trim();

    if (!preparedQuery) {
      setErrorMessage(Errors.Validation);

      return;
    }

    setQuery('');
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all', {
            active: !activeTodosCount,
          },
        )}
        aria-label="toggle-all"
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={handleOnChange}
        />
      </form>
    </header>
  );
};
