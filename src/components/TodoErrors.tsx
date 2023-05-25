import cn from 'classnames';

interface PropsTodoError {
  error: boolean;
  setError(err: boolean): void;
}
export const TodosError = ({ error, setError }: PropsTodoError) => {
  return (
    <div
      className={cn(
        {
          // eslint-disable-next-line max-len
          'notification is-danger is-light has-text-weight-normal hidden': !error,
          'notification is-danger is-light has-text-weight-normal': error,
        },
      )}
    >
      { /* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className="delete"
        onClick={() => setError(false)}
      />
      {/* Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
    </div>
  );
};
