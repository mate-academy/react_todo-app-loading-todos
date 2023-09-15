/* eslint-disable jsx-a11y/control-has-associated-label */

import { Errors } from '../../types/Erros';

/* Notification is shown in case of any error */
/* Add the 'hidden' class to hide the message smoothly */

type Props = {
  error: Errors,
  closeErrorMessage: () => void,
};
export const CaseOfErrorMessage = ({
  error,
  closeErrorMessage,
}: Props) => {
  return (
    <div
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        type="button"
        className="delete"
        onClick={closeErrorMessage}
      />

      { error }
    </div>
  );
};
