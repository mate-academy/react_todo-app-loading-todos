import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  hasTodos: boolean;
  isAllCompleted: boolean;
  title: string;
  todos: Todo[];
  onTitleChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onToggleAll: (todos: Todo[]) => void;
};

export const NewTodoForm: React.FC<Props> = ({
  hasTodos,
  isAllCompleted,
  title,
  todos,
  onTitleChange,
  onSubmit,
  onToggleAll,
}) => {
  return (
    <header className="todoapp__header">
      {hasTodos && (
        <button
          type="button"
          aria-label="Toggle all todos"
          className={classNames('todoapp__toggle-all', {
            active: isAllCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={() => onToggleAll(todos)}
        />
      )}

      <form onSubmit={onSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          aria-label="New todo title"
          value={title}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={onTitleChange}
        />
      </form>
    </header>
  );
};
