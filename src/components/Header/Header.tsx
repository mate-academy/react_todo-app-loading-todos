// import { Todo } from '../../types/Todo';

interface Props {
  activeTodosCount: number;
}

export const Header: React.FC<Props> = ({ activeTodosCount }) => (
  <header className="todoapp__header">
    <button
      type="button"
      className={`todoapp__toggle-all ${activeTodosCount === 0 ? 'active' : ''}`}
      data-cy="ToggleAllButton"
    />
    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        autoFocus
      />
    </form>
  </header>
);
