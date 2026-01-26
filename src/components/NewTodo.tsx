import cn from 'classnames';
import React from 'react';

type Props = {
  onSubmit: () => void;
  onSetTitle: (value: string) => void;
  titleQuery: string;
  activeTodos: number;
};

export const NewTodo: React.FC<Props> = ({
  onSubmit,
  onSetTitle,
  titleQuery,
  activeTodos,
}) => (
  <header className="todoapp__header">
    {/* this button should have `active` class only if all todos are completed */}
    <button
      type="button"
      className={cn('todoapp__toggle-all', { active: activeTodos === 0 })}
      data-cy="ToggleAllButton"
    />

    {/* Add a todo on form submit */}
    <form onSubmit={onSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={titleQuery}
        onChange={event => onSetTitle(event.target.value)}
        autoFocus
      />
    </form>
  </header>
);
