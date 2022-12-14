import React, { useRef } from 'react';

type Props = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  onTitleChange: (title: string) => void;
};

export const NewTodo: React.FC<Props> = ({
  onSubmit,
  title,
  onTitleChange,
}) => {
  const newTodoField = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={onSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        ref={newTodoField}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={event => onTitleChange(event.target.value)}
      />
    </form>
  );
};
