/* eslint-disable jsx-a11y/control-has-associated-label */
import cN from 'classnames';

type Props = {
  error: boolean,
  onErrorChange: (b: boolean) => void,
};

export const ErrorNotification: React.FC<Props> = ({
  error,
  onErrorChange,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cN(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !error },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => onErrorChange(false)}
      />

      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
