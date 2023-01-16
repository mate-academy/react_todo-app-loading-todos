import React, { FormEvent } from 'react';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>;
  query: string;
  onInputChange: (str: string) => void;
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const NewTodoField: React.FC<Props> = ({
  newTodoField,
  query,
  onInputChange,
  onFormSubmit: onFormSUbmit,
}) => {
  return (
    <form onSubmit={onFormSUbmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        ref={newTodoField}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={query}
        onChange={event => onInputChange(event.target.value)}
      />
    </form>
  );
};
