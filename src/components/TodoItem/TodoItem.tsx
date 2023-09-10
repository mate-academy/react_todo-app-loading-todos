import { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import './TodoItem.scss';
import { deleteTodo } from '../../api/todos';

type TodoItemProps = {
  todo: Todo;
  handleDeleteTodo: (todoId: number) => void;
  handleEditTodo: (property: string, value: any, todoId: number) => void;
  loadingId: number | null;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  handleDeleteTodo,
  handleEditTodo,
  loadingId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(todo.title);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;

    setInputValue(currentValue);
  };

  const saveChanges = () => {
    handleEditTodo('title', inputValue, todo.id);
    setIsEditing(false);
  };

  const handleSubmitEditing = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputValue.trim()) {
      saveChanges();
    }
  };

  const handleBlur = (todoId: number) => {
    if (inputValue.trim()) {
      saveChanges();
    } else {
      deleteTodo(todoId);
    }
  };

  const handleToggle = (todoId: number, isCompleted: boolean) => {
    handleEditTodo('completed', !isCompleted, todoId);
  };

  return (
    <div
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => {
            handleToggle(todo.id, todo.completed);
          }}
        />
      </label>

      {isEditing ? (
        <form
          onSubmit={handleSubmitEditing}
        >
          <input
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            onChange={handleTitleChange}
            value={inputValue}
            onBlur={() => {
              handleBlur(todo.id);
            }}
          />
        </form>
      ) : (
        <>
          <span
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {todo.title}
          </span>
          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
            onClick={() => {
              handleDeleteTodo(todo.id);
            }}
          >
            ×
          </button>
        </>
      )}

      {/* overlay will cover the todo while it is being updated */}
      <div className={
        classNames('modal overlay',
          { 'is-active': (loadingId === todo.id) })
      }
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
