/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';

export const TodoHeader = () => {
  const [title, setTitle] = useState('');

  return (
    <header className="todoapp__header">
      <button type="button" className="todoapp__toggle-all active" />

      <form>
        <input
          type="text"
          data-cy="createTodo"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
