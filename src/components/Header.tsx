/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};

export const Header: React.FC<Props> = ({ todos }) => {
  const [title, setTitle] = useState('');
  const hasActive = todos.some(todoItem => !todoItem.completed);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          // eslint-disable-next-line
          'active': hasActive,
        })}
        disabled={!hasActive}
      />

      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </form>
    </header>
  );
};
