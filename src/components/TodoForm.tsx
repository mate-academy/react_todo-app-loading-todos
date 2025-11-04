import { FC } from 'react';

type Props = {};

export const TodoForm: FC<Props> = () => {
  return (
    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};
