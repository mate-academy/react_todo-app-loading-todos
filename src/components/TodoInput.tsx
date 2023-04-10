import React, { ChangeEvent } from 'react';

type Props = {
  query: string;
  onQuery: (query: string) => void;
};

export const TodoInput: React.FC<Props> = ({ query, onQuery }) => {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQuery(event.target.value);
  };

  return (
    <>
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        aria-label="Mute volume"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={handleQuery}
        />
      </form>
    </>
  );
};
