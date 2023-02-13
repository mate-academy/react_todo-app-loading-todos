/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  onNewTitle: string
  onSetNewTitle: (value: string) => void
  onHandle: (event: React.FormEvent<HTMLFormElement>) => void
};

export const Header: React.FC<Props> = ({
  onNewTitle,
  onSetNewTitle,
  onHandle,
}) => {
  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button type="button" className="todoapp__toggle-all active" />

      {/* Add a todo on form submit */}
      <form onSubmit={onHandle}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={onNewTitle}
          onChange={(event) => {
            onSetNewTitle(event.target.value);
          }}
        />
      </form>
    </header>
  );
};
