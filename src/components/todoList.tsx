import type { Todo } from '../types/Todo';

type TodoListProps = {
  filtered: Todo[] | null;
  editId: number | null;
  setEditId: (item: number | null) => void;
  editIdValue: string;
  setEditIdValue: (item: string) => void;
};

export default function TodoList({
  filtered,
  editId,
  setEditId,
  editIdValue,
  setEditIdValue,
}: TodoListProps) {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filtered?.map(item => (
        <div
          key={item.id}
          data-cy="Todo"
          className={`todo ${item.completed === true ? 'completed' : ''}`}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={item.completed === true}
            />
          </label>

          {item.id === editId ? (
            <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={editIdValue}
                onChange={e => setEditIdValue(e.target.value)}
              />
            </form>
          ) : (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => {
                setEditId(item.id);
                setEditIdValue(item.title);
              }}
            >
              {item.title}
            </span>
          )}

          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>

          <div data-cy="TodoLoader" className={`modal overlay`}>
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
}
