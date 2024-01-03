import React from 'react';
import cn from 'classnames';
import { Footer } from './Footer';
import { useTodos } from '../context/TodoProvider';
import { getFilteredItems } from '../services/getFilteredItems';

export const TodoList: React.FC = () => {
  const { todos, filterBy } = useTodos();

  const filterCompletedItems = getFilteredItems(todos, filterBy);

  return (
    <>
      <section className="todoapp__main" data-cy="TodoList">
        {filterCompletedItems.map(todo => (
          <div
            key={todo.id}
            data-cy="Todo"
            className={cn('todo', {
              completed: todo.completed,
            })}
          >
            <label className="todo__status-label">
              <input
                name="TodoStatus"
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
            </span>

            {/* Remove button appears only on hover */}
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            {/* overlay will cover the todo while it is being updated */}
            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        ))}
      </section>

      {/* Hide the footer if there are no todos */}
      <Footer />
    </>
  );
};

// {/* This todo is not completed */}
//       <div data-cy="Todo" className="todo">
//         <label className="todo__status-label">
//           <input
//             data-cy="TodoStatus"
//             type="checkbox"
//             className="todo__status"
//           />
//         </label>

//         <span data-cy="TodoTitle" className="todo__title">
//           Not Completed Todo
//         </span>
//         <button type="button" className="todo__remove" data-cy="TodoDelete">
//           ×
//         </button>

//         <div data-cy="TodoLoader" className="modal overlay">
//           <div className="modal-background has-background-white-ter" />
//           <div className="loader" />
//         </div>
//       </div>

//       {/* This todo is being edited */}
//       <div data-cy="Todo" className="todo">
//         <label className="todo__status-label">
//           <input
//             data-cy="TodoStatus"
//             type="checkbox"
//             className="todo__status"
//           />
//         </label>

//         {/* This form is shown instead of the title and remove button */}
//         <form>
//           <input
//             data-cy="TodoTitleField"
//             type="text"
//             className="todo__title-field"
//             placeholder="Empty todo will be deleted"
//             value="Todo is being edited now"
//           />
//         </form>

//         <div data-cy="TodoLoader" className="modal overlay">
//           <div className="modal-background has-background-white-ter" />
//           <div className="loader" />
//         </div>
//       </div>

//       {/* This todo is in loadind state */}
//       <div data-cy="Todo" className="todo">
//         <label className="todo__status-label">
//           <input
//             data-cy="TodoStatus"
//             type="checkbox"
//             className="todo__status"
//           />
//         </label>

//         <span data-cy="TodoTitle" className="todo__title">
//           Todo is being saved now
//         </span>

//         <button type="button" className="todo__remove" data-cy="TodoDelete">
//           ×
//         </button>

//         {/* 'is-active' class puts this modal on top of the todo */}
//         <div data-cy="TodoLoader" className="modal overlay is-active">
//           <div className="modal-background has-background-white-ter" />
//           <div className="loader" />
//         </div>
//       </div>
