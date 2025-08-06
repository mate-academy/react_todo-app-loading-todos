import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/todoItem';

interface Props {
  todos: Todo[];
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
  loadingTodoIds: (number | string)[];
  tempId: number | null;
  onRename: (id: number, newTitle: string) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onDelete,
  onToggle,
  loadingTodoIds,
  tempId,
  onRename,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => {
      const isLoading =
        loadingTodoIds.includes(todo.id) ||
        (tempId !== null && todo.id === tempId);

      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
          loading={isLoading}
          onRename={onRename}
        />
      );
    })}
  </section>
);
