import React from 'react';

interface Props {
  newTodoField: React.RefObject<HTMLInputElement>;
}

export const TodoAddForm: React.FC<Props> = (props) => {
  const { newTodoField } = props;

  return (
    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        ref={newTodoField}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};
