import React, { useRef } from 'react';

type Props = {
  title: string,
  onTitleChange: (title: string) => void,
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
};

export const NewTodoField: React.FC<Props> = (props) => {
  const {
    title,
    onTitleChange,
    onSubmit,
  } = props;
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
        onChange={(event) => onTitleChange(event.target.value)}
      />
    </form>
  );
};
