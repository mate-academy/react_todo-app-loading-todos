import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  areActive: Todo[] | null
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
};

export const Header: React.FC<Props> = ({
  areActive,
  handleSubmit,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: areActive,
        })}
        aria-label="button"
      />

      <form
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
