/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  setTextTodo: (text: string) => void,
  textTodo: string,
  createTodo: (
    todo: { userId: number, title: string, completed: boolean }) => void
}
const USER_ID = 11582;

export const Header: React.FC<Props> = (
  { setTextTodo, textTodo, createTodo },
) => {
  return (
    <header className="todoapp__header">
      <button type="button" className="todoapp__toggle-all active" />

      {/* Add a todo on form submit */}
      <form
        onSubmit={(event) => {
          event.preventDefault();

          createTodo(
            { userId: USER_ID, title: textTodo, completed: true },
          );

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
