/* eslint-disable jsx-a11y/control-has-associated-label */

type Props = {
  error: string;
  unSetError: (value: '') => void;
};

export const ErrorNotification: React.FC<Props> = ({ error, unSetError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => unSetError('')}
      />

      {error}
    </div>
  );
};
