import { useContext } from 'react';
import { StatesContext } from '../context/Store';

export const ErrorNotification: React.FC = () => {
  const { errorMessage } = useContext(StatesContext);

  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {/* show only one message at a time */}
      {errorMessage}
    </div>
  );
};
