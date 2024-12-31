import React from 'react';
import { Todo } from '../types/Todo';

type TodoItemProps = {
  todo: Todo;
  index: number;
  editIndex: number | null;
  editValue: string;
  loadingTodoId: number | null;
  completeTodo: (id: number, completed: boolean) => void;
  updateTodo: (
    id: number,
    title: string,
    e?: React.FormEvent<HTMLFormElement>,
  ) => void;
  deleteTodo: (id: number) => void;
  setEditValue: (value: string) => void;
  onDblClick: (data: { index: number; todo: Todo }) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  editIndex,
  editValue,
  loadingTodoId,
  completeTodo,
  updateTodo,
  deleteTodo,
  setEditValue,
  onDblClick,
}) => {
  return (
    <div
      data-cy="Todo"
      className={`todo ${todo.completed ? 'completed' : ''}`}
      key={todo.id}
    >
      {/*eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
      <label
        className="todo__status-label"
        htmlFor={`todo-${index}`}
        onClick={() => completeTodo(todo.id, !todo.completed)}
      >
        <input
          data-cy="TodoStatus"
          type="checkbox"
          id={`todo-${todo.id}`}
          className="todo__status"
          checked={todo.completed}
        />
      </label>

      {editIndex === index ? (
        <form
          onSubmit={e => updateTodo(todo.id, editValue, e)}
          onBlur={() => updateTodo(todo.id, editValue)}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            onChange={e => setEditValue(e.target.value)}
            value={editValue}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => onDblClick({ index, todo })}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={`modal overlay ${loadingTodoId === todo.id ? 'is-active' : ''}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};

export default TodoItem;
