import React from 'react';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  filter: Filter;
  handleCompletedChange: (id: number) => void;
  isLoading: boolean;
}

export const TodoList: React.FC<Props> = ({
  todos,
  filter,
  handleCompletedChange,
  isLoading,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TodoItem
        todos={todos}
        filter={filter}
        handleCompletedChange={handleCompletedChange}
      />

      {/* This todo is in loading state */}
      {isLoading && (
        <div data-cy="Todo" className="todo">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            Todo is being saved now
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
