interface Props {
  onError: (errVal: string | null) => void;
  error: string | null;
}

export const Notification: React.FC<Props> = ({ error, onError }) => {
  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className="delete"
        onClick={() => {
          onError(null);
        }}
      />
      {`Unable to ${error} a todo`}
    </div>
  );
};
