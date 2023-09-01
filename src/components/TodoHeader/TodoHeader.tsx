import React, { useState } from 'react';

export const TodoHeader: React.FC = () => {
  const [title, setTitle] = useState('');

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        aria-label="toggle-all"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          type="text"
          data-cy="createTodo"
          className="todoapp__new-todo"
          value={title}
          placeholder="What needs to be done?"
          onChange={(event) => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
