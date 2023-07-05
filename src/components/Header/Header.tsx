import React from 'react';

type Props = {
  todosCount: number
};

export const Header: React.FC<Props> = ({ todosCount }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}

      {todosCount > 0 && (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button
          type="button"
          className="todoapp__toggle-all active"
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"

        />
      </form>
    </header>
  );
};
