import { FC } from 'react';

type Props = {
  onClose: () => void;
  closeError: () => void;
};

export const ErrorNotification: FC<Props> = ({ onClose, closeError }) => {
  onClose();

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
        onClick={closeError}
      />

      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
