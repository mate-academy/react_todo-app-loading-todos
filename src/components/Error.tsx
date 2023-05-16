import { Errors } from '../utils/Errors';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  setHasError: (value: Errors) => void,
  setErrorMessage: () => string,
};

export const Error: React.FC<Props> = ({ setHasError, setErrorMessage }) => {
  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      <button
        type="button"
        className="delete"
        onClick={() => setHasError(Errors.None)}
      />
      {setErrorMessage()}
    </div>
  );
};
