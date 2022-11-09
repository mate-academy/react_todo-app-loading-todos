import { FC } from 'react';

type Props = {
  error: string;
  reset: () => void;
};

export const Error: FC<Props> = ({ error, reset }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={reset}
      />
      {`Unable to ${error} a todo`}
    </div>
  );
};
