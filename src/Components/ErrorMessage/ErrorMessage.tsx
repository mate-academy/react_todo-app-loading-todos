import classNames from 'classnames';

type Props = {
  errorMessage: string,
  setErrorMessage: (value: string) => void,
};

export const ErrorMessage: React.FC<Props> = ({
  errorMessage,
  setErrorMessage,
}) => {
  return (
    <>
      <div
        className={
          classNames(
            'notification, is-danger is-light has-text-weight-normal', {
              hidden: !errorMessage,
            },
          )
        }
      >
        <button
          type="button"
          className="delete"
          aria-label="delete todo"
          onClick={() => setErrorMessage('')}
        />

        <b>{errorMessage}</b>
      </div>
    </>
  );
};
