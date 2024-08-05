import classNames from 'classnames';

type ErrorMessageProps = {
  errorMessageText: string;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  errorMessageText,
}) => {
  const messageClass = classNames({
    notification: true,
    'is-danger': true,
    'is-light': true,
    'has-text-weight-normal': true,
    hidden: errorMessageText === '',
  });

  return (
    <div data-cy="ErrorNotification" className={messageClass}>
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {errorMessageText}
      <br />
    </div>
  );
};
