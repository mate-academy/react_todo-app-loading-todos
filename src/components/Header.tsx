type Props = {
  textTodo: string;
  setTextTodo: (text:string) => void;
};

export const Header:React.FC<Props> = ({
  textTodo,
  setTextTodo,
}) => {
  return (
    <header className="todoapp__header">
      {/* eslint-disable-next-line */}
      <button type="button" className="todoapp__toggle-all active"/>

      <form onSubmit={(event) => {
        event.preventDefault();

        setTextTodo('');
      }}
      >
        <input
          data-cy="NewTodoField"
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
