import React from 'react';

type Props = {
  loading: boolean;
  focusedInput: React.Ref<HTMLInputElement>;
};

export const NewTodo: React.FC<Props> = ({ loading, focusedInput }) => {
  return (
    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        disabled={loading}
        ref={focusedInput}
      />
    </form>
  );
};
