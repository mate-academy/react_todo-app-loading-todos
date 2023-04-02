/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, ChangeEvent } from 'react';

type Props = {
  handleSubmit: (event: ChangeEvent<HTMLFormElement>) => void;
  handleTodoChange: (event: ChangeEvent<HTMLInputElement>) => void;
  task: string;
};

export const NewTodo: FC<Props> = ({
  handleSubmit,
  handleTodoChange,
  task,
}) => {
  return (
    <header className="todoapp__header">
      <button type="button" className="todoapp__toggle-all active" />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={handleTodoChange}
          value={task}
        />
      </form>
    </header>
  );
};
