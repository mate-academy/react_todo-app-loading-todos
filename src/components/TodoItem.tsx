/* eslint-disable jsx-a11y/label-has-associated-control */
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  onChange?: (todo: number) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, onChange = () => {} }) => {
  const { id, completed, title } = todo;

  return (
    <div
      data-cy="Todo"
      key={id}
      className={`todo ${completed ? 'completed' : ''}`}
    >
      <label className="todo__status-label" htmlFor="{`todo-checkbox-${id}`}">
        <input
          id={`todo-checkbox-${id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => onChange(id)}
        />
      </label>
      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      {/* overlay will cover the todo while it is being deleted or updated */}

      <div data-cy="TodoLoader" className="modal overlay">
        <div
          className="modal-background
          has-background-white-ter"
        />
        <div className="loader" />
      </div>
    </div>
  );
};

{
  /* This todo is being edited */
}

{
  /* <div data-cy="Todo" className="todo">
    <label className="todo__status-label">
    <input
      data-cy="TodoStatus"
      type="checkbox"
      className="todo__status"
    />
  </label> */
}

{
  /* This form is shown instead of the title and remove button */
}

{
  /* <form>
    <input
      data-cy="TodoTitleField"
      type="text"
      className="todo__title-field"
      placeholder="Empty todo will be deleted"
      value="Todo is being edited now"
    />
  </form>

  <div data-cy="TodoLoader" className="modal overlay">
    <div className="modal-background has-background-white-ter" />
    <div className="loader" />
  </div>
</div>*/
}

{
  /* This todo is in loadind state */
}

{
  /* <div data-cy="Todo" className="todo">
  <label className="todo__status-label">
    <input
      data-cy="TodoStatus"
      type="checkbox"
      className="todo__status"
    />
  </label>

  <span data-cy="TodoTitle" className="todo__title">
    Todo is being saved now
  </span>

  <button type="button" className="todo__remove" data-cy="TodoDelete">
    ×
  </button> */
}

{
  /* 'is-active' class puts this modal on top of the todo */
}

{
  /* <div data-cy="TodoLoader" className="modal overlay is-active">
    <div className="modal-background has-background-white-ter" />
    <div className="loader" />
  </div> */
}

{
  /* </div> */
}
