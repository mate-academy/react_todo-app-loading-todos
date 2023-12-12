import React, { useContext } from 'react';
import { Todo } from '../types/Todo';
import { ErrorContext, ErrorsMessageContext } from './ErrorsContext';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
};
export const TodoList : React.FC<Props> = ({ todos }) => {
  const { setErrorsMesage } = useContext(ErrorsMessageContext);

  const { isError, setIsError } = useContext(ErrorContext);

  const updateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (isError) {
      setIsError(false);
    }

    setIsError(true);
    setErrorsMesage('update');
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
      <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

        <form
          onSubmit={updateTodo}
        >
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
      </div>
    </section>
  );
};

// eslint-disable-next-line no-lone-blocks
{ /* <div data-cy="Todo" className="todo completed">
<label className="todo__status-label">
  <input
    data-cy="TodoStatus"
    type="checkbox"
    className="todo__status"
    checked
  />
</label>

<span data-cy="TodoTitle" className="todo__title">
  Completed Todo
</span>

<button
  type="button"
  className="todo__remove"
  onMouseDown={deleteTodo}
  data-cy="TodoDelete"
>
  ×
</button>

<div data-cy="TodoLoader" className="modal overlay">
  <div className="modal-background has-background-white-ter" />
  <div className="loader" />
</div>
</div>

<div data-cy="Todo" className="todo">
<label className="todo__status-label">
  <input
    data-cy="TodoStatus"
    type="checkbox"
    className="todo__status"
  />
</label>

<span data-cy="TodoTitle" className="todo__title">
  Not Completed Todo
</span>
<button type="button" className="todo__remove" data-cy="TodoDelete">
  ×
</button>

<div data-cy="TodoLoader" className="modal overlay">
  <div className="modal-background has-background-white-ter" />
  <div className="loader" />
</div>
</div>
<div data-cy="Todo" className="todo">
<label className="todo__status-label">
  <input
    data-cy="TodoStatus"
    type="checkbox"
    className="todo__status"
  />
</label>

<form
  onSubmit={updateTodo}
>
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
</div>

<div data-cy="Todo" className="todo">
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
</button>
<div data-cy="TodoLoader" className="modal overlay is-active">
  <div className="modal-background has-background-white-ter" />
  <div className="loader" />
</div>
</div> */ }
