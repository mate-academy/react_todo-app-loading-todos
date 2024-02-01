interface Props {
  message: string,
}

export const Error: React.FC<Props> = ({ message }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {/* show only one message at a time */}
      {message}
    </div>
  );
};
