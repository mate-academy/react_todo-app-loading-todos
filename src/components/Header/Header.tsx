import { Todo } from '../../types/Todo';

/* eslint-disable jsx-a11y/control-has-associated-label */
type HeaderProps = {
  todos: Todo[];
  handleToggleAll: () => void;
  handleNewTodoSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  newTodoTitle: string;
  setNewTodoTitle: (event: string) => void;
};

export const Header: React.FC<HeaderProps> = ({
  todos,
  handleToggleAll,
  handleNewTodoSubmit,
  newTodoTitle,
  setNewTodoTitle,
}) => {
  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        disabled={!todos}
        onClick={() => handleToggleAll()}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleNewTodoSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={(event) => setNewTodoTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
