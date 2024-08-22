import { FC } from 'react';
import { Todo } from './types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  todoList: Todo[];
}

export const TodoList: FC<Props> = ({ todoList }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This todo is being edited
      <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

         This form is shown instead of the title and remove button
        <form>
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
    */}

      {todoList.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
