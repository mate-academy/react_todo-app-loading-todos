import React, { useState } from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from './types/Todo';

interface Props {
  todos: Todo[];
  onDeleteTodo: (id: number) => Promise<void>;
}

export const TodoList: React.FC<Props> = ({ todos, onDeleteTodo }) => {
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    setLoadingId(id);
    await onDeleteTodo(id);
    setLoadingId(null);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
          loadingId={loadingId}
        />
      ))}
    </section>
  );
};
