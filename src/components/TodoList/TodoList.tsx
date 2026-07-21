import React from 'react';
import { Todo, TodoId } from '../../types/Todo';
import { TodoItem } from '../Todo/TodoItem';

interface Props {
  todos: Todo[];
  onDelete: (todoId: TodoId) => Promise<void>;
  deletingId: TodoId | null;
}

export const TodoList: React.FC<Props> = ({ todos, onDelete, deletingId }) => {
  return (
    <ul>
      {todos.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            isDeleting={deletingId === todo.id}
          />
        );
      })}
    </ul>
  );
};
