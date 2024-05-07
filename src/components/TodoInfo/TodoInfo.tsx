/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../stor/Context';
import classNames from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { updateTodo, deleteTodo, setIsSubmitting } = useContext(TodosContext);

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.title);

  const inputElement = document.getElementById('NewTodoField');

  function togelStatement() {
    const newTodo = { ...todo, completed: !todo.completed };

    updateTodo(newTodo);
  }

  function editingTodo(event: React.FormEvent) {
    event.preventDefault();

    const trimTitle = value.trim();

    if (trimTitle) {
      updateTodo({ ...todo, title: value.trim() });
    } else {
      deleteTodo(todo);
    }

    setEditing(false);
    inputElement?.focus();
  }

  function hendlerSubmitting() {
    setIsSubmitting(true);
    deleteTodo(todo);
  }

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onClick={togelStatement}
          checked={todo.completed}
        />
      </label>

      {!editing ? (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setEditing(true)}
        >
          {todo.title}
        </span>
      ) : (
        <form onSubmit={editingTodo}>
          <input
            autoFocus
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            defaultValue={todo.title}
            onChange={event => setValue(event.target.value)}
            onBlur={editingTodo}
            onKeyDown={event => {
              if (event.key === 'Escape') {
                setEditing(false);
              }
            }}
          />
        </form>
      )}

      {!editing && (
        <>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={hendlerSubmitting}
          >
            ×
          </button>
          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </>
      )}
    </div>
  );
};
