import cn from 'classnames';
import { FC } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
};

export const TodoList: FC<Props> = ({
  todos,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {todos.map(todo => {
        const {
          title,
          id,
        } = todo;

        return (
          <div
            data-cy="Todo"
            className={cn('todo', { completed: todo.completed })}
            key={id}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {title}
            </span>

            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            {/* overlay will cover the todo while it is being updated */}
            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </section>
  );
};

// eslint-disable-next-line no-lone-blocks
{ /* This todo is not completed */ }
// <div data-cy="Todo" className="todo">
//   <label className="todo__status-label">
//     <input
//       data-cy="TodoStatus"
//       type="checkbox"
//       className="todo__status"
//     />
//   </label>

//   <span data-cy="TodoTitle" className="todo__title">
//     Not Completed Todo
//   </span>
//   <button type="button" className="todo__remove" data-cy="TodoDelete">
//     ×
//   </button>

//   <div data-cy="TodoLoader" className="modal overlay">
//     <div className="modal-background has-background-white-ter" />
//     <div className="loader" />
//   </div>
// </div>
// eslint-disable-next-line no-lone-blocks
{ /* This todo is being edited */ }
// <div data-cy="Todo" className="todo">
//   <label className="todo__status-label">
//     <input
//       data-cy="TodoStatus"
//       type="checkbox"
//       className="todo__status"
//     />
//   </label>

// eslint-disable-next-line no-lone-blocks
{ /* This form is shown instead of the title and remove button */ }
//   <form>
//     <input
//       data-cy="TodoTitleField"
//       type="text"
//       className="todo__title-field"
//       placeholder="Empty todo will be deleted"
//       value="Todo is being edited now"
//     />
//   </form>

//   <div data-cy="TodoLoader" className="modal overlay">
//     <div className="modal-background has-background-white-ter" />
//     <div className="loader" />
//   </div>
// </div>
// eslint-disable-next-line no-lone-blocks
{ /* This todo is in loadind state */ }
// <div data-cy="Todo" className="todo">
//   <label className="todo__status-label">
//     <input
//       data-cy="TodoStatus"
//       type="checkbox"
//       className="todo__status"
//     />
//   </label>

//   <span data-cy="TodoTitle" className="todo__title">
//     Todo is being saved now
//   </span>

//   <button type="button" className="todo__remove" data-cy="TodoDelete">
//     ×
//   </button>

//   {/* 'is-active' class puts this modal on top of the todo */}
//   <div data-cy="TodoLoader" className="modal overlay is-active">
//     <div className="modal-background has-background-white-ter" />
//     <div className="loader" />
//   </div>
// </div>
