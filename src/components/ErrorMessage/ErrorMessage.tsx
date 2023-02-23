import { Error } from '../../enum/Error';

type Props = {
  setIsError: (value: Error) => void;
  ErrorTitle: string
};

export const ErrorMessage: React.FC<Props> = ({ setIsError, ErrorTitle }) => {
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
      {ErrorTitle}
    </div>
  );
};
