type Props = {
  loader: Record<number, boolean>;
  todoId: number;
};

export const Loader: React.FC<Props> = ({ loader, todoId }) => {
  return (
    <div
      data-cy="TodoLoader"
      className={`modal overlay ${loader[todoId] ? 'is-active' : ''}`}
    >
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  );
};
