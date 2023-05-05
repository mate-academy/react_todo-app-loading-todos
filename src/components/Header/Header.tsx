import React from 'react';
import { Error } from '../../types/Error';

type Props = {
  hasSomeTodos: boolean,
  onChangeIsError: (e: Error) => void,
};

export const Header: React.FC<Props> = ({ hasSomeTodos, onChangeIsError }) => {
  const handleFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChangeIsError(Error.ADD);
  };

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {hasSomeTodos && (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button type="button" className="todoapp__toggle-all active" />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={(event) => handleFormSubmit(event)}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
