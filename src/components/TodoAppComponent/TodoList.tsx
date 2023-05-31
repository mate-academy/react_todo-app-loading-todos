import cn from 'classnames';
import { useState } from 'react';
import { Todo } from '../../types/Todo';

interface PropsTodoList {
  filteredTodos: Todo[];
}
export const TodoList = ({ filteredTodos }: PropsTodoList) => {
  const [isEdit] = useState(false);
  const [loadind] = useState(false);
  const isShowTodos = filteredTodos.length > 0;

  return (
    <section className="todoapp__main">
      { isShowTodos && filteredTodos.map(todo => {
        const { id, title, completed } = todo;

        return (
          <div
            className={cn({
              todo: !completed,
              'todo completed': completed,
            })}
            key={id}
          >
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
                checked={completed}
              />
            </label>

            {!isEdit ? (<span className="todo__title">{title}</span>)
              : (
                <form>
                  <input
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value="Todo is being edited now"
                  />
                </form>
              )}

            <button type="button" className="todo__remove">×</button>
            <div className={cn({
              'modal overlay': !loadind,
              'modal overlay is-active': loadind,
            })}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}

    </section>
  );
};
