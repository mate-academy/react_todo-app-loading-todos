import { FC } from 'react';

type Props = {
  setTodoTitle: (title: string) => void;
  todoTitle: string
};

export const Form: FC<Props> = ({ setTodoTitle, todoTitle }) => {
  return (
    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={todoTitle}
        onChange={({ target }) => setTodoTitle(target.value)}
      />
    </form>
  );
};
