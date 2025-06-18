import { HeaderProps } from '../../types/HeaderProps';

export const Header: React.FC<HeaderProps> = ({
  todos,
  query,
  setQuery,
  onFormSubmit,
  onToggleAll,
}) => {
  const allCompleted = todos?.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
        data-cy="ToggleAllButton"
        onClick={onToggleAll}
        aria-label="Toggle all todos"
      />
      <form onSubmit={onFormSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </form>
    </header>
  );
};
