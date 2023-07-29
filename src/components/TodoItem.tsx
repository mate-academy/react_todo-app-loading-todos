import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
// import { TodosContext } from '../context/TodosContext';

type Props = {
  todo: Todo;
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo | null) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodo,
  setSelectedTodo,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // const [todos, setTodos] = useContext(TodosContext);
  // add setter
  const [tempTitle] = useState(todo.title);
  // add setter
  const [isSaving] = useState(false);

  // left for future tasks so lint doesn't complain
  if (selectedTodo?.id === -1) {
    setSelectedTodo(null);
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedTodo]);

  return (
    <div
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          id={`todo-${todo.id}`}
        />
      </label>

      {selectedTodo?.id !== todo.id ? (
        <>
          <span className="todo__title">{todo.title}</span>
          <button type="button" className="todo__remove">×</button>
        </>
      ) : (
        <form>
          <input
            type="text"
            className="todo__title-field"
            value={tempTitle}
          />
        </form>
      )}

      <div
        className={classNames('modal overlay', {
          'is-active': isSaving,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
