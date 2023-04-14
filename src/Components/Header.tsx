import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  title: string,
  setTitle: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export const Header: React.FC<Props> = ({
  todos,
  title,
  setTitle,
}) => {
  const isActive = todos.filter(todo => !todo.completed);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: isActive },
        )}
        aria-label="Add todo"
      />
      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={setTitle}
        />
      </form>
    </header>
  );
};
