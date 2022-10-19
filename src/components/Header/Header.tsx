import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  newTodoField: React.RefObject<HTMLInputElement>;
};

export const Header: React.FC<Props> = ({ todos, newTodoField }) => {
  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          data-cy="ToggleAllButton"
          type="button"
          className="todoapp__toggle-all active"
        >
          &nbsp;
        </button>
      )}

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
