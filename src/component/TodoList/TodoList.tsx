import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../store/store';
import cn from 'classnames';

export const TodoList = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, useTodos, changerId, idTodoSubmitting } =
    useContext(StateContext);

  const todosFilter = todos.filter(todo => {
    switch (useTodos) {
      case 'Active':
        return !todo.completed;

      case 'Completed':
        return todo.completed;

      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosFilter.map(todo => (
        <div
          data-cy="Todo"
          className={cn('todo', { completed: todo.completed })}
          key={todo.id}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'SetCheckedTodo', id: todo.id })}
            />
          </label>

          {todo.id !== changerId && (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() =>
                dispatch({ type: 'setChangedTodoId', id: todo.id })
              }
            >
              {todo.title}
            </span>
          )}

          {todo.id === changerId && (
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
                value={todo.title}
                onKeyUp={e => {
                  if (e.key === 'Escape') {
                    dispatch({ type: 'escapeChangedText', id: todo.id });
                    dispatch({ type: 'setChangedTodoId', id: 0 });
                  }
                }}
                autoFocus
                onChange={e =>
                  dispatch({
                    type: 'changedTodoFromId',
                    id: todo.id,
                    text: e.target.value,
                  })
                }
                onBlur={() => dispatch({ type: 'setChangedTodoId', id: 0 })}
              />
            </form>
          )}

          {/* Remove button appears only on hover */}
          {todo.id !== changerId && (
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => dispatch({ type: 'removeTodo', id: todo.id })}
            >
              ×
            </button>
          )}

          <div
            data-cy="TodoLoader"
            className={cn('modal overlay', {
              'is-active': idTodoSubmitting === todo.id,
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
