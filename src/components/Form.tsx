type Props = {
  title: string,
  onSubmit: () => void
  setTitle: (event: string) => void
};

export const Form: React.FC<Props> = ({
  title,
  onSubmit,
  setTitle,
}) => (
  <form
    onSubmit={onSubmit}
  >
    <input
      type="text"
      className="todoapp__new-todo"
      placeholder="What needs to be done?"
      value={title}
      onChange={(event) => {
        setTitle(event.target.value);
      }}
    />
  </form>
);
