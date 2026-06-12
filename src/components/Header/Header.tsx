import '../../styles/todoapp.scss';

interface Props {
  onAdd: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleTitleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
}

export const Header: React.FC<Props> = ({ onAdd, handleTitleInput, title }) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={onAdd}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          value={title}
          placeholder="What needs to be done?"
          onChange={handleTitleInput}
        />
      </form>
    </header>
  );
};
