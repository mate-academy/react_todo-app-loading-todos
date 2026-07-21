import React from 'react';
import { Todo, TodoId } from '../../types/Todo';
import { TodoItem } from '../Todo/TodoItem';

interface Props {
  todos: Todo[];
  onDelete: (todoId: TodoId) => Promise<boolean>;
  loadingTodoId: TodoId | null;
  onChange: (newTodo: Todo) => Promise<boolean>;
  editingId: TodoId | null;
  setEditingId: (id: TodoId | null) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onDelete,
  onChange,
  loadingTodoId,
  editingId,
  setEditingId,
}) => {
  return (
    <ul>
      {todos.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onChange={onChange}
            isLoading={loadingTodoId === todo.id}
            isEditing={editingId === todo.id}
            setEditingId={setEditingId}
          />
        );
      })}
    </ul>
  );
};
