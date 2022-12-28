import React from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  onDelete: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, onDelete }) => {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};
