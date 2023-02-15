/* eslint-disable jsx-a11y/control-has-associated-label */

type Props = {
  onTodoTitle: string,
  onSetTodoTitle: (value: string) => void,
  onHandleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
};

export const Header: React.FC<Props> = ({
  onTodoTitle,
  onSetTodoTitle,
  onHandleSubmit,
}) => {
  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button type="button" className="todoapp__toggle-all active" />

      {/* Add a todo on form submit */}
      <form
        onSubmit={onHandleSubmit}
      >
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={onTodoTitle}
          onChange={(event) => onSetTodoTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
