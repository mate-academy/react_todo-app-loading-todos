type Props = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  title: string;
};

export const NewTodo: React.FC<Props> = ({ setTitle, title }) => {
  return (
    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={e => setTitle(e.target.value)}
        autoFocus
      />
    </form>
  );
};
