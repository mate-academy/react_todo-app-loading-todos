/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, {
  useContext,
} from 'react';
import { TodosContext } from '../../TodoProvider';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    completed,
    title,
    id,
  } = todo;

  const { todos, setTodos } = useContext(TodosContext);

  const handleChangeCheck = () => {
    const newTodos = todos.map(currTodo => {
      if (currTodo.id === id) {
        return {
          ...currTodo,
          completed: !completed,
        };
      }

      return currTodo;
    });

    setTodos(newTodos);
  };

  return (
    <div className={classNames('todo', { completed })}>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleChangeCheck}
        />
      </label>

      <span className="todo__title">{title}</span>
      <button
        type="button"
        className="todo__remove"
        data-cy="deleteTodo"
      >
        ×
      </button>

      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
