import { FC } from 'react';
import { Todo } from '../types/Todo';

interface Props {
  visibleTodos: Todo[],
}

export const TodoList: FC<Props> = ({ visibleTodos }) => {
  return (
    <section className="todoapp__main">
      {visibleTodos.map(todo => (
        <div className="todo" key={todo.id}>
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
            />
          </label>

          <span className="todo__title">{todo.title}</span>
          <button type="button" className="todo__remove">×</button>

          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
