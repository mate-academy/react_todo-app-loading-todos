/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');

  return (
    <header className="todoapp__header">
      <button type="button" className="todoapp__toggle-all active" />

      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
