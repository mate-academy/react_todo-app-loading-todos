import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  addTodo: (newTodo: Todo) => void,
  userId: number,
};

export const TodoForm:React.FC<Props> = React.memo(
  ({ addTodo, userId }) => {
    const [title, setTitle] = useState<string>('');

    const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const newTodo = {
        id: 0,
        title,
        completed: false,
        userId,
      };

      addTodo(newTodo);
      setTitle('');
    };

    return (
      <form onSubmit={handlerSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event?.target.value)}
        />
      </form>
    );
  },
);
