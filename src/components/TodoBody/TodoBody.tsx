import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import { Errors } from '../../types/Errors';

type Props = {
  filteringBy: Todo[],
  newTodoId: number[],
  tempTodo: Omit<Todo, 'id'> | null,
  deleteTodo: (todoId: number) => void,
  updateTodo: (updatedTodo: Todo) => Promise<void>,
};

export const TodoBody: React.FC<Props> = ({
  filteringBy,
  newTodoId,
  tempTodo,
  deleteTodo,
  updateTodo,
}) => {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const editFocus = useRef<HTMLInputElement | null>(null);

  // Activate input OnDoubleclick to edit the todo
  useEffect(() => {
    if (editFocus.current) {
      editFocus.current.focus();
    }
  }, [editValue]);

  // Submit the edited todo
  const handleEditingTodo = (
    event: React.FormEvent<HTMLFormElement> | null,
    todo: Todo,
  ) => {
    if (event) {
      event.preventDefault();
    }

    switch (editValue) {
      case Errors.NULL:
        return deleteTodo(todo.id);
      case todo.title:
        return setIsEditing(null);
      default:
        return updateTodo({ ...todo, title: editValue })
          .then(() => {
            setIsEditing(null);
            setEditValue('');
          });
    }
  };

  // Reset the edited todo on KeyUp "Escape"
  const resetEditing = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Escape') {
      setIsEditing(null);
      setEditValue('');
    }
  };

  return (
    <section className="todoapp__main">
      {/* Todos from server response */}
      {filteringBy.map(todo => {
        const { id, completed, title } = todo;

        return (
          <div
            className={classNames(
              'todo',
              { completed },
            )}
            key={id}
            onDoubleClick={() => {
              setIsEditing(id);
              setEditValue(title);
            }}
          >
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
                onChange={() => updateTodo(
                  { ...todo, completed: !completed },
                )}
              />
            </label>

            {/* Edit input which activate after OnDoubleClick */}
            {id === isEditing ? (
              <form onSubmit={(event) => handleEditingTodo(event, todo)}>
                <input
                  ref={editFocus}
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value={editValue}
                  onKeyUp={resetEditing}
                  onBlur={() => handleEditingTodo(null, todo)}
                  onChange={(event) => setEditValue(event.target.value)}
                />
              </form>
            ) : (
              <>
                {/* Standart Todo from server */}
                <span className="todo__title">
                  {title}
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  onClick={() => deleteTodo(id)}
                >
                  ×
                </button>
              </>
            )}

            <div className={classNames(
              'modal overlay',
              { 'is-active': newTodoId.includes(id || 0) },
            )}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}

      {/* Temproary Todo during waitind for server response */}
      {tempTodo && (
        <div
          className="todo"
        >
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
            />
          </label>

          <span className="todo__title">
            {tempTodo.title}
          </span>

          <div className="modal overlay is-active">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      )}
    </section>
  );
};
