type Props = {
  title: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const HeaderForm = ({
  title,
  handleInputChange,
  handleSubmit,
}: Props) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleInputChange}
      />
    </form>
  );
};
