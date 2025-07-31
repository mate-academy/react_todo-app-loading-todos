import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  filteredTodos: Todo[];
  tempClearAll: Todo[] | null;
  tempTodo: Todo | null;
  tempDeleteTodo: Todo | null;
  handleDelete: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  filteredTodos,
  tempClearAll,
  tempTodo,
  tempDeleteTodo,
  handleDelete,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TodoItem
        filteredTodos={filteredTodos}
        tempClearAll={tempClearAll}
        tempDeleteTodo={tempDeleteTodo}
        handleDelete={handleDelete}
      />
      {tempTodo !== null && (
        <div data-cy="Todo" className="todo">
          <label
            className="todo__status-label"
            htmlFor={`tempTodo-${tempTodo.id}`}
          >
            {
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            }
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {tempTodo.title}
          </span>

          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>

          {/* 'is-active' class puts this modal on top of the todo */}
          <div data-cy="TodoLoader" className="modal overlay is-active">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      )}
    </section>
  );
};
