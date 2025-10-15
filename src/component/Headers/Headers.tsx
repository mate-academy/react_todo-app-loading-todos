import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todoCompleteList: Todo[];
  handleCompletedAll: () => void;
  handleSubmit: (event: React.FormEvent<Element>) => void;
  completedAll: boolean;

  setTitle: (value: string) => void;
  title: string;
};

export const Headers: React.FC<Props> = ({
  completedAll,
  todoCompleteList,
  handleCompletedAll,
  handleSubmit,
  setTitle,
  title,
}) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todoCompleteList.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: completedAll,
          })}
          data-cy="ToggleAllButton"
          onClick={handleCompletedAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
