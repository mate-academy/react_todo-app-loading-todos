import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../store/store';
import cn from 'classnames';
import { IsUseTodos } from '../../types/IsUseTodos';

export const TodoList = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, useTodos, changerId, idTodoSubmitting } =
    useContext(StateContext);

  const todosFilter = todos.filter(todo => {
    switch (useTodos) {
      case IsUseTodos.Active:
        return !todo.completed;

      case IsUseTodos.Completed:
        return todo.completed;

      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosFilter.map(({ id, title, completed }) => (
        <div
          data-cy="Todo"
          className={cn('todo', { completed: completed })}
          key={id}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={completed}
              onChange={() => dispatch({ type: 'SetCheckedTodo', id: id })}
            />
          </label>

          {id !== changerId && (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() =>
                dispatch({ type: 'setChangedTodoId', id: id })
              }
            >
              {title}
            </span>
          )}

          {id === changerId && (
            <form
              onSubmit={e => {
                e.preventDefault();
                dispatch({ type: 'setChangedTodoId', id: 0 });
              }}
            >
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={title}
                onKeyUp={e => {
                  if (e.key === 'Escape') {
                    dispatch({ type: 'escapeChangedText', id: id });
                    dispatch({ type: 'setChangedTodoId', id: 0 });
                  }
                }}
                autoFocus
                onChange={e =>
                  dispatch({
                    type: 'changedTodoFromId',
                    id: id,
                    text: e.target.value,
                  })
                }
                onBlur={() => dispatch({ type: 'setChangedTodoId', id: 0 })}
              />
            </form>
          )}

          {/* Remove button appears only on hover */}
          {id !== changerId && (
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => dispatch({ type: 'removeTodo', id: id })}
            >
              ×
            </button>
          )}

          <div
            data-cy="TodoLoader"
            className={cn('modal overlay', {
              'is-active': idTodoSubmitting === id,
            })}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
