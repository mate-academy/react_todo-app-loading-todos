import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onStatusChange: (todoId: number) => void;
  onDeleteTodo: (todoId: number) => void;
};

export const TodoList: React.FC<Props> = (props) => {
  const {
    todos,
    onStatusChange,
    onDeleteTodo,
  } = props;
  const selectedTodoField = useRef<HTMLInputElement>(null);
  const [selectedTodo, setSelectedTodo] = useState<number | null>(null);
  const [isLoading] = useState(false);

  const handleResetSelectedTodo = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    // focus the element with `ref={selectedTodoField}`
    if (selectedTodoField.current) {
      selectedTodoField.current.focus();
    }
  }, [selectedTodo]);

  return (
    <>
      {todos.map(todo => {
        const {
          id,
          title,
          completed,
        } = todo;

        return (
          <div
            key={id}
            data-cy="Todo"
            className={classNames('todo', { completed })}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={completed}
                onChange={() => onStatusChange(id)}
              />
            </label>

            {id === selectedTodo ? (
              <form>
                <input
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value={title}
                  onBlur={handleResetSelectedTodo}
                  ref={selectedTodoField}
                />
              </form>
            ) : (
              <>
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={() => setSelectedTodo(id)}
                >
                  {title}
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDeleteButton"
                  onClick={() => onDeleteTodo(id)}
                >
                  ×
                </button>
              </>
            )}

            <div
              data-cy="TodoLoader"
              className={classNames(
                'modal',
                'overlay',
                { 'is-active': isLoading },
              )}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </>
  );
};
