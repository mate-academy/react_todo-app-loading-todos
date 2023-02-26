import { Error } from '../../enum/Error';
import { Errors } from '../../utils/Errors';

type Props = {
  setIsError: (value: Error) => void;
  isError: Error
};

export const ErrorMessage: React.FC<Props> = ({ setIsError, isError }) => {
  return (
    <div
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        type="button"
        aria-label="reset Error"
        className="delete"
        onClick={() => setIsError(Error.RESET)}
      />
      {Errors[isError]}
    </div>
  );
};
