import { Todo } from '../../types/Todo';

interface Props {
  todosFromServer: Todo[]
}

export const Header:React.FC<Props> = ({ todosFromServer }) => {
  const isActiveTodos = todosFromServer.some(todo => !todo.completed);

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {!isActiveTodos && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
          aria-label="ToggleAllButton"
        />
      )}
      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          aria-label="NewTodoField"
        />
      </form>
    </header>
  );
};
