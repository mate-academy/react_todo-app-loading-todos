import classNames from 'classnames';
import { Errors } from '../types/Errors';

type Props = {
  warning: Errors | null;
  setWarning: (warning: Errors | null) => void;
};

export const ErrorNotification: React.FC<Props> = ({ warning, setWarning }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: !warning,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setWarning(null)}
      />
      {/* show only one message at a time */}
      {warning}
    </div>
  );
};
