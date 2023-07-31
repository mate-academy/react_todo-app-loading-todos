import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';
import { TabsFooter } from '../enums/TabsFooter';

type Props = {
  todos: Todo[],
  activeTab: string,
};

export const ShowTodos: React.FC<Props> = ({ todos, activeTab }) => {
  const getVisibleTodos = (t: Todo[], at: string) => {
    switch (at) {
      case TabsFooter.Active:
        return t.filter((el) => !el.completed);
      case TabsFooter.Completed:
        return t.filter((el) => el.completed);
      default:
        return t;
    }
  };

  const visibleTodos = getVisibleTodos(todos, activeTab);

  return (
    <section className="todoapp__main">
      {visibleTodos.map((todo) => (
        <div
          className={classNames('todo', { completed: todo.completed })}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
            />
          </label>

          <span className="todo__title">{todo.title}</span>

          {/* Remove button appears only on hover */}
          <button type="button" className="todo__remove">
            ×
          </button>

          {/* overlay will cover the todo while it is being updated */}
          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}

      {/* This todo is being edited */}
      {/* <div className="todo">
      <label className="todo__status-label">
        <input type="checkbox" className="todo__status" />
      </label>

      <form>
        <input
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          value="Todo is being edited now"
        />
      </form>

      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div> */}

      {/* This todo is in loadind state */}
      {/* <div className="todo">
      <label className="todo__status-label">
        <input type="checkbox" className="todo__status" />
      </label>

      <span className="todo__title">Todo is being saved now</span>
      <button type="button" className="todo__remove">
        ×
      </button>

      <div className="modal overlay is-active">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div> */}
    </section>
  );
};
