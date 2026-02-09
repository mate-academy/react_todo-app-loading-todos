type Props = {
  onSubmit: (e: React.FormEvent) => void;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
};

export const Form: React.FC<Props> = ({
  onSubmit,
  value,
  onChange,
  disabled,
}) => (
  <form onSubmit={onSubmit}>
    <input
      data-cy="NewTodoField"
      className="todoapp__new-todo"
      placeholder="What needs to be done?"
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
    />
  </form>
);
