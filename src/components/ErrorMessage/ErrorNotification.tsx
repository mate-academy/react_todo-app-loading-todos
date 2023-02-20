import cn from 'classnames';

interface Props {
  isHidden: boolean,
  message: string,
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ErrorNotification: React.FC<Props> = (
  {
    isHidden,
    message,
    setIsHidden,
  },
) => {
  return (
    <div
      className={cn(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: isHidden },
      )}
    >
      <button
        type="button"
        aria-label="close error notification"
        className="delete"
        onClick={() => setIsHidden(false)}
      />
      {message}
    </div>
  );
};
