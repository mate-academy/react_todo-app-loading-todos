import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { deleteTodo, editTodos } from '../api/todos';
import { useTodosContext } from './useTodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    setTodos,
    editingTodo,
    setEditingTodo,
    handleError,
    setLoadingTodosIds,
    loadingTodosIds,
    setIsInputFocused,
  } = useTodosContext();

  const handleCheckbox = (checkedTodo: Todo) => {
    setTodos(currentTodos => {
      const updatedTodos = currentTodos.map((item: Todo) => {
        if (item.id === checkedTodo.id) {
          return { ...item, completed: !item.completed };
        }

        return item;
      });

      return updatedTodos;
    });
  };

  const handleTodoDelete = (todoId: number) => {
    deleteTodo(todoId)
      .then(() => {
        setTodos(currentTodos => {
          return currentTodos.filter(currentTodo => currentTodo.id !== todoId);
        });
        setLoadingTodosIds(currentIds =>
          currentIds.filter(id => id !== todoId),
        );
      })
      .catch(() => {
        handleError('Unable to delete a todo');
        setLoadingTodosIds(currentIds =>
          currentIds.filter(id => id !== todoId),
        );
      });

    setLoadingTodosIds(currentIds => [...currentIds, todoId]);
    setIsInputFocused(true);
  };

  const handleTodoUpdate = (updatedTodo: Todo) => {
    if (!updatedTodo.title.trim()) {
      handleTodoDelete(updatedTodo.id);
      handleError('Unable to add a todo');

      return;
    }

    editTodos(updatedTodo)
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.map(currentTodo =>
            currentTodo.id === updatedTodo.id ? updatedTodo : currentTodo,
          ),
        );
        setEditingTodo(null);
      })
      .catch(() => handleError('Unable to update a todo'));
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        'todo completed': todo.completed,
        editing: editingTodo?.id === todo.id,
      })}
      key={todo.id}
    >
      <label className="todo__status-label" htmlFor="checkbox">
        <input
          id="checkbox"
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => handleCheckbox(todo)}
        />
        {}
      </label>

      {editingTodo?.id !== todo.id ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setEditingTodo(todo)}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleTodoDelete(todo.id)}
          >
            ×
          </button>
        </>
      ) : (
        <form>
          <input
            type="text"
            data-cy="TodoTitleField"
            className="todo__title-field edit"
            placeholder="Empty todo will be deleted"
            value={editingTodo?.title || ''}
            onChange={event =>
              setEditingTodo({
                ...editingTodo,
                title: event.target.value,
              })
            }
            onKeyDown={event => {
              if (event.key === 'Enter') {
                handleTodoUpdate(editingTodo);
              } else if (event.key === 'Escape') {
                setEditingTodo(null);
              }
            }}
          />
        </form>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': loadingTodosIds.includes(todo.id),
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
