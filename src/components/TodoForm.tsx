import React from 'react';

interface Props {
  title: string;
  isLoading: boolean;
  onTitleChange: (title: string) => void;
  onSubmit: (event: React.FormEvent) => void;
}

export const TodoForm: React.FC<Props> = ({
  title,
  isLoading,
  onTitleChange,
  onSubmit,
}) => (
  <form onSubmit={onSubmit}>
    <input
      data-cy="NewTodoField"
      type="text"
      className="todoapp__new-todo"
      placeholder="What needs to be done?"
      value={title}
      onChange={e => onTitleChange(e.target.value)}
      disabled={isLoading}
    />
  </form>
);
