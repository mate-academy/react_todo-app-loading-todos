import cn from 'classnames';
import { FC } from 'react';

type Props = {
  error: string;
  handleHideError: () => void;
};

export const Error: FC<Props> = ({ error, handleHideError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !error,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleHideError}
      />
      {/* show only one message at a time */}
      {error}
    </div>
  );
};
