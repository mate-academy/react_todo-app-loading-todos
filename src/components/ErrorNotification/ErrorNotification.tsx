/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { ErrorMessage } from '../../types/ErrorMessage';

type Props = {
  errorNotification: ErrorMessage;
  isHidden: boolean;
  setIsHidden: (status: boolean) => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorNotification,
  isHidden,
  setIsHidden,
}) => {
  return (
    <div className={cn('notification is-danger is-light has-text-weight-normal',
      { hidden: isHidden === true })}
    >
      <button
        type="button"
        className="delete"
        onClick={() => setIsHidden(true)}
      />

      {errorNotification}
    </div>
  );
};
