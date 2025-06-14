import classNames from 'classnames';

export enum Errors {
  LoadTodos = 'Unable to load todos',
  EmptyTitle = 'Title should not be empty',
  AddTodo = 'Unable to add a todo',
  DeleteTodo = 'Unable to delete a todo',
  UpdateTodo = 'Unable to update a todo',
}

interface ErrorProps {
  errorMessage: Errors | null;
  clearErrorMessage: () => void;
}

export const ErrorNotification: React.FC<ErrorProps> = ({
  errorMessage,
  clearErrorMessage,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => clearErrorMessage()}
      />
      {errorMessage}
    </div>
  );
};
