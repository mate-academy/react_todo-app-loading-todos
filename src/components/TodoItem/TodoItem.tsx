/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
// import { EditForm } from './EditForm';
import { Loader } from '../Loader/Loader';
import { Todo } from '../../types/Todo';
import { deleteTodo, changeTodoStatus } from '../../api/todos';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [loading, setLoading] = useState(false);
  // const [edit, setEdit] = useState(false);

  const deleteItem = async (id: number) => {
    setLoading(true);
    await deleteTodo(id);

    setLoading(false);
  };

  const changeStatus = async (id: Todo['id'], status: Todo['completed']) => {
    setLoading(true);
    await changeTodoStatus(id, status);

    setLoading(false);
  };

  return (
    <div data-cy="Todo" className={`todo ${todo.completed && 'completed'} `}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onClick={() => changeStatus(todo.id, !todo.completed)}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      {/* Remove button appears only on hover */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => deleteItem(todo.id)}
      >
        ×
      </button>

      {/* overlay will cover the todo while it is being deleted or updated */}
      {/* {edit && <EditForm />} */}

      <Loader loading={loading} />
    </div>
  );
};

//   {/* This todo is being edited */}
// <div data-cy="Todo" className="todo">
// <label className="todo__status-label">
//   <input
//     data-cy="TodoStatus"
//     type="checkbox"
//     className="todo__status"
//   />
// </label>

// {/* This form is shown instead of the title and remove button */}
// <form>
//   <input
//     data-cy="TodoTitleField"
//     type="text"
//     className="todo__title-field"
//     placeholder="Empty todo will be deleted"
//     value="Todo is being edited now"
//   />
// </form>

// <div data-cy="TodoLoader" className="modal overlay">
//   <div className="modal-background has-background-white-ter" />
//   <div className="loader" />
// </div>
// </div>
