import React from 'react';

type Props = {
  newTodoQuery: string;
  onNewTodoQueryChange: (query: string) => void;
  isAllCompleted: boolean;
};

export const TodoHeader: React.FC<Props> = ({
  newTodoQuery,
  onNewTodoQueryChange,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all"
        data-cy="ToggleAllButton"
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoQuery}
          onChange={event => onNewTodoQueryChange(event.target.value)}
        />
      </form>
    </header>
  );
};
