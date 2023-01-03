import React from 'react';

export type Props = {
  newTodoField: React.RefObject<HTMLInputElement>,
  query: string,
  onInputChange(str: string): void,
  onFormSubmit(): void,
};

export const NewTodoField: React.FC<Props> = ({
  newTodoField,
  query,
  onInputChange,
  onFormSubmit,
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        ref={newTodoField}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={query}
        onChange={(ev) => onInputChange(ev.target.value)}
      />
    </form>
  );
};
