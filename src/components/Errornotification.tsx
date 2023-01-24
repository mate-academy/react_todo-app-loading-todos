import cn from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  errorMessage: string,
  closeErrorMessage: () => void,
};

export const Errornotification: React.FC<Props> = ({
  errorMessage,
  closeErrorMessage,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMessage })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={closeErrorMessage}
      />

      {errorMessage}
    </div>
  );
};
