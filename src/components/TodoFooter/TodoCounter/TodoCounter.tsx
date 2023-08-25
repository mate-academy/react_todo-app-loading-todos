import React from 'react';
import { Todo } from '../../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoCounter: React.FC<Props> = ({ todos }) => {
  const todoLength = todos.filter(currentTodo => !currentTodo.completed).length;

  return (
    <>
      <span className="todo-count">
        {`${todoLength} ${todoLength <= 1 ? 'item' : 'items'} left`}
      </span>
    </>
  );
};
