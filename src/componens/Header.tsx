/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  setTextTodo: (text: string) => void,
  textTodo: string,
}

export const Header: React.FC<Props> = (
  { setTextTodo, textTodo },
) => {
  return (
    <header className="todoapp__header">
      <button type="button" className="todoapp__toggle-all active" />

      {/* Add a todo on form submit */}
      <form
        onSubmit={(event) => {
          event.preventDefault();

          setTextTodo('');
        }}
      >
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={textTodo}
          onChange={(event) => setTextTodo(event.target.value)}
        />
      </form>
    </header>
  );
};
