import { FC } from 'react';

export const TodoForm: FC = () => (
  <form>
    <input
      type="text"
      className="todoapp__new-todo"
      placeholder="What needs to be done?"
    />
  </form>

);
