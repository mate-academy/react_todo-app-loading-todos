import cn from 'classnames';
import { Todo } from '../../types/Todo';
import '../../styles/index.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.length > 0 && (
        todos.map((todo: Todo) => {
          return (
            <div
              data-cy="Todo"
              className={cn(
                'todo',
                { completed: todo.completed },
              )}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                />
              </label>

              {/* {editing ? (
                <form>
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    defaultValue={todo.title}
                  />
                </form>
              ) : ( */}
              <span
                data-cy="TodoTitle"
                className="todo__title"
                // onClick={(e) => dbclickHandler(e.currentTarget)}
                // onKeyDown={dbclickHandler}
              >
                {todo.title}
              </span>
              {/* )} */}

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDeleteButton"
              >
                ×
              </button>

              <div
                data-cy="TodoLoader"
                className={cn(
                  'modal',
                  'overlay',
                  // { 'is-active': onLoading },
                )}
              >
                <div
                  className="modal-background has-background-white-ter"
                />
                <div className="loader" />
              </div>
            </div>
          );
        })
      )}
    </section>
  );
};
