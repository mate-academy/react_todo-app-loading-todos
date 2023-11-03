import cn from 'classnames';

interface Props {
  errors: { todosError: string };
  isShowErrors: boolean;
  setIsShowErrors: (value: boolean) => void;
}

export const Errors: React.FC<Props> = ({
  errors,
  isShowErrors,
  setIsShowErrors,
}) => {
  setTimeout(() => {
    setIsShowErrors(false);
  }, 3000);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !isShowErrors,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setIsShowErrors(false)}
        aria-label="HideErrorButton"
      />
      {/* show only one message at a time */}
      {errors.todosError && 'Unable to load todos'}
    </div>
  );
};
