type Props = {
  titleTodo: string;
  handleChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Header: React.FC<Props> = ({ titleTodo, handleChangeTitle }) => (
  <header className="todoapp__header">
    <button
      aria-label="button"
      type="button"
      className="todoapp__toggle-all active"
    />

    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={titleTodo}
        onChange={handleChangeTitle}
      />
    </form>
  </header>
);
