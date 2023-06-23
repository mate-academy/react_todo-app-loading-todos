/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

type Props = {
  query: string,
  onChangeQuery: (event: React.FormEvent<HTMLInputElement>) => void,
};

export const Header: React.FC<Props> = ({
  query,
  onChangeQuery,
}) => {
  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}

      <button type="button" className="todoapp__toggle-all active" />

      {/* Add a todo on form submit */}
      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={onChangeQuery}
        />
      </form>
    </header>
  );
};
