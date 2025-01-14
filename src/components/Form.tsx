type FormProps = {
  onSubmit: (ev: React.FormEvent) => void | Promise<void>;
  fValue: string;
  onChange: (value: string) => void;
};

export const Form: React.FC<FormProps> = ({ onSubmit, fValue, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={fValue}
        onChange={event => onChange(event.target.value)}
      />
    </form>
  );
};
