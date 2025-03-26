type Props = {
  query: string;
  onInput: (v: string) => void;
};

export const Form: React.FC<Props> = ({ query, onInput }) => {
  return (
    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={query}
        onChange={event => onInput(event.target.value)}
      />
    </form>
  );
};
