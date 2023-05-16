/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  setHasError: (value: boolean) => void,
};

export const Error: React.FC<Props> = ({ setHasError }) => {
  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      <button
        type="button"
        className="delete"
        onClick={() => setHasError(false)}
      />
      Unable to get todos
    </div>
  );
};
