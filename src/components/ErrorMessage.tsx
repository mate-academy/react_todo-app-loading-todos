import cn from 'classnames';

type Props = {
  errorMessage: string;
  onErrorClose: (arg: string) => void;
};

export const ErrorMessage: React.FC<Props> = ({
  errorMessage,
  onErrorClose,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !errorMessage,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => onErrorClose('')}
      />
      {errorMessage}
    </div>
  );
};
