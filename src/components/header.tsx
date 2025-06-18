import type { Todo } from "../types/Todo";

type HeaderProps = {
  allTodos: Todo[] | null
  addInput: string;
  setAddInput: (item: string) => void;
};

export default function Header({ addInput, setAddInput, allTodos }: HeaderProps) {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={`todoapp__toggle-all ${allTodos?.every(item => item.completed) ? "active" : ""}`}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          value={addInput}
          onChange={e => setAddInput(e.target.value)}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
}
