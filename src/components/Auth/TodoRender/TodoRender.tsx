import classNames from 'classnames';
import { ChangeEvent, useEffect, useRef } from 'react';
import { TypeChange } from '../../../context/TodoContext';
import { Todo } from '../../../types/Todo';

type Props = {
  todo: Todo,
  handleStatusChange: (todo: Todo, type: TypeChange) => void,
  selectedTodoId: number | null,
  setSelectedTodoId: (valut: number) => void,
  setInputValue: (value: string) => void,
  inputValue: string,
  handleChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void,
};

export const TodoRender: React.FC<Props> = ({
  todo,
  handleStatusChange,
  selectedTodoId,
  setSelectedTodoId,
  setInputValue,
  inputValue,
  handleChangeTitle,
}) => {
  const { title, completed, id } = todo;
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, [selectedTodoId]);

  return (
    <div
      data-cy="Todo"
      className={classNames(
        'todo',
        { completed },
      )}
      key={id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked
          onClick={() => handleStatusChange(todo, TypeChange.checkbox)}
        />
      </label>

      {(selectedTodoId !== id && (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => {
            setSelectedTodoId(todo.id);
            setInputValue(title);
          }}
        >
          {title}
        </span>
      ))}
      {selectedTodoId === id
  && (
    <input
      value={inputValue}
      className="input is-large is-primary"
      onBlur={() => handleStatusChange(todo, TypeChange.title)}
      onChange={handleChangeTitle}
      ref={newTodoField}
    />
  )}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDeleteButton"
      >
        ×
      </button>

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
