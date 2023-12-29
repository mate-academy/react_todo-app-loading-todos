/* eslint-disable jsx-a11y/control-has-associated-label */
import { useTodoContext } from '../../context/TodosProvider';

export const Header:React.FC = () => {
  const {
    query, handleSubmitSent, setQuery, filteredTodos,
  } = useTodoContext();

  return (
    <header className="todoapp__header">
      {filteredTodos.length > 0 && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
        />
      )}

      <form onSubmit={(event) => handleSubmitSent(event)}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
};
