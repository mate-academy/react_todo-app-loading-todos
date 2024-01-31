import classNames from 'classnames';
import { useContext } from 'react';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../contexts/TodosContext';
import { deleteTodo, updateTodo } from '../../api/todos';

interface Props {
  todo: Todo
}

export const TodosItem: React.FC<Props> = ({ todo }) => {
  const {
    completed,
    id,
  } = todo;

  const { setTodos } = useContext(TodosContext);

  const hendlerClick = () => {
    setTodos(currentTodos => currentTodos
      .filter(currentTodo => currentTodo.id !== id));

    deleteTodo(id);
  };

  const handlerInputChange = () => {
    setTodos(currentTodos => currentTodos
      .map(currentTodo => (currentTodo.id === id
        ? ({ ...currentTodo, completed: !completed })
        : currentTodo)));

    updateTodo({
      ...todo,
      completed: !completed,
    });
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed })}
    >
      <label className="todo__status-label">
        <input
          onChange={handlerInputChange}
          data-cy="TodoStatus"
          type="checkbox"
          className={classNames('todo__status', { completed })}
          checked={completed}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      {/* Remove button appears only on hover */}
      <button
        onClick={hendlerClick}
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
      >
        ×
      </button>

      {/* overlay will cover the todo while it is being updated */}
      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
