import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[];
  isLoading: boolean;
  isEdited: boolean;
}

export const TodoList: FC<Props> = ({
  todos,
  isLoading,
  isEdited,
}) => {
  return (
    <section className="todoapp__main">

      <>
        {todos.length > 0 && (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isLoading={isLoading}
            />
          ))
        )}
      </>

      {/* This todo is being edited */}
      {isEdited && (
        <div className="todo">
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
            />
          </label>

          {/* This form is shown instead of the title and remove button */}
          <form>
            <input
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
            // value="Todo is being edited now"
            />
          </form>

          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      )}
    </section>
  );
};
