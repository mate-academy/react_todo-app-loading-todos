/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  isButtonActive: boolean;
};

export const NewTodoInput:
React.FC<Props> = React.memo(({ isButtonActive }) => {
  const [input, setInput] = useState('');

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: isButtonActive },
        )}
      />

      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={input}
          onChange={event => setInput(event.target.value)}
        />
      </form>
    </header>
  );
});
