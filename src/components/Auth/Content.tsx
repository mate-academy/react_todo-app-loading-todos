import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  preaperedTodo: Todo[];
  newTempTodo: Todo | null;
  deletingTodoIds: number[];
  onDelete: (todoId: number) => Promise<boolean>;
  onUpdate: (todoId: number,
    updateData: Partial<Pick<Todo, 'title' | 'completed'>>,) => Promise<void>;
  updatingTodoIds: number[];
};

export const Content: React.FC<Props> = ({
  preaperedTodo,
  newTempTodo,
  deletingTodoIds,
  onDelete,
  onUpdate,
  updatingTodoIds,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {preaperedTodo.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onUpdate={onUpdate}
          onDelete={onDelete}
          updatingTodoIds={updatingTodoIds}
          deletingTodoIds={deletingTodoIds}
        />
      ))}

      {newTempTodo && (
        <TodoItem
          todo={newTempTodo}
          key={newTempTodo.id}
          onUpdate={onUpdate}
          onDelete={onDelete}
          updatingTodoIds={updatingTodoIds}
          deletingTodoIds={deletingTodoIds}
        />
      )}
    </section>
  );
};
