// import { useContext } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
// import { TodoContext } from '../../TodoContext';

type Props = {
  todo: Todo;
  // onStatusChange: () => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
}) => {
  const {
    title,
    completed,
  } = todo;

  // const handleStatusChange = () => onStatusChange

  // const { selectedTodo, setSelectedTodo } = useContext(TodoContext);

  return (
    <div
      className={classNames('todo', { completed })}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          // onChange={handleStatusChange}
        />
      </label>

      <span className="todo__title">
        {title}
      </span>

      {/* Remove button appears only on hover */}
      <button type="button" className="todo__remove">×</button>

      {/* overlay will cover the todo while it is being updated */}
      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
