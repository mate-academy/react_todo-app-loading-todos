import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  userId: number
  todoId: number
  submitTodo: (todo: Todo) => void
};

export const NewTodo: React.FC<Props> = ({ submitTodo, userId, todoId }) => {
  const [title, setTitle] = useState('');

  const todo = {
    title: title.trim(),
    userId,
    completed: false,
    id: todoId,
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title) {
      submitTodo(todo);
      setTitle('');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};
