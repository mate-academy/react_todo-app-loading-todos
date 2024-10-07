import classNames from 'classnames';

type Props = {
  spinnerLoading: boolean;
};

export const Loader: React.FC<Props> = ({ spinnerLoading }) => (
  <>
    <div
      data-cy="TodoLoader"
      className={classNames('modal overlay', {
        'is-active': spinnerLoading,
      })}
    >
      <div
        className="
          modal-background
          has-background-white-ter"
      />
      <div className="loader" />
    </div>
  </>
);
