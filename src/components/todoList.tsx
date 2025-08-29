import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  renderedData: Todo[];
};

const TodoList: React.FC<Props> = ({ renderedData }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {renderedData.map(todo => (
        <>
          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                aria-label="Mark todo as completed"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
            </span>
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        </>
      ))}
    </section>
  );
};

export default TodoList;
