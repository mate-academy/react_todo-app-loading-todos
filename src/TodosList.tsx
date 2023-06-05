import { Todo } from './types/Todo';

interface Props {
  visibleTodos:Todo[],
}

export const TodosList: React.FC<Props> = ({ visibleTodos }) => {
  return (
    <>
      {visibleTodos.map(todo => {
        const { completed, id, title } = todo;

        return (
          <div className={`todo ${completed ? 'completed' : ''}`} key={id}>
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
                checked={completed}
              />
            </label>

            <span className="todo__title">{title}</span>

            <button type="button" className="todo__remove">×</button>

            <div className="modal overlay">
              <div className="modal-background
                  has-background-white-ter"
              />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </>
  );
};
