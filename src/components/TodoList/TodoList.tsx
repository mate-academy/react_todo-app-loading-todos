import React from 'react';

import { TodoItem } from '../TodoItem';
import { TodoLoadingItem } from '../TodoLoadingItem';

import { ErrorMessages } from '../../types/ErrorMessages';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  loadingTodoTitle: string,
  setErrorMessage: (value: ErrorMessages) => void,
  handleTodoDelete: (id: number) => void,
  handleTodoUpdate: (newTodo: Todo) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  loadingTodoTitle,
  setErrorMessage,
  handleTodoDelete,
  handleTodoUpdate,
}) => {
  return (
    <section className="todoapp__main">
      {/* This todo is not completed */}

      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          setErrorMessage={setErrorMessage}
          handleTodoDelete={handleTodoDelete}
          handleTodoUpdate={handleTodoUpdate}
        />
      ))}

      {loadingTodoTitle && (
        <TodoLoadingItem title={loadingTodoTitle} />
      )}

      {/* This is a completed todo
      <div className="todo completed">
        <label className="todo__status-label">
          <input
            type="checkbox"
            className="todo__status"
            checked
          />
        </label>

        <span className="todo__title">Completed Todo</span>

        Remove button appears only on hover
        <button type="button" className="todo__remove">×</button>

        overlay will cover the todo while it is being updated
        <div className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div> */}

      {/* This todo is being edited
      <div className="todo">
        <label className="todo__status-label">
          <input
            type="checkbox"
            className="todo__status"
          />
        </label>

        This form is shown instead of the title and remove button
        <form>
          <input
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value="Todo is being edited now"
          />
        </form>

        <div className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>

      This todo is in loadind state
      <div className="todo">
        <label className="todo__status-label">
          <input type="checkbox" className="todo__status" />
        </label>

        <span className="todo__title">Todo is being saved now</span>
        <button type="button" className="todo__remove">×</button>

        'is-active' class puts this modal on top of the todo
        <div className="modal overlay is-active">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div> */}
    </section>
  );
};
