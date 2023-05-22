interface Props {
  onError: (errVal: string) => void;
  error: string;
}

export const Notification: React.FC<Props> = ({ error, onError }) => (
  <div className="notification is-danger is-light has-text-weight-normal">
    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
    <button
      type="button"
      className="delete"
      onClick={() => {
        onError('');
      }}
    />
    {`Unable to ${error} a todo`}
  </div>
);
