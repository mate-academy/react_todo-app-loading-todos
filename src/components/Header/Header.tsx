/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  newTitle: string;
  onNewTitle: (event: React.SetStateAction<string>) => void;
  visibleTodos: Todo[];
}

export const Header: React.FC<Props> = ({
  newTitle,
  onNewTitle,
  visibleTodos,
}) => (
  <header className="todoapp__header">
    {visibleTodos.length > 0 && (
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: visibleTodos.every(todo => todo.completed),
        })}
      />
    )}

    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={newTitle}
        onChange={(event) => onNewTitle(event.target.value)}
      />
    </form>
  </header>
);
