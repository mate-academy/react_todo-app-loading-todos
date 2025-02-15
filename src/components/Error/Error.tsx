type Props = {
  setErrorMesage: (message: string) => void;
  errorMesage: string;
};

export const Error: React.FC<Props> = ({ setErrorMesage, errorMesage }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${!errorMesage && 'hidden'}`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMesage('')}
      />
      {/* show only one message at a time */}
      {errorMesage}
    </div>
  );
};
