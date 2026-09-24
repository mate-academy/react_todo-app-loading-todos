import React from 'react';
import { Todo as TodoType } from '../../types/Todo';
import { Todo } from '../Todo/Todo';

type Props = {
  edit: number | null;
  editTitle: string;
  visibleTodos: TodoType[];
  toggleTodo: (todo: TodoType) => void;
  loadingTodoId: number | null;
  loadingClear: boolean;
  handleEdit: (todo: TodoType) => void;
  setEditTitle: (value: string) => void;
  handleEditClick: (todo: TodoType) => void;
  handleDelete: (todo: TodoType) => void;
};

export const TodoList: React.FC<Props> = ({
  edit,
  editTitle,
  visibleTodos,
  toggleTodo,
  loadingTodoId,
  loadingClear,
  handleEdit,
  setEditTitle,
  handleEditClick,
  handleDelete,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <Todo
          key={todo.id}
          edit={edit}
          editTitle={editTitle}
          toggleTodo={toggleTodo}
          loadingTodoId={loadingTodoId}
          loadingClear={loadingClear}
          handleEdit={handleEdit}
          setEditTitle={setEditTitle}
          handleEditClick={handleEditClick}
          handleDelete={handleDelete}
          todo={todo}
        />
      ))}
    </section>
  );
};
