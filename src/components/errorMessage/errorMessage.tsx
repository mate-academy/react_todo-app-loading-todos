import { ErrorTodo } from '../../types/ErrorTodo';

type Props = {
  typeError: ErrorTodo,
  onCloseErrorMessage: React.Dispatch<React.SetStateAction<ErrorTodo | null>>,
};

export const ErrorMessage: React.FC<Props> = ({
  typeError,
  onCloseErrorMessage,
}) => (
  <div
    data-cy="ErrorNotification"
    className="notification is-danger is-light has-text-weight-normal"
  >
    <button
      aria-label="HideErrorButton"
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={() => onCloseErrorMessage(null)}
    />
    {typeError === 'download' && 'Unable to download todos'}
    {typeError === 'add' && 'Unable to add a todo'}
    {typeError === 'delete' && 'Unable to delete a todo'}
    {typeError === 'update' && 'Unable to update a todo'}
  </div>
);
