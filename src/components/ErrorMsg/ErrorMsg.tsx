interface Props {
  error: string | null
  onError: React.Dispatch<React.SetStateAction<string | null>>
}

export const ErrorMsg: React.FC<Props> = ({ error, onError }) => (
  <div
    data-cy="ErrorNotification"
    className="notification is-danger is-light has-text-weight-normal"
  >
    <button
      aria-label="Hide Error Button"
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={() => onError(null)}
    />

    <p>{error}</p>
  </div>
);
