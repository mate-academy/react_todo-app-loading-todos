import cn from 'classnames';

type Props = {
  error: string;
  onClear: () => void;
};
export function AlertError({ error, onClear }: Props) {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !error,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onClear}
      />

      {/* <br /> */}
      {/* Unable to add a todo помилка при створенні нового todo */}
      {/* <br /> */}
      {/* Unable to delete a todo помилка при видаленні todo */}
      {/* <br /> */}
      {/* Unable to update a todo помилка при оновленні todo */}

      {error}
    </div>
  );
}
