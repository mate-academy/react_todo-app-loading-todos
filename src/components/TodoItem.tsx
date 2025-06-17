import React from 'react';
import { Todo } from '../types/Todo';
import { TodoStatus } from './TodoStatus';
import { TodoEditForm } from './TodoEditForm';
import { TodoView } from './TodoView';
import { TodoLoader } from './TodoLoader';

interface Props {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
  isLoading?: boolean;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  onDelete,
  onToggle,
  onUpdate,
  isLoading = false,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <TodoStatus todo={todo} onToggle={onToggle} />

      {isEditing ? (
        <TodoEditForm
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <TodoView
          todo={todo}
          onDelete={onDelete}
          onEdit={() => setIsEditing(true)}
        />
      )}

      <TodoLoader isLoading={isLoading} />
    </div>
  );
};
