import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  processingIds: number[];
  onDelete: (id: number) => void;
  onToggle: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  processingIds,
  onDelete,
  onToggle,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        isProcessing={processingIds.includes(todo.id)}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    ))}
  </section>
);
