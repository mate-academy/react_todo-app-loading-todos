import { FC, useContext } from 'react';
import cn from 'classnames';
import { AppContext } from '../context/AppContext';

export const Errors: FC = () => {
  const context = useContext(AppContext);

  if (!context) {
    return <p>Context not provided.</p>;
  }

  const { showError, setShowError, errorMessage } = context;

  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal', {
          hidden: !showError,
        },
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setShowError(false)}
      />
      {errorMessage}
    </div>
  );
};
