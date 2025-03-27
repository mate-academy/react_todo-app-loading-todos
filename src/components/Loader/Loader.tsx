export const Loader = () => {
  return (
    /* 'is-active' class puts this modal on top of the todo */
    <div data-cy="TodoLoader" className="modal overlay is-active">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  );
};
