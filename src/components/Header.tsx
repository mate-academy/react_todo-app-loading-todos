import React from 'react';

interface Props {
  title: string;
  onTitleChange: (title: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  isAdding: boolean;
}

export const Header: React.FC<Props> = ({
  title,
  onTitleChange,
  onSubmit,
  inputRef,
  isAdding,
}) => {
  return (
    <header className="todoapp__header">
      <form onSubmit={onSubmit}>
        <input
          data-cy="NewTodoField"
          ref={inputRef}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => onTitleChange(e.target.value)}
          disabled={isAdding}
        />
      </form>
    </header>
  );
};
