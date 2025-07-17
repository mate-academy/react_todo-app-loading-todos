import { Todo } from '../types/Todo';

type Props = {
  sortedUserTodo: Todo[];
};

export const TodoList = ({ sortedUserTodo }: Props) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {sortedUserTodo.map(listTodo => {
        return (
          <div
            key={listTodo.id}
            data-cy="Todo"
            className={`todo ${listTodo.completed ? 'completed' : ''}`}
          >
            <label htmlFor="todoStatus" className="todo__status-label">
              <input
                id="todoStatus"
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={listTodo.completed}
                readOnly
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {listTodo.title}
            </span>

            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

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
