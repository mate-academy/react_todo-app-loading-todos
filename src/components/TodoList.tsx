import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  filteredTodos: Todo[];
  isLoading: boolean;
}

export const TodoList: React.FC<Props> = ({ filteredTodos, isLoading }) => {
  return (
    <section className="todoapp__main">
      {filteredTodos.map((todo) => {
        const { id, title, completed } = todo;

        return (
          <div
            key={id}
            className={`todo ${completed ? 'completed' : ''}`}
          >
            <label className="todo__status-label">
              <input type="checkbox" className="todo__status" />
            </label>

            <span className="todo__title">{title}</span>

            <button type="button" className="todo__remove">
              ×
            </button>

            <div className={`modal overlay ${cn({ 'is-active': isLoading })}`}>
              <div className="modal-background has-background-white-ter" />
              <div className="todoapp__loading-content">
                <p className="todoapp__loading-content--caption">Loading...</p>
                <div className="loader" />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
