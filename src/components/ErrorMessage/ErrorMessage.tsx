import cn from 'classnames';
import { ErrorText } from '../../types/ErrorText';

type Props = {
  errorMessage: ErrorText;
  isHidden: boolean;
  setIsHidden: (status: boolean) => void;
};

export const ErrorMessage: React.FC<Props> = ({
  errorMessage,
  isHidden,
  setIsHidden,
}) => {
  const handleCloseNotification = () => setIsHidden(true);

  return (
    <div className={cn('notification is-danger is-light has-text-weight-normal',
      { hidden: isHidden === true })}
    >
      <button
        aria-label="closeNotification"
        type="button"
        className="delete"
        onClick={handleCloseNotification}
      />

      {errorMessage}
    </div>
  );
};
