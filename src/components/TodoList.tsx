import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  tempTodo: Todo | null;
  editingId: number | null;
  editTitle: string;
  loadingIds: number[];
  editInputRef: React.RefObject<HTMLInputElement>;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onDoubleClick: (todo: Todo) => void;
  onEditTitleChange: (title: string) => void;
  onEditSave: (todo: Todo) => void;
  onEditKeyDown: (e: React.KeyboardEvent, todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  tempTodo,
  editingId,
  editTitle,
  loadingIds,
  editInputRef,
  onToggle,
  onDelete,
  onDoubleClick,
  onEditTitleChange,
  onEditSave,
  onEditKeyDown,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isLoading={loadingIds.includes(todo.id)}
          isEditing={editingId === todo.id}
          editTitle={editTitle}
          editInputRef={editInputRef}
          onToggle={onToggle}
          onDelete={onDelete}
          onDoubleClick={onDoubleClick}
          onEditTitleChange={onEditTitleChange}
          onEditSave={onEditSave}
          onEditKeyDown={onEditKeyDown}
        />
      ))}

      {tempTodo && (
        <TodoItem
          todo={tempTodo}
          isLoading
          isEditing={false}
          editTitle=""
          editInputRef={editInputRef}
          onToggle={() => {}}
          onDelete={() => {}}
          onDoubleClick={() => {}}
          onEditTitleChange={() => {}}
          onEditSave={() => {}}
          onEditKeyDown={() => {}}
        />
      )}
    </section>
  );
};
