import { Dispatch, SetStateAction } from 'react';
import { ErrorTypes } from '../types/ErrorTypes';

type Props = {
  error: ErrorTypes,
  setError: Dispatch<SetStateAction<ErrorTypes | null>>,
};

export const Error: React.FC<Props> = ({ error, setError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="Error Notification"
        onClick={() => setError(null)}
      />
      {/* show only one message at a time */}
      {/* Unable to load todos */}
      {/* <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
      {error === ErrorTypes.LOAD_ALL_TODOS ? 'Unable to load todos' : null}
    </div>
  );
};
