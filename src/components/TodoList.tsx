import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  filter: string
};
export const TodoList : React.FC<Props> = ({ todos, filter }) => {
  const filteringTodo = () => {
    switch (filter) {
      case 'all':
        return todos;
      case 'Active':
        return todos.filter(el => el.completed === false);
      case 'Completed':

        return todos.filter(el => el.completed === true);
      default:
        return todos;
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">

      {filteringTodo().map(todo => <TodoItem todo={todo} key={todo.id} />)}

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
