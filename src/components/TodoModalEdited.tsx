interface TodoModalEditigProps {
  setIsEditingTodo: boolean;
}

export const TodoModalEditing: React.FC<TodoModalEditigProps> = () => {
  return (
    <div data-cy="Todo" className="todo">
      <label className="todo__status-label" aria-label="я не знаю что тут">
        <input data-cy="TodoStatus" type="checkbox" className="todo__status" />
      </label>

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
  );
};
