/* eslint-disable jsx-a11y/control-has-associated-label */

import { useState } from 'react';
import { postTodo } from '../../api/todos';

type Props = {
  userId: number,
};

export const Header: React.FC<Props> = ({ userId }) => {
  const [todoTitle, setTodoTitle] = useState('');

  const createTodo = () => {
    postTodo(userId, todoTitle);
  };

  return (
    <header className="todoapp__header">
      <button
        title="All"
        type="button"
        className="todoapp__toggle-all active"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={() => createTodo()}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={(event) => setTodoTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
