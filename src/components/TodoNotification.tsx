/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { Error } from '../types/Error';

type Props = {
  error: Error,
  onErrorChange: (error: Error) => void,
};

export const TodoNotification: React.FC<Props> = ({ error, onErrorChange }) => {
  return (
    // eslint-disable-next-line
    <div className={cn('notification is-danger is-light has-text-weight-normal', {
      hidden: error === Error.None,
    })}
    >
      <button
        type="button"
        className="delete"
        onClick={() => onErrorChange(Error.None)}
      />
      {error}
    </div>
  );
};
