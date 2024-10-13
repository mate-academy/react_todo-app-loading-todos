import classNames from 'classnames';

type Props = {
  loadingState: boolean;
};

export const Loader: React.FC<Props> = ({ loadingState }) => {
  return (
    <div
      data-cy="TodoLoader"
      className={classNames('modal overlay', {
        'is-active': loadingState,
      })}
    >
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  );
};
