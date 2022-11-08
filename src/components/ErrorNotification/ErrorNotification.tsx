import classNames from 'classnames';

type Props = {
  hasError: boolean
  onClose: () => void
  errorMessage: string
};

export const ErrorNotification: React.FC<Props> = ({
  hasError,
  onClose,
  errorMessage,
}) => (
  <div
    data-cy="ErrorNotification"
    className={classNames(
      'notification is-danger is-light has-text-weight-normal', {
        hidden: !hasError,
      },
    )}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      aria-label="Error button"
      onClick={onClose}
    />
    {errorMessage}
  </div>
);
