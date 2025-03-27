type Props = {
  load: boolean;
};

export const Loader: React.FC<Props> = ({ load }) => {
  return (
    <div
      data-cy="TodoLoader"
      className={`modal overlay${load ? 'is-active' : ''}`}
    >
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  );
};
