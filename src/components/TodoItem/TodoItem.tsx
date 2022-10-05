import classNames from 'classnames';
import { deleteTodo } from '../../api/todos';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader/Loader';

type Props = {
  todo: Todo;
  toggleStatusOnServer: (id: number, comleted: boolean) => void;
  loadingTodoid: number | null;
  deleteInVisibleTodos: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  toggleStatusOnServer,
  loadingTodoid,
  deleteInVisibleTodos,

}) => {
  const { title, completed, id } = todo;

  const onHendleDeleteTodo = (deleteId: number) => {
    deleteInVisibleTodos(deleteId);
    deleteTodo(deleteId);
  };

  return (
    <div
      key={id}
      data-cy="Todo"
      className={
        classNames('todo',
          {
            completed,
          })
      }
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked
          onClick={() => toggleStatusOnServer(id, completed)}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">{title}</span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDeleteButton"
        onClick={() => onHendleDeleteTodo(id)}
      >
        х
      </button>

      {loadingTodoid === id
      && (<Loader />)}
    </div>
  );
};
