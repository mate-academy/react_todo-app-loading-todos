import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  loadingTodo: boolean;
  filteredTodos: Todo[];
  toggleCompleted: (a: number, b: boolean) => void;
  updatingId: number | null;
  handleSave: (a: number) => void;
  updatingText: string;
  setUpdatingText: (a: string) => void;
  handleEdit: (a: number, b: string) => void;
  handleDelete: (a: number) => void;
}

export const TodoList: React.FC<Props> = ({
  loadingTodo,
  filteredTodos,
  toggleCompleted,
  updatingId,
  handleSave,
  updatingText,
  setUpdatingText,
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {!loadingTodo &&
        filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleCompleted={toggleCompleted}
            updatingId={updatingId}
            handleSave={handleSave}
            updatingText={updatingText}
            setUpdatingText={setUpdatingText}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
    </section>
  );
};
