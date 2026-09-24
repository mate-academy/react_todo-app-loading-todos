import React from 'react';

type Props = {
  title: string;
  setTitle: (value: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
  loadingAdd: boolean;
};

export const NewTodo: React.FC<Props> = ({
  title,
  setTitle,
  handleSubmit,
  loadingAdd,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        onChange={event => setTitle(event.target.value)}
        value={title}
        disabled={loadingAdd}
        autoFocus
      />
    </form>
  );
};
