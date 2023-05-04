import React from 'react';
import classNames from 'classnames';

interface Props {
  query: string;
  setQuery: (query: string) => void;
  isEveryTodoCompleted: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Header: React.FC<Props> = ({
  query, setQuery, isEveryTodoCompleted, handleSubmit,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        aria-label="ToggleAll"
        className={classNames('todoapp__toggle-all', {
          active: isEveryTodoCompleted,
        })}
      />

      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </header>
  );
};
