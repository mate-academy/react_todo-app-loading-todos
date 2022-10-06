import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodoLoader } from './TodoLoader';

type Props = {
  filterTodos: Todo[] | [],
};

export const TodoList: React.FC<Props> = ({ filterTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">

      {filterTodos.map(({ title, completed, id }) => {
        return (
          <div
            key={id}
            data-cy="Todo"
            className={classNames('todo',
              {
                completed,
              })}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">{title}</span>
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDeleteButton"
            >
              ×
            </button>

            <TodoLoader />

          </div>
        );
      })}
    </section>
  );
};
