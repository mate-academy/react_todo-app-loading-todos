import React from 'react';
import { Todo as TodoInterface } from '../../types/Todo';
import { Todo } from '../Todo/Todo';

interface Props {
  todos: TodoInterface[]
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(({
        title,
        id,
        completed,
      }) => (
        <Todo
          id={id}
          title={title}
          completed={completed}
        />
        // <div
        //   data-cy="Todo"
        //   className={classNames('todo', {
        //     completed,
        //   })}
        //   key={id}
        // >
        //   <label className="todo__status-label">
        //     <input
        //       data-cy="TodoStatus"
        //       type="checkbox"
        //       className="todo__status"
        //       checked={completed}
        //     />
        //   </label>

        //   <span data-cy="TodoTitle" className="todo__title">
        //     {title}
        //   </span>
        //   <button type="button" className="todo__remove" data-cy="TodoDelete">
        //     ×
        //   </button>

        //   <div data-cy="TodoLoader" className="modal overlay">
        //     <div className="modal-background has-background-white-ter" />
        //     <div className="loader" />
        //   </div>
        // </div>
      ))}
    </section>
  );
};
