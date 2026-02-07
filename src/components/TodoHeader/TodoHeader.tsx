import './TodoHeader.scss';

import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  activeTodos: number;
  todosLength: number;
  tempTodo: Todo | null;
  title: string;
  setTitle: (newtitle: string) => void;
  onToggleAll: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const TodoHeader: React.FC<Props> = ({
  activeTodos,
  todosLength,
  tempTodo,
  title,
  setTitle,
  onToggleAll,
  onSubmit,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        data-cy="ToggleAllButton"
        className={classNames('todoapp__toggle-all', {
          active: activeTodos === 0 && todosLength > 0,
        })}
        onClick={onToggleAll}
      />

      <form onSubmit={onSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
          autoFocus
          disabled={!!tempTodo}
        />
      </form>
    </header>
  );
};
