import { useContext } from 'react';
import { TodosContext } from '../context/TodoContext';

export const Header = () => {
  const {
    todos,
    setNewTodoTitle,
    newTodoTitle,
    handleError,
  } = useContext(TodosContext);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodoTitle.trim() === '') {
      handleError('Title should not be empty');

      return;
    }

    setNewTodoTitle('');
  };

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {todos.length > 0
        && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
            title="showTodos"
          />
        )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleFormSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={(event) => setNewTodoTitle(event.target.value)}
          value={newTodoTitle}
        />
      </form>
    </header>
  );
};
